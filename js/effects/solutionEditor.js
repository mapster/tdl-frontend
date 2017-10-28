import {put, call, takeLatest, takeEvery, select, fork} from 'redux-saga/effects';
import {matchPath} from 'react-router-dom';
import {push} from 'connected-react-router';

import * as ROUTE from '../routes';
import * as SolutionsApi from '../api/solutions';
import * as Action from '../actions/solutionEditor';
import handleErrorResponse from './errorResponse';
import * as ExercisesApi from '../api/exercises';
import * as type from '../constants/actionTypes';
import * as Notification from '../actions/notification';
import {SELECTORS} from '../reducers';
import NotLoggedInException from './NotLoggedInException';

function* getSolution(id) {
  try {
    const {data: solution} = yield call(SolutionsApi.getSolution, id);
    yield put(Action.solutionUpdateFromServer(solution));
    return true;
  } catch (e) {
    const {status, data} = e.response;
    if (status === 404) {
      yield put(Notification.error('No such exercise: ' + id));
      return false;
    } else {
      const result = yield handleErrorResponse(status, data);
      if (result instanceof NotLoggedInException) {
        return result;
      }
      return false;
    }
  }
}

function* getSolutionSourceFiles(id) {
  try {
    const {data: files} = yield call(SolutionsApi.getSolutionSourceFiles, id);
    yield put(Action.solutionSourceFilesUpdateFromServer(files));
    return true;
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
    return false;
  }
}

function* getSolveAttempts(id) {
  try {
    const {data: solveAttempts} = yield call(SolutionsApi.getSolutionSolveAttempts, id);
    yield put(Action.solveAttemptsUpdateFromServer(solveAttempts));
    return true;
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
    return false;
  }
}

function* getExerciseSourceFiles(id) {
  try {
    const {data: files} = yield call(ExercisesApi.getExerciseSourceFiles, id);
    yield put(Action.exerciseSourceFilesUpdateFromServer(files));
    return true;
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
    return false;
  }
}

function* deleteSourceFile({data: sourceFile}) {
  try {
    const {exercise_id: exerciseId} = yield select(SELECTORS.solutionEditor.getSolution);

    if (sourceFile.isNew !== true) {
      yield call(SolutionsApi.deleteSourceFile, exerciseId, sourceFile.id);
    }

    yield call(getSolutionSourceFiles, exerciseId);
  } catch (e) {
    const {status, data} = e.response;
    yield handleErrorResponse(status, data);
  }
}

function* saveSolutionFile({data: sourceFile}) {
  try {
    const {exercise_id: exerciseId} = yield select(SELECTORS.solutionEditor.getSolution);
    const request = sourceFile.isNew ? SolutionsApi.postSolutionSourceFile : SolutionsApi.putSolutionSourceFile;
    const {data: savedFile} = yield call(request, exerciseId, sourceFile.data);

    // If the saved file was new we need to make sure the isNew flag is false and that we replace it with
    // the one we received from the api
    if (sourceFile.isNew) {
      yield put(Action.deleteSolutionFile(sourceFile));
      const {data: updatedFiles} = yield call(SolutionsApi.getSolutionSourceFiles, exerciseId);
      yield put(Action.solutionSourceFilesUpdateFromServer(updatedFiles));
    } else {
      yield put(Action.solutionFileUpdateFromServer(savedFile));
    }


    yield put(Action.selectSolutionFile(savedFile.id));
  } catch (e) {
    const {data, status} = e.response;
    if (status === 400) {
      if (data.name) {
        yield put(Notification.error('Name can\'t be blank'));
      }
      if (data.contents) {
        yield put(Notification.error('Contents can\'t be blank'));
      }
    } else if (status === 409) {
      yield put(Notification.error(data));
    } else {
      yield handleErrorResponse(status, data instanceof Object ? JSON.stringify(data) : data);
    }
  }
}

const CANT_BE_BLANK_MSG = 'can\'t be blank';
const createSolutionAttemptValidation = (sourceFiles) => {
  const blankContents = sourceFiles.filter(f => f.contents).filter(f => f.contents.indexOf(CANT_BE_BLANK_MSG) > -1).length;
  const blankNames = sourceFiles.filter(f => f.name).filter(f => f.name.indexOf(CANT_BE_BLANK_MSG)).length;

  return { contents: blankContents, name: blankNames };
};

function* createSolveAttempt() {
  const {exercise_id: exerciseId} = yield select(SELECTORS.solutionEditor.getSolution);
  const solutionFiles = yield select(SELECTORS.solutionEditor.getSolutionSourceFiles);
  try {
    const {data: solveAttempt} = yield call(SolutionsApi.postSolutionSolveAttempt, exerciseId, solutionFiles);
    yield put(Action.newSolveAttempt(solveAttempt));
  } catch (e) {
    const {status, data} = e.response;

    if (status === 400) {
      const validation = createSolutionAttemptValidation(data.source_files);
      console.log(data);
      if (validation.contents > 0) {
        yield put(Notification.error(`${validation.contents} blank file(s)`));
      }

      if (validation.blankFilenames) {
        yield put(Notification.error(`${validation.blankFilenames} file(s) without names`));
      }
    } else {
      yield handleErrorResponse(status, data);
    }
  }
}

function* navigateToSolutionEditor({payload: {location: {pathname}}}) {
  const path = matchPath(pathname, ROUTE.tdl_exercises_solve.matcher);
  if (path) {
    const id = path.params.exerciseId;

    const success = yield call(getSolution, id);
    if (success) {
      yield fork(getSolutionSourceFiles, id);
      yield fork(getExerciseSourceFiles, id)
      yield fork(getSolveAttempts, id);

    } else if (!(success instanceof NotLoggedInException)) {
      yield put(push(ROUTE.tdl_exercises()));
    }
  }
}

export default function* solutionEditorEffects() {
  yield takeEvery([type.LOCATION_CHANGE, type.INIT], navigateToSolutionEditor);
  yield takeLatest(type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILE_SAVE, saveSolutionFile);
  yield takeEvery(type.SOLUTION_EDITOR_SOLVE_ATTEMPT_CREATE, createSolveAttempt);
  yield takeLatest(type.SOLUTION_EDITOR_SOLUTION_SOURCE_FILE_DELETE, deleteSourceFile);
}
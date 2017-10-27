import axios from 'axios';
import {resolveParams} from '../routes';
import {Host} from '../appconfig';

const SOLUTIONS_PATH = Host + '/users/solutions';
const SOLUTION_PATH = SOLUTIONS_PATH + '/:exerciseId';
const SOURCE_FILES_PATH = SOLUTION_PATH + '/source_files';
const SOURCE_FILE_PATH = SOURCE_FILES_PATH + '/:sourceFileId';
const SOLVE_ATTEMPT_PATH = SOLUTION_PATH + '/solve_attempts';

const onlyModifiableSourceFileFields = ({name, contents}) => ({name, contents});

export const getSolution = exerciseId => axios.get(resolveParams(SOLUTION_PATH, {exerciseId}));

export const getSolutionSourceFiles = exerciseId => axios.get(resolveParams(SOURCE_FILES_PATH, {exerciseId}));

export const postSolutionSourceFile = (exerciseId, sourceFile) => axios.post(
  resolveParams(SOURCE_FILES_PATH, {exerciseId}),
  onlyModifiableSourceFileFields(sourceFile)
);

export const putSolutionSourceFile = (exerciseId, sourceFile) => axios.put(
  resolveParams(SOURCE_FILE_PATH, {exerciseId, sourceFileId: sourceFile.id}),
  onlyModifiableSourceFileFields(sourceFile)
);

export const deleteSourceFile = (exerciseId, sourceFileId) => axios.delete(
  resolveParams(SOURCE_FILE_PATH, {exerciseId, sourceFileId})
);

export const postSolutionSolveAttempt = (exerciseId, sourceFiles) => axios.post(
  resolveParams(SOLVE_ATTEMPT_PATH, {exerciseId}),
  {source_files: sourceFiles.map(onlyModifiableSourceFileFields)}
);

export const getSolutionSolveAttempts = (exerciseId) => axios.get(resolveParams(SOLVE_ATTEMPT_PATH, {exerciseId}));
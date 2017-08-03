const LOGIN_PATH = '/login';
const HOME_PATH = '/';

// User
const TDL_PATH = '/tdl';
const TDL_EXERCISES_PATH = TDL_PATH + '/exercises';
const TDL_EDITOR_PATH = TDL_PATH + '/editor';

// Admin
const ADMIN_PATH = '/admin';
const ADMIN_EXERCISES_PATH = ADMIN_PATH + '/exercises';
const ADMIN_EXERCISES_EDIT_PATH = ADMIN_EXERCISES_PATH + '/:id';
const ADMIN_USERS_PATH = admin + '/users';

const resolveParams = (path, params = {}) => {
  return Object.keys(params).reduce(
    (reduced, param) => reduced.replace(':' + param, params[param]),
    path
  );
};
const exactMatcher = (path) => ({ path, exact: true, strict: false });
const exactRoute = (path) => {
  const route = (params) => resolveParams(path, params);
  route.matcher = exactMatcher(path);
  return route;
};

// App
export const login = exactRoute(LOGIN_PATH);
export const home = exactRoute(HOME_PATH);

// User
export const tdl = exactRoute(TDL_PATH);
export const tdl_exercises = exactRoute(TDL_EXERCISES_PATH);
export const tdl_editor = exactRoute(TDL_EDITOR_PATH);

// Admin
export const admin = exactRoute(ADMIN_PATH);
export const admin_exercises = exactRoute(ADMIN_EXERCISES_PATH);
export const admin_exercises_edit = exactRoute(ADMIN_EXERCISES_EDIT_PATH);
export const admin_exercises_edit_new = () => admin_exercises_edit({id: 'new'});
admin_exercises_edit_new.matcher = exactMatcher(admin_exercises_edit_new());
export const admin_users = exactRoute(ADMIN_USERS_PATH);
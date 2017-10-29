import * as type from '../constants/actionTypes';

export const getSolutions = () => ({
  type: type.SOLUTIONS_GET,
});

export const solutionsUpdate = (solutions) => ({
  type: type.SOLUTIONS_UPDATE,
  data: solutions,
});

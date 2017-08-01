export default function createReducer(initialState, reducers) {
  return (state = initialState, action) => {
    const reducer = reducers[action.type];
    if (reducer) {
      return reducer(state, action);
    }

    return state;
  }
}
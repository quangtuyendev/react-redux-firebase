import * as types from '../actions/types';

const INITIAL_STATE = {
  sortBy: '',
  sortValue: null,
};

export const sortProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SORT_PRODUCT:
      const { sortBy, sortValue } = action.payload;
      return {
        ...state,
        sortBy,
        sortValue,
      };
    default:
      return state;
  }
};

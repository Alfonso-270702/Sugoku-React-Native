import { SET_BOARD } from "../actions/types";

const initialState = {
  board: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD:
      return { ...state, board: action.payload };
    default:
      return state;
  }
};

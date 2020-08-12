import { SET_BOARD } from "./types";
import axios from "axios";

export const setBoard = (board) => {
  return {
    type: SET_BOARD,
    payload: board,
  };
};

export const setBoardAsync = (difficulty) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`,
    })
      .then(({ data }) => {
        dispatch(setBoard(data.board));
      })
      .catch(console.log);
  };
};

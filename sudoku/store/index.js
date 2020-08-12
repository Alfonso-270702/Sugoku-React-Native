import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import board from "./reducers/boardReducer";

const store = createStore(board, applyMiddleware(thunk));

export default store;

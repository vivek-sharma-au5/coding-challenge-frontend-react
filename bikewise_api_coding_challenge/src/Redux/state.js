import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducerFunction from "./appReducer";

const rootReducer = combineReducers({
  bikewise: appReducerFunction,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

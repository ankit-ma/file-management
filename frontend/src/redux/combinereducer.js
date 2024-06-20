import { combineReducers } from "redux";
import sessionReducer from "./sessionreducer";
import foldermetadatareducer from "./foldermetadatareducer";

const rootReducer = combineReducers({
    session: sessionReducer,
    foldermetadata: foldermetadatareducer
  })

  export default rootReducer;
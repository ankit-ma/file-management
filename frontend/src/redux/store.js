import { createStore } from "redux";

import rootReducer from "./combinereducer";
const store = createStore(rootReducer);

export default store;
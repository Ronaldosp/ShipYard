import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import orderReducer from "./orderReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
    itemReducer:itemReducer,
    orderReducer:orderReducer,
    categoryReducer:categoryReducer,
})

export default rootReducer;
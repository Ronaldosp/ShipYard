import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import orderReducer from "./orderReducer";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    itemReducer:itemReducer,
    orderReducer:orderReducer,
    categoryReducer:categoryReducer,
    cartReducer:cartReducer
})

export default rootReducer;
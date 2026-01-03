const initialState={
    orders :[],
}

export default function orderReducer(state=initialState , action){
    if(action.type === "orders/get"){
        return {
            ...state,
            orders : action.payload
        }
    }
    return state;
}
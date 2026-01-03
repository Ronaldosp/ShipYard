const initialState={
    items :[],
}

export default function itemReducer(state=initialState , action){
    if(action.type === "items/get"){
        return {
            ...state,
            items : action.payload
        }
    }
    return state;
}
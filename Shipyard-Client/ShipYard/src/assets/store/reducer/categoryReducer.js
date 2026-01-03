const initialState={
    categories :[],
}

export default function categoryReducer(state=initialState , action){
    if(action.type === "categories/get"){
        return {
            ...state,
            categories : action.payload
        }
    }
    return state;
}
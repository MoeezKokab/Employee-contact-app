


const initState ={
    data:[],
    loading:true
}



 const reducer =(state = initState,action)=>{
    if(action.type=="ADD_DATA"){
        return{
            ...state,
            data:action.payload
        }

    }
    if(action.type=="SET_LOAD"){
        return{
            ...state,
            loading:action.payload
        }
    }
    return state
}

export default reducer
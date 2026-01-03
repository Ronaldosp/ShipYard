const BASE_URL = 'http://localhost:3000'

export function ordersFetchSuccess(payload){
    return{
        type:"orders/get",
        payload
    }
}

export function itemsFetchSuccess(payload){
    return{
        type:"items/get",
        payload
    }
}

export function categoriesFetchSuccess(payload){
    return{
        type:"categories/get",
        payload
    }
}

export const register = (body) =>{
    return async (dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/register`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json'
                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const login = (body) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/login`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                }
            }) 
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json()
            localStorage.setItem("access_token", data.access_token);


        } catch (error) {
            console.log(error);
            
        }
    }
}

//Categories

export const fetchCategory = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/categories`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const categories = Array.isArray(data) ? data : data.categories || []
            dispatch(categoriesFetchSuccess(categories))
       
            
            //const action = categoriesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createCategory = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/categories`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchCategory())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editCategory = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/categories/${id}`,{
                method:"PUT",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchCategory())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteCategory= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/categories/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token

                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchCategory())
            
        } catch (error) {
            console.log(error);
        }
    }
}

//items
export const fetchItem = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/items`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const items = Array.isArray(data) ? data : data.items || []
            dispatch(itemsFetchSuccess(items))
       
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createItem = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/items`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchItem())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editItem = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/items/${id}`,{
                method:"PUT",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchItem())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteItem= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/items/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token

                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchItem())
            
        } catch (error) {
            console.log(error);
        }
    }
}

//orders
export const fetchOrder = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/orders`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const orders = Array.isArray(data) ? data : data.orders || []
            dispatch(ordersFetchSuccess(orders))
       
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createOrder = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/orders`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchOrder())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editOrder = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/orders/${id}`,{
                method:"PUT",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchOrder())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteOrder = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/orders/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token

                }
            }) 
            
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchOrder())
            
        } catch (error) {
            console.log(error);
        }
    }
}
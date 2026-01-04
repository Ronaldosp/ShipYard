import {createBrowserRouter , redirect} from 'react-router-dom'
import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import Layout from '../components/Layout'
import CategoryPage from '../views/CategoryPage'
import ItemPage from '../views/ItemPage'
import CartPage from '../views/CartPage'
import OrderPage from '../views/OrderPage'

export default createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        loader:()=>{
            console.log(localStorage.access_token);
            //if(!localStorage.access_token) return redirect('/login')
           // return null
        },
        children:[
            {
                index:true,
                path:"/",
                element:<HomePage/>,
            },
            {
                path:"/register",
                element  :<RegisterPage/>
            },
            {
                path:"/categories",
                element  :<CategoryPage/>
            },
            {
                path:"/items",
                element  :<ItemPage/>
            },
            {
                path:"/cart",
                element  :<CartPage/>
            },
            {
                path:"/orders",
                element  :<OrderPage/>
            },
            
        ]
    },
    {
        path:"/login",
        element:<LoginPage/>,
        loader:()=>{
            console.log(localStorage.access_token);
            //if(localStorage.access_token) return redirect('/')
            //return null
        }
    },
    
])
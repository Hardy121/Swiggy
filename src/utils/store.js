import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import toogleSlice from "./toogleSlice";


const store = configureStore({
    reducer:{
        filterSlice : filterSlice ,
        authSlice : authSlice,
        cartSlice : cartSlice,
        toogleSlice : toogleSlice
    }

})

export default store
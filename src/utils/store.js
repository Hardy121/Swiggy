import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";


const store = configureStore({
    reducer:{
        filterSlice : filterSlice ,
        authSlice : authSlice,
        cartSlice : cartSlice
    }

})

export default store
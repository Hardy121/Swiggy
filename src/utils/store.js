import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";


const store = configureStore({
    reducer:{
        filterSlice : filterSlice ,
        authSlice : authSlice
    }

})

export default store
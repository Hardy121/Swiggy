import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";


const store = configureStore({
    reducer:{
        filterSlice : filterSlice
    }

})

export default store
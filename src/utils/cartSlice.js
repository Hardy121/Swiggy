import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
        resInfo: JSON.parse(localStorage.getItem("resInfo")) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const { info, resInfo } = action.payload
            state.cartItems = [...state.cartItems, info]
            localStorage.setItem("cartData", JSON.stringify(state.cartItems));
            localStorage.setItem("resInfo", JSON.stringify(resInfo));
            // console.log(action.payload);
            // setcartData((prev) => [...prev, info]) // items add thashe ane previous items remove ny thay 

        },
        deleteCart: (state, action) => {
            state.cartItems = action.payload
            localStorage.setItem("cartData", JSON.stringify(action.payload))
        },
        clearCart: (state) => {
            state.cartItems = []
            localStorage.removeItem("cartData");
            localStorage.removeItem("resInfo");
        }

    }

})

export const { addToCart, deleteCart, clearCart } = cartSlice.actions
export default cartSlice.reducer

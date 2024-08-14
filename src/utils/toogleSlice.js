import { createSlice } from "@reduxjs/toolkit";



const toogleSlice = createSlice({
    name: "toogleSlice",
    initialState: {
        similarResDish: {
            isSimilarResDishes: false,
            city: "",
            resLocation: "",
            resId: "",
            itemId: ""
        }
    },
    reducers: {
        // toggleIsSimilarDishes: (state) => {
        //     state.similarResDish.isSimilarResDishes = !state.similarResDish.isSimilarResDishes
        // },

        setSimilarResDish: (state, action) => {
            state.similarResDish = action.payload
        },
        resetSimilarResDish: (state) => {
            state.similarResDish = {
                isSimilarResDishes: false,
                city: "",
                resLocation: "",
                resId: "",
                itemId: ""
            }   
        }
    }
})

export const { toggleIsSimilarDishes, setSimilarResDish ,resetSimilarResDish} = toogleSlice.actions
export default toogleSlice.reducer
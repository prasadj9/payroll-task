import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    sidebarOpen : false,
    userData : {},
    isAuth : false,
}

const globalSlice = createSlice({
    name : "global",
    initialState,
    reducers : {
        toggleSidebar : (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        }
    }
})

export const {toggleSidebar} = globalSlice.actions
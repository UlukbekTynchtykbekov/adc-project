import {configureStore} from "@reduxjs/toolkit";
import authenticateReducer from "../features/authenticatedSlice"

const store = configureStore({
    reducer: {
        auth: authenticateReducer,
    }
})

export default store;
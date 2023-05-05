import {configureStore} from "@reduxjs/toolkit";
import authenticateReducer from "../features/authenticatedSlice"
import reviewReducer from "../features/reviewSlice"

const store = configureStore({
    reducer: {
        auth: authenticateReducer,
        review: reviewReducer
    }
})

export default store;
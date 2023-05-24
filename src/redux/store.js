import {configureStore} from "@reduxjs/toolkit";
import authenticateReducer from "../features/authenticatedSlice";
import reviewReducer from "../features/reviewSlice";
import sidebarReducer  from "../features/sidebarSlice";

const store = configureStore({
    reducer: {
        auth: authenticateReducer,
        review: reviewReducer,
        sidebar: sidebarReducer
    }
})

export default store;
import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    data: {},
    isAuthenticated: false
}

const authenticateSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        selectIsAuth: (state, action) => {
            state.data = action.payload
            state.isAuthenticated = Boolean(action.payload)
        },
        logout: (state, action) => {
            state.data = {}
            state.isAuthenticated = false
        }
    }
});


export default authenticateSlice.reducer;
export const authActions = authenticateSlice.actions;
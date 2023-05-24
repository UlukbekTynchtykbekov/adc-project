import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    openSidebar: false
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        changeSidebar: (state, action) => {
            state.openSidebar = action.payload
        },
    }
});

export default sidebarSlice.reducer;
export const sidebarActions = sidebarSlice.actions;
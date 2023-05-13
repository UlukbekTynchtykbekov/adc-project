import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    unreadComments: [],
}

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        addUnacceptedComments: (state, action) => {
            const findId = state.unreadComments.find(el => el._id === action.payload._id)
            if (Boolean(findId) === true){
                state.unreadComments = [...state.unreadComments]
            }else{
                state.unreadComments = [...state.unreadComments, {...action.payload}]
            }
        },

        deleteUnacceptedComments: (state, action) => {
            const findId = state.unreadComments.find(el => el._id === action.payload)
            if (Boolean(findId) === true){
                const deletedItems = state.unreadComments.filter(el => el._id !== action.payload)
                state.unreadComments = [...deletedItems]
            }else{
                state.unreadComments = [...state.unreadComments]
            }
        },
    }
});


export default reviewSlice.reducer;
export const reviewActions = reviewSlice.actions;
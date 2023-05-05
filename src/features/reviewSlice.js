import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    readComments: [],
    unreadComments: [],
}

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        addAcceptedComments: (state, action) => {
            const findId = state.readComments.find(el => el._id === action.payload._id)
            if (Boolean(findId) === true){
                state.readComments = [...state.readComments]
            }else{
                state.readComments = [...state.readComments, {...action.payload}]
            }
        },
        addUnacceptedComments: (state, action) => {
            const findId = state.unreadComments.find(el => el._id === action.payload._id)
            if (Boolean(findId) === true){
                state.unreadComments = [...state.unreadComments]
            }else{
                state.unreadComments = [...state.unreadComments, {...action.payload}]
            }
        },
    }
});


export default reviewSlice.reducer;
export const reviewActions = reviewSlice.actions;
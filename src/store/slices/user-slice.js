import { createSlice } from "@reduxjs/toolkit";

export const initialUserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "userSliceDetails",
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducers;

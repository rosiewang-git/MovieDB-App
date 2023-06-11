import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
    requestToken: string;
    sessionId: string;
    userId: number;
    userName: string;
}

interface UserState {
    user: User | null;
}
const initialUserState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "userSliceDetails",
    initialState: initialUserState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

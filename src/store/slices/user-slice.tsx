import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../hooks/useUser";

interface UserState {
    user: UserInfo | null;
}
const initialUserState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "userSliceDetails",
    initialState: initialUserState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo | null>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

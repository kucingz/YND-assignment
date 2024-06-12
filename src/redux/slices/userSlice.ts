import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserNameState = {
    username: string;
};

const initialState: UserNameState = {
    username: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;

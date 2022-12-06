import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		login(state, { payload }) {
			return {
				isAuth: true,
				name: payload.user.name,
				email: payload.user.email,
				token: payload.result,
			};
		},
		logout(state, action) {
			return initialState;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const authorsSlice = createSlice({
	name: 'authors',
	initialState: [],
	reducers: {
		getAuthors(state, action) {
			return state;
		},
		getAuthorsSuccess(state, action) {
			return action.payload;
		},
		addAuthor(state, action) {
			return [...state, action.payload];
		},
	},
});

export const { getAuthors, getAuthorsSuccess, addAuthor } =
	authorsSlice.actions;

export const authorsReducer = authorsSlice.reducer;

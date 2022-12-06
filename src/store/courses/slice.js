import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
	name: 'courses',
	initialState: [],
	reducers: {
		getCourses(state, action) {
			return state;
		},
		getCoursesSuccess(state, action) {
			return action.payload;
		},
		deleteCourse(state, action) {
			return state.filter((course) => course.id !== action.payload);
		},
		addCourse(state, action) {
			return [...state, action.payload];
		},
		addCourseSuccess(state, action) {
			return state;
		},
	},
});

export const {
	getCourses,
	getCoursesSuccess,
	deleteCourse,
	addCourse,
	addCourseSuccess,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;

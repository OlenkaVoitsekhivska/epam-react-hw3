import axios from 'axios';

export const getCourses = async () => {
	const { data } = await axios.get('http://localhost:4000/courses/all');
	return data.result;
};

export const getAuthors = async () => {
	const { data } = await axios.get('http://localhost:4000/authors/all');
	return data.result;
};

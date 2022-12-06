import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import React, { useEffect, useState } from 'react';
import { Context } from './Context';
import { mockedAuthorsList } from './constants';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { useNavigate } from 'react-router-dom';

function App() {
	const navigate = useNavigate();
	const [context, setContext] = useState({
		authors: mockedAuthorsList,
		filter: '',
	});

	useEffect(() => {
		if (localStorage.getItem('currentUser')) {
			navigate('courses');
		}
	}, [navigate]);

	return (
		<Context.Provider value={[context, setContext]}>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Header />}>
						<Route index element={<Login />} />
						<Route path='register' element={<Registration />} />
						<Route path='login' element={<Login />} />
						<Route path='courses' element={<Courses />} />
						<Route path='courses/:courseId' element={<CourseInfo />} />
						<Route path='courses/add' element={<CreateCourse />} />
					</Route>
				</Routes>
			</div>
		</Context.Provider>
	);
}

export default App;

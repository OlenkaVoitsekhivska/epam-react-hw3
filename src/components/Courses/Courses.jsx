import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { useContext, useEffect, useRef } from 'react';
import { Context } from '../../Context';
import s from './Courses.module.css';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAuthorsSuccess } from '../../store/authors/slice';
import { getCoursesSuccess } from '../../store/courses/slice';
import {
	getAuthors as getAuthorsApi,
	getCourses as getCoursesApi,
} from '../../services';
import { courses } from '../../store/selectors';

const BTN__TEXT = {
	addNewCourse: 'Add new course',
};

export default function Courses() {
	const [context, setContext] = useContext(Context);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const coursesSelector = useSelector(courses);

	const renderCount = useRef(0);

	const searchItems = (query) => {
		setContext((prevState) => ({ ...prevState, filter: query }));
	};

	const courseList = () => {
		const { filter } = context;
		if (filter) {
			return coursesSelector.filter(
				(course) =>
					course.title.toLowerCase().includes(filter.toLowerCase()) ||
					course.id.includes(filter)
			);
		}
		return coursesSelector;
	};
	useEffect(() => {
		renderCount.current = renderCount.current + 1;
		const callThem = async () => {
			const authorsResult = await getAuthorsApi();
			dispatch(getAuthorsSuccess(authorsResult));
			const result = await getCoursesApi();
			dispatch(getCoursesSuccess(result));
		};
		if (
			renderCount.current < 1 ||
			JSON.parse(localStorage.getItem('persist:root')).courses === '[]'
		) {
			callThem();
		}
	}, [dispatch]);

	return (
		<div className='courses'>
			<div className={s.searchCourse__wrapper}>
				<div className={s.searchCourse__input}>
					<SearchBar searchItems={searchItems}></SearchBar>
				</div>
				<Button
					buttonText={BTN__TEXT.addNewCourse}
					type='button'
					onClick={() => navigate('add')}
				></Button>
			</div>
			{courseList().map((course) => (
				<CourseCard course={course} key={course.id}></CourseCard>
			))}
		</div>
	);
}

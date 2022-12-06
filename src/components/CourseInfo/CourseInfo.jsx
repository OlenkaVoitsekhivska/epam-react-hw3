import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGeneratop';
import { useParams, Link } from 'react-router-dom';

import './CourseInfo.css';

import { useSelector } from 'react-redux';
import {
	authors as getAuthors,
	courses as getCourses,
} from '../../store/selectors';

export default function CourseInfo() {
	const authorsSelector = useSelector(getAuthors);
	const coursesSelector = useSelector(getCourses);
	const { courseId } = useParams();

	const findCourseById = (id) => {
		return coursesSelector.find((course) => course.id === id);
	};

	const { id, title, description, authors, duration, creationDate } =
		findCourseById(courseId);

	const findAuthorById = (id) => {
		const author = authorsSelector.find((author) => author.id === id);
		return author.name;
	};

	const listAuthorsString = (ids) => {
		return ids.map((id) => findAuthorById(id)).join(', ');
	};

	return (
		<div className='courseInfo__wrapper'>
			<Link to='/courses'> &larr; Back to courses </Link>
			<h1>{title}</h1>
			<div className='courseInfo__card'>
				<div className='courseInfo__card--left'>
					<p className='courseInfo__description'>{description}</p>
				</div>
				<div className='courseInfo__card--right'>
					<p>
						<b>Id: </b>
						{id}
					</p>

					<p>
						<b>Duration: </b>
						{`${pipeDuration(duration)} hours`}
					</p>
					<p>
						<b>Created: </b>
						{dateGenerator(creationDate)}
					</p>
					<p className='card__authors'>
						<b>Authors: </b>
						{listAuthorsString(authors)}
					</p>
				</div>
			</div>
		</div>
	);
}

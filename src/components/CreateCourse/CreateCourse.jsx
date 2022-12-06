import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import React, { useEffect, useState } from 'react';

import { pipeDuration } from '../../helpers/pipeDuration';
import { v4 as uuidv4 } from 'uuid';

import s from './CreateCourse.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCourse } from '../../store/courses/slice';
import { addAuthor as addNewAuthor } from '../../store/authors/slice';
import { authors } from '../../store/selectors';

const INPUT__TEXT = {
	title: {
		label: 'Title',
		placeholder: 'Enter title...',
	},
	description: {
		label: 'Description',
		placeholder: 'Enter description...',
	},
	addAuthor: {
		label: 'Author name',
		placeholder: 'Enter author name...',
	},
	duration: {
		label: 'Duration',
		placeholder: 'Enter duration in minutes',
	},
};

const BTN__TEXT = {
	createCourse: 'Create course',
	addAuthor: 'Add author',
	deleteAuthor: 'Delete author',
	createAuthor: 'Create author',
};

export default function CreateCourse() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const authorsSelector = useSelector(authors);
	const [availableAuthors, setAvailableAuthors] = useState(authorsSelector);
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [addAuthor, setAddAuthor] = useState('');

	useEffect(() => {
		setAvailableAuthors(authorsSelector);
	}, [authorsSelector]);

	const addAuthors = (author) => {
		setSelectedAuthors((prevState) => [...prevState, author]);
		setAvailableAuthors((prevState) => {
			return prevState.filter((prevAuthor) => prevAuthor.id !== author.id);
		});
	};

	const handleDelete = (deletedAuthor) => {
		setSelectedAuthors((prevState) => {
			return prevState.filter((author) => author.id !== deletedAuthor.id);
		});
		setAvailableAuthors((prevState) => [...prevState, deletedAuthor]);
	};

	const showSelectedAuthors = () => {
		return selectedAuthors.map((author) => (
			<li key={author.id}>
				{author.name}
				<Button
					buttonText={BTN__TEXT.deleteAuthor}
					onClick={() => handleDelete(author)}
				></Button>
			</li>
		));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !description || !duration || !selectedAuthors.length) {
			alert('Please fill in all the fields!');
			return;
		}
		const newCourse = {
			id: uuidv4(),
			title,
			description,
			creationDate: new Date(Date.now()).toLocaleDateString('en-GB'),
			duration: parseInt(duration),
			authors: selectedAuthors.map(({ id }) => id),
		};

		dispatch(addCourse(newCourse));
		navigate('/courses');
	};

	const handleAddAuthor = (e, author) => {
		e.preventDefault();
		if (!author) {
			return;
		}
		const newAuthor = { id: uuidv4(), name: author };
		if (availableAuthors.find((author) => author.name === newAuthor.name)) {
			alert('Author with this name already exists');
			return;
		}
		dispatch(addNewAuthor(newAuthor));
		setAvailableAuthors((prevState) => [...prevState, newAuthor]);
	};

	return (
		<form className='create__container' onSubmit={handleSubmit}>
			<div className={s.create__title}>
				<div className={s.create__input}>
					<Input
						labelText={INPUT__TEXT.title.label}
						placeholderText={INPUT__TEXT.title.placeholder}
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						type='text'
						minLength={2}
						required
					></Input>
				</div>
				<Button buttonText={BTN__TEXT.createCourse} type='submit'></Button>
			</div>
			<label htmlFor='courseDescription'>{INPUT__TEXT.description.label}</label>
			<textarea
				className={s.textarea}
				name='description'
				placeholder={INPUT__TEXT.description.placeholder}
				id='courseDescription'
				cols='30'
				rows='10'
				onChange={(e) => setDescription(e.target.value)}
				minLength={2}
			></textarea>
			<div className={s['grid-wrap']}>
				<div className={s.create__author}>
					<h2>Add author</h2>
					<div>
						<Input
							minLength={2}
							value={addAuthor}
							labelText={INPUT__TEXT.addAuthor.label}
							type='text'
							placeholderText={INPUT__TEXT.addAuthor.placeholder}
							onChange={(e) => setAddAuthor(e.target.value)}
						></Input>
						{/* HERE WE ARE CREATING NEW AUTHOR */}
						<Button
							buttonText={BTN__TEXT.createAuthor}
							type='button'
							onClick={(e) => handleAddAuthor(e, addAuthor)}
						></Button>
					</div>
				</div>

				<div className={s.create__authorsList}>
					<h2>Authors</h2>
					<ul>
						{availableAuthors.map(({ id, name }) => (
							<li key={id}>
								{name}
								{/* HERE WE ARE ADDING AUTHORS TO COURSE LIST */}
								<div className={s.btn__addAuthor}>
									<Button
										buttonText={BTN__TEXT.addAuthor}
										type='button'
										onClick={() => addAuthors({ id, name })}
									></Button>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className={s.create__duration}>
					<h2>Duration</h2>
					<Input
						labelText={INPUT__TEXT.duration.label}
						placeholderText={INPUT__TEXT.duration.placeholder}
						onChange={(e) => setDuration(e.target.value)}
						value={duration}
						type='number'
						required
					></Input>
					<p>Duration: {pipeDuration(duration)} hours</p>
				</div>
				<div className={s.create__courseAuthors}>
					<h2>Course authors</h2>

					{selectedAuthors.length ? (
						showSelectedAuthors()
					) : (
						<p>Author list is empty</p>
					)}
				</div>
			</div>
		</form>
	);
}

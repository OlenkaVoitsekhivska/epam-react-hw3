import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './Registration.module.css';

const INPUT__TEXT = {
	name: {
		label: 'Name',
		placeholder: 'Enter name',
		name: 'name',
	},
	email: {
		label: 'Email',
		placeholder: 'Enter email',
		name: 'email',
	},
	password: {
		label: 'Password',
		placeholder: 'Enter password',
		name: 'password',
	},
};

const BTN__TEXT = {
	registration: 'Signup',
};

export default function Registration() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.email || !form.password || !form.name) {
			return;
		}
		try {
			const response = await fetch('http://localhost:4000/register', {
				method: 'POST',
				body: JSON.stringify(form),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			if (!result.successful) {
				throw new Error(result.errors);
			}
			navigate('/login');
		} catch (err) {
			alert(err);
		}
	};
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<div className='form__auth'>
			<form onSubmit={handleSubmit}>
				<h2 style={{ textAlign: 'center' }}>Registration</h2>
				<div className='form__auth--input-wrapper'>
					<Input
						onChange={handleChange}
						placeholderText={INPUT__TEXT.name.placeholder}
						type='text'
						labelText={INPUT__TEXT.name.label}
						value={form.name}
						name={INPUT__TEXT.name.name}
						minLength={2}
						required
					></Input>
				</div>
				<div className='form__auth--input-wrapper'>
					<Input
						onChange={handleChange}
						placeholderText={INPUT__TEXT.email.placeholder}
						type='email'
						labelText={INPUT__TEXT.email.label}
						value={form.email}
						name={INPUT__TEXT.email.name}
						required
					></Input>
				</div>
				<div className='form__auth--input-wrapper'>
					<Input
						onChange={handleChange}
						placeholderText={INPUT__TEXT.password.placeholder}
						type='password'
						labelText={INPUT__TEXT.password.label}
						value={form.password}
						name={INPUT__TEXT.password.name}
						minLength={6}
						required
					></Input>
				</div>
				<Button buttonText={BTN__TEXT.registration} type='submit' />
				<p className='form__auth--txt'>
					Already have an account?{' '}
					<Link to={'/login'}>
						<span>Login</span>
					</Link>
				</p>
			</form>
		</div>
	);
}

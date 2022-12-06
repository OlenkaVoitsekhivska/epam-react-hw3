import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../store/user/slice';
import { useDispatch } from 'react-redux';

const INPUT__TEXT = {
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
	login: 'Login',
};

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.email || !form.password) {
			return;
		}
		try {
			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify(form),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			if (!result.successful) {
				throw new Error(result.result);
			}
			dispatch(login(result));
			localStorage.setItem(
				'currentUser',
				JSON.stringify({ token: result.result, name: result.user.name })
			);
			navigate('/courses');
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
				<h2 style={{ textAlign: 'center' }}>Login</h2>
				<div className='form__auth--input-wrapper'>
					<Input
						onChange={handleChange}
						placeholderText={INPUT__TEXT.email.placeholder}
						type='email'
						labelText={INPUT__TEXT.email.label}
						value={form.email}
						name={INPUT__TEXT.email.name}
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
					></Input>
				</div>
				<Button buttonText={BTN__TEXT.login} type='submit' />
				<p className='form__auth--txt'>
					Don't have an account yet? Click{' '}
					<Link to={'/register'}>
						<span>here </span>
					</Link>
					to sign up
				</p>
			</form>
		</div>
	);
}

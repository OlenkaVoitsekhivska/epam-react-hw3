import './Input.css';
export default function Input({
	labelText,
	placeholderText,
	onChange,
	...props
}) {
	return (
		<div className='input__container'>
			<label htmlFor='search-course'>{labelText}</label>
			<input placeholder={placeholderText} onChange={onChange} {...props} />
		</div>
	);
}

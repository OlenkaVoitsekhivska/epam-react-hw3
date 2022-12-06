import './Button.css';

export default function Button({ buttonText, onClick, type }) {
	return (
		<button onClick={onClick} type={type}>
			{buttonText}
		</button>
	);
}

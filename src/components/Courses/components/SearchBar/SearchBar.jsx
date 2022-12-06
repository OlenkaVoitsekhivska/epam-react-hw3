import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import React, { useState, useContext } from 'react';
import { Context } from '../../../../Context';
import './SearchBar.css';

const INPUT__TEXT = {
	search: {
		placeholder: 'Enter course name of id...',
	},
};

const BTN__TEXT = {
	search: 'search',
};

export default function SearchBar({ searchItems }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [context, setContext] = useContext(Context);

	const registerInput = (e) => {
		const searchWord = e.target.value;
		setSearchQuery(searchWord);
		if (!searchWord) {
			setContext((prevState) => ({ ...prevState, filter: '' }));
		}
	};
	return (
		<>
			<Input
				onChange={registerInput}
				placeholderText={INPUT__TEXT.search.placeholder}
			></Input>
			<Button
				buttonText={BTN__TEXT.search}
				onClick={() => searchItems(searchQuery.trim())}
				type='button'
			></Button>
		</>
	);
}

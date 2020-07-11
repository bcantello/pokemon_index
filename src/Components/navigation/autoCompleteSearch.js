/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18,
		},
	},
});

export default function AutoCompleteSearch(props) {
	const classes = useStyles();
	const pokemon = props.pokemon;

	return (
		<Autocomplete
			// handle search user input
			value={props.value}
			onChange={(event, newValue) => {
				props.setValue(newValue);
			}}
			// handle search drop down select
			inputValue={props.inputValue}
			onInputChange={(event, newInputValue) => {
				props.setInputValue(newInputValue);
			}}
			id="pokemon-select"
			style={{width: 300}}
			options={pokemon}
			classes={{
				option: classes.option,
			}}
			autoHighlight
			getOptionLabel={(option) => option.label}
			renderOption={(option) => (
				<React.Fragment>
					{option.label}
				</React.Fragment>
			)}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Pokemon"
					variant="outlined"
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-password', // disable autocomplete and autofill
					}}
				/>
			)}
		/>
	);
}

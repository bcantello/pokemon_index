import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {getPokemonByName} from "../../services/pokeApiHelper";
import {AppContext} from "../../App";
import AutoCompleteSearch from "./autoCompleteSearch";
import pokemon from '../../searchListData';
import './navHeader.css';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export default function SearchAppBar() {
	const classes = useStyles();
	const context = useContext(AppContext);
	const options = ['Option 1', 'Option 2'];
	const [value, setValue] = useState(options[0]);
	const [inputValue, setInputValue] = useState('');

	// search pokemon by name input through search bar
	useEffect(() => {
		const autoSearchOnMatchingName = () => {
			// api GET with input selected from dropdown
			if (pokemon.some(element => element.label === inputValue)) {
				getPokemonByName(inputValue).then(res => {
					if (res.status === 200) {
						context.setPokemonId(res.data.id);
					}
				}).catch(e => {
					return e;
				});
			} else {
				// api GET with pokemon 100% user entered
				if (pokemon.some(element => element.label === value)) {
					getPokemonByName(value).then(res => {
						if (res.status === 200) {
							context.setPokemonId(res.data.id);
						}
					}).catch(e => {
						return e;
					});
				}
			}
		};
		autoSearchOnMatchingName();
	}, [value, inputValue]);

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						Who's That Pokedex!?
					</Typography>
					<div id={'search-container'}>
						<form className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<AutoCompleteSearch setValue={setValue} setInputValue={setInputValue} pokemon={pokemon}/>
						</form>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

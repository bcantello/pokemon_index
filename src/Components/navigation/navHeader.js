import React, {useContext, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import './navHeader.css';
import {getPokemonByName} from "../../services/pokeApiHelper";
import {AppContext} from "../../App";

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
	const [searchInput, setSearchInput] = useState({
		pokemon: ''
	});

	// Collect user input from search field
	const handleSearchChange = e => {
		const {name, value} = e.target;
		setSearchInput({...searchInput, [name]: value});
	};

	const handleSubmitSearch = e => {
		e.preventDefault();
		getPokemonByName(searchInput.pokemon.toLowerCase()).then(res => {
			if (res.status === 200) {
				console.log(res.data.id);
				context.setPokemonId(res.data.id);
			} else {
				// document.getElementById('error-response')
				// 	.innerHTML = "Invalid address. Please ensure all fields are filled out correctly"
			}
		}).catch(e => {
			return e;
		});
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						Who's That Pokedex!?
					</Typography>
					<form className={classes.search} onSubmit={handleSubmitSearch}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							name={'pokemon'}
							value={searchInput.pokemon}
							onChange={handleSearchChange}
						/>
					</form>
				</Toolbar>
			</AppBar>
		</div>
	);
}

import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import './navHeader.css';
import {getPokemonByName, getSelectedPokemon} from "../../services/pokeApiHelper";
import {AppContext} from "../../App";
import AutoCompleteSearch from "./autoCompleteSearch";

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



const pokemon = [
	{ label: 'bulbasaur' },
	{ label: 'ivysaur' },
	{ label: 'venusaur' },
	{ label: 'charmander' },
	{ label: 'charmeleon' },
	{ label: 'charizard' },
	{ label: 'squirtle' },
	{ label: 'wartortle' },
	{ label: 'blastoise' },
	{ label: 'caterpie' },
	{ label: 'metapod' },
	{ label: 'butterfree' },
	{ label: 'weedle' },
	{ label: 'kakuna' },
	{ label: 'beedrill' },
	{ label: 'pidgey' },
	{ label: 'pidgeotto' },
	{ label: 'pidfeot' },
	{ label: 'rattata' },
	{ label: 'raticate' },
	{ label: 'spearow' },
	{ label: 'fearow' },
	{ label: 'ekans' },
	{ label: 'arbok' },
	{ label: 'pikachu' },
	{ label: 'raichu' },
	{ label: 'sandshrew' },
	{ label: 'sandslash' },
	{ label: 'nidoran-f' },
	{ label: 'nidorina' },
	{ label: 'nidoqueen' },
	{ label: 'nidoran-m' },
	{ label: 'nidorino' },
	{ label: 'nidoking' },
	{ label: 'clefairy' },
	{ label: 'clefable' },
	{ label: 'vulpix' },
	{ label: 'ninetales' },
	{ label: 'jigglypuff' },
	{ label: 'wigglytuff' },
	{ label: 'zubat' },
	{ label: 'golbat' },
	{ label: 'oddish' },
	{ label: 'gloom' },
	{ label: 'vileplume' },
	{ label: 'paras' },
	{ label: 'parasect' },
	{ label: 'venonat' },
	{ label: 'venomoth' },
	{ label: 'diglett' },
	{ label: 'dugtrio' },
	{ label: 'meowth' },
	{ label: 'persian' },
	{ label: 'psyduck' },
	{ label: 'golduck' },
	{ label: 'mankey' },
	{ label: 'primape' },
	{ label: 'growlithe' },
	{ label: 'arcanine' },
	{ label: 'poliwag' },
	{ label: 'poliwhirl' },
	{ label: 'poliwrath' },
	{ label: 'abra' },
	{ label: 'kadabra' },
	{ label: 'alakazam' },
	{ label: 'machop' },
	{ label: 'machoke' },
	{ label: 'machamp' },
	{ label: 'bellsprout' },
	{ label: 'weepinbell' },
	{ label: 'victreebel' },
	{ label: 'tentacool' },
	{ label: 'tentacruel' },
	{ label: 'geodude' },
	{ label: 'graveler' },
	{ label: 'golem' },
	{ label: 'ponyta' },
	{ label: 'rapidash' },
	{ label: 'slowpoke' },
	{ label: 'slowbro' },
	{ label: 'magnemite' },
	{ label: 'magneton' },
	{ label: 'farfetchd' },
	{ label: 'doduo' },
	{ label: 'dodrio' },
	{ label: 'seel' },
	{ label: 'dewgong' },
	{ label: 'grimer' },
	{ label: 'muk' },
	{ label: 'shellder' },
	{ label: 'cloyster' },
	{ label: 'gastly' },
	{ label: 'haunter' },
	{ label: 'gengar' },
	{ label: 'onix' },
	{ label: 'drowzee' },
	{ label: 'hypno' },
	{ label: 'krabby' },
	{ label: 'kingler' },
	{ label: 'voltorb' },
	{ label: 'electrode' },
	{ label: 'exeggcute' },
	{ label: 'exeggutor' },
	{ label: 'cubone' },
	{ label: 'marowak' },
	{ label: 'hitmonlee' },
	{ label: 'hitmonchan' },
	{ label: 'lickitung' },
	{ label: 'koffing' },
	{ label: 'weezing' },
	{ label: 'rhyhorn' },
	{ label: 'rhydon' },
	{ label: 'chansey' },
	{ label: 'tangela' },
	{ label: 'kangaskhan' },
	{ label: 'horsea' },
	{ label: 'seadra' },
	{ label: 'goldeen' },
	{ label: 'seaking' },
	{ label: 'staryu' },
	{ label: 'starmie' },
	{ label: 'mr-mime' },
	{ label: 'scyther' },
	{ label: 'jynx' },
	{ label: 'electabuzz' },
	{ label: 'magmar' },
	{ label: 'pinsir' },
	{ label: 'tauros' },
	{ label: 'magikarp' },
	{ label: 'gyarados' },
	{ label: 'lapras' },
	{ label: 'ditto' },
	{ label: 'eevee' },
	{ label: 'vaporeon' },
	{ label: 'jolteon' },
	{ label: 'flareon' },
	{ label: 'porygon' },
	{ label: 'omanyte' },
	{ label: 'omastar' },
	{ label: 'kabuto' },
	{ label: 'kabutops' },
	{ label: 'aerodactyl' },
	{ label: 'snorlax' },
	{ label: 'articuno' },
	{ label: 'zapdos' },
	{ label: 'moltres' },
	{ label: 'dratini' },
	{ label: 'dragonair' },
	{ label: 'dragonite' },
	{ label: 'mewtwo' },
	{ label: 'mew' },
];



export default function SearchAppBar() {
	const classes = useStyles();
	const context = useContext(AppContext);
	const options = ['Option 1', 'Option 2'];
	const [value, setValue] = useState(options[0]);
	const [inputValue, setInputValue] = useState('');

	// search pokemon by name input through search bar
	// const handleSubmitSearch = e => {
	// 	e.preventDefault();
	// 	// api GET with pokemon name selected from dropdown list
	// 	getPokemonByName(inputValue).then(res => {
	// 		if (res.status === 200) {
	// 			context.setPokemonId(res.data.id);
	// 			document.getElementById('error-response').innerHTML = "";
	// 		} else {
	// 			// api GET with pokemon 100% user entered
	// 			getPokemonByName(value.toLowerCase()).then(res => {
	// 				if (res.status === 200) {
	// 					context.setPokemonId(res.data.id);
	// 						document.getElementById('error-response').innerHTML = "";
	// 					} else {
	// 						document.getElementById('error-response').innerHTML = "Invalid Pokemon name";
	// 				}
	// 			}).catch(e => {
	// 				return e;
	// 			});
	// 		}
	// 	}).catch(e => {
	// 		return e;
	// 	});
	// };

	useEffect(() => {
		const autoSearchOnMatchingName = () => {
			if (pokemon.some(element => element.label === inputValue)) {
				console.log(inputValue);
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
					console.log(value);
					getPokemonByName(value.toLowerCase()).then(res => {
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





	// useEffect(() => {
	// 	const getPokemon = async () => {
	// 		await getPokemonByName(inputValue).then(res => {
	// 			if (res.status === 200) {
	// 				context.setPokemonId(res.data.id);
	// 				document.getElementById('error-response').innerHTML = "";
	// 			} else {
	// 				// api GET with pokemon 100% user entered
	// 				getPokemonByName(value.toLowerCase()).then(res => {
	// 					if (res.status === 200) {
	// 						context.setPokemonId(res.data.id);
	// 						document.getElementById('error-response').innerHTML = "";
	// 					} else {
	// 						document.getElementById('error-response').innerHTML = "Invalid Pokemon name";
	// 					}
	// 				}).catch(e => {
	// 					return e;
	// 				});
	// 			}
	// 		}).catch(e => {
	// 			return e;
	// 		});
	// 	};
	// 	getPokemon();
	// }, [inputValue, value]);






	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						Who's That Pokedex!?
					</Typography>
					<div id={'search-container'}>
						{/*<form className={classes.search} onSubmit={handleSubmitSearch}>*/}
						<form className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<AutoCompleteSearch setValue={setValue} setInputValue={setInputValue} pokemon={pokemon}/>
						</form>
						<div id={'error-response'}></div>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

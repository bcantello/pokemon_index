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

	return (
		<Autocomplete
			value={props.value}
			onChange={(event, newValue) => {
				props.setValue(newValue);
			}}
			inputValue={props.inputValue}
			onInputChange={(event, newInputValue) => {
				props.setInputValue(newInputValue);
			}}
			id="pokemon-select"
			style={{ width: 300 }}
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
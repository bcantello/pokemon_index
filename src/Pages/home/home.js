import React, {useContext} from "react";
import {AppContext} from "../../App";
import './home.css';
import AbilityListItem from "../../Components/abilityParser/abilityListItem";

export default function Home() {
	const context = useContext(AppContext);
	const pokemon = context.pokemon;
	let height = pokemon.height / 10;
	let weight = pokemon.weight / 10;
	let hp = '';
	let spriteUrl = '';
	let name = '';
	let type = '';
	const abilityNum = [];
	let abilityArr = [];

	// Check for existence of HP stat in payload and set hp to value
	if (pokemon.stats !== undefined) {
		hp = pokemon.stats[0].base_stat;
	}

	// Check for existence of sprite in payload and set spriteUrl to desired image
	if (pokemon.sprites !== undefined) {
		spriteUrl = pokemon.sprites.front_default;
	}

	// Check for existence of name in payload and capitalize first letter
	if (pokemon.name !== undefined) {
		let nameArr = pokemon.name.split('');
		nameArr[0] = nameArr[0].toUpperCase();
		name = nameArr.join('');
	}

	// Check for existence of type in payload and capitalize first letter
	if (pokemon.types !== undefined) {
		let typeArr = pokemon.types[0].type.name.split('');
		typeArr[0] = typeArr[0].toUpperCase();
		type = typeArr.join('');
	}

	// Check for existence of abilities in payload and push to abilityNum
	if (pokemon.abilities !== undefined) {
		for (let i = 0; i < pokemon.abilities.length; i++) {
			// split ability url to find ability number
			const tempArr = pokemon.abilities[i].ability.url.split('/');
			abilityNum.push(tempArr[tempArr.length - 2]);
		}
	}

	// Pass individual ability numbers to a AbilityListItem for api call and rendering
	if (abilityNum.length !== 0) {
		abilityArr = abilityNum.map((e, index) => {
			return (
				<AbilityListItem element={e} key={index}/>
			);
		});
	}

	return (
		<div className={'card-container'}>
			<div className={'card'}>
				<div className={'name-hp-container'}>
					<div className={'name'}>{name}</div>
					<div className={'hp'}>{hp} HP</div>
				</div>
				<div className={'image-container'}>
					<img src={spriteUrl} alt={'pokemon sprite'}/>
				</div>
				<div className={'stats-container'}>
					<div className={'card-stat'}>NO. {context.pokemonId}</div>
					<div className={'card-stat'}>{type} Pokemon</div>
					<div className={'card-stat'}>HT: {height} m</div>
					<div className={'card-stat'}>WT: {weight} kg</div>
				</div>
				<div className={'abilities'}>{abilityArr}</div>
			</div>
			<div className={'card-nav-btn-container'}>
				<div className={'card-nav-btn'} onClick={context.handlePreviousPokemonClick}>Previous Pokemon</div>
				<div className={'card-nav-btn'} onClick={context.handleNextPokemonClick}>Next Pokemon</div>
			</div>
		</div>
	);
};

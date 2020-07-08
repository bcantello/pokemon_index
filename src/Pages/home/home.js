import React, {useContext} from "react";
import {AppContext} from "../../App";
import './home.css';

export default function Home() {
	const context = useContext(AppContext);
	const pokemon = context.pokemon;
	let spriteUrl = '';
	let height = pokemon.height / 10;
	let weight = pokemon.weight / 10;
	let name = '';
	let type = '';

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
		console.log("WHAT IS THIS?", typeArr);
		typeArr[0] = typeArr[0].toUpperCase();
		type = typeArr.join('');
	}

	return (
		<div className={'card-container'}>
			<div className={'card'}>
				<div className={'name'}>{name}</div>
				<div className={'image-container'}>
					<img src={spriteUrl} alt={'pokemon sprite'}/>
				</div>
				<div className={'stats-container'}>
					<div className={'card-stat'}>NO. {context.pokemonId}</div>
					<div className={'card-stat'}>{type} Pokemon</div>
					<div className={'card-stat'}>HT: {height} m</div>
					<div className={'card-stat'}>WT: {weight} kg</div>
				</div>
			</div>
			<div className={'card-nav-btn-container'}>
				<div className={'card-nav-btn'} onClick={context.handlePreviousPokemonClick}>Previous Pokemon</div>
				<div className={'card-nav-btn'} onClick={context.handleNextPokemonClick}>Next Pokemon</div>
			</div>
		</div>
	);
};
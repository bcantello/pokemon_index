import React, {useContext} from "react";
import {AppContext} from "../App";

export default function Home() {
	const context = useContext(AppContext);
	const pokemon = context.pokemon;
	let spriteUrl = '';
	let height = pokemon.height / 10;
	let weight = pokemon.weight / 10;
	let name = '';

	if (pokemon.sprites !== undefined) {
		spriteUrl = pokemon.sprites.front_default;
	}

	if (pokemon.name !== undefined) {
		let nameArr = pokemon.name.split('');
		nameArr[0] = nameArr[0].toUpperCase();
		name = nameArr.join('');
	}

	return (
		<div>
			<img src={spriteUrl} alt={'pokemon sprite'}/>
			<div>#{context.pokemonId}</div>
			<div>Name: {name}</div>
			<div>Weight: {weight} kg</div>
			<div>Height: {height} m</div>
		</div>
	);
};
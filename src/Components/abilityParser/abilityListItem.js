import React, {useEffect, useState} from "react";
import {getPokemonAbilityDetails} from "../../services/pokeApiHelper";

export default function AbilityListItem(props) {
	const [abilityDetails, setAbilityDetails] = useState();
	let name = '';
	let description = '';

	useEffect(() => {
		const getAbilities = async (abilityNumber) => {
			await getPokemonAbilityDetails(abilityNumber).then(res => {
				if (res.status === 200) {
					setAbilityDetails(res);
				} else {
					console.log(`Error retrieving data from PokeAPI. Response code ${res.status}`);
				}
			}).catch(e => {
				console.log(e);
			});
		};
		getAbilities(props.element);
	}, []);

	if (abilityDetails !== undefined) {
		name = abilityDetails.data.name
		description = abilityDetails.data.effect_entries[1].short_effect;
	}

	return (
		<div className={'abilities-container'}>
			<div className={'ability-name'}>{name}</div>
			<div className={'ability-description'}>{description}</div>
		</div>
	);
};

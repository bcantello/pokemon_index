import React, {useEffect, useState} from "react";
import {getPokemonAbilityDetails} from "../../services/pokeApiHelper";
import './abilityListItem.css';

export default function AbilityListItem(props) {
	const [abilityDetails, setAbilityDetails] = useState();
	let name = '';
	let description = '';

	// Get ability details from api based on ability number from current pokemon
	useEffect(() => {
		const getAbilities = async (abilityNumber) => {
			await getPokemonAbilityDetails(abilityNumber).then(res => {
				if (res.status === 200) {
					setAbilityDetails(res);
				}
			}).catch(e => {
				console.log(e);
			});
		};
		getAbilities(props.element);
	}, [props.element]);

	// Check for existence of abilities. Capitalize ability name and grab english description
	if (abilityDetails !== undefined) {
		let nameArr = abilityDetails.data.name.split('');
		nameArr[0] = nameArr[0].toUpperCase();
		name = nameArr.join('');

		if (abilityDetails.data.effect_entries[1] !== undefined) {
			description = abilityDetails.data.effect_entries[1].short_effect;
		}
	}

	return (
		<div className={'abilities-container'}>
			<div className={'ability-name'}>{name}</div>
			<div className={'ability-description'}>{description}</div>
		</div>
	);
};

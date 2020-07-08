import axios from 'axios';

const api = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/'
});

export const getSelectedPokemon = async (pokemonId) => {
	try {
		return await api.get(`pokemon/${pokemonId}`);
	} catch (e) {
		return e;
	}
};

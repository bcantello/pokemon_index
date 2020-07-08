import axios from 'axios';

const api = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/'
});

export const getAllPokemon = async (address) => {
	try {
		return await api.get('pokemon?limit=964');
	} catch (e) {
		return e;
	}
};

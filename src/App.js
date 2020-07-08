import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {getSelectedPokemon} from "./services/pokeApiHelper";
import Main from "./main";

function App() {
    const [pokemonId, setPokemonId] = useState(25);
    const [pokemon, setPokemon] = useState(() => {
        const result = sessionStorage.getItem('allPokemon');
        return result ? JSON.parse(result) : {}
    });
    console.log('POKEMON',pokemon)

    // Get all pokemon from PokeAPI on initial page load and save to session storage

    useEffect(() => {
        const getPokemon = async () => {
            console.log('LOOK HERE!',pokemonId);
            await getSelectedPokemon(pokemonId).then(res => {
                if (res.status === 200) {
                    setPokemon(res.data);
                    sessionStorage.setItem('allPokemon', JSON.stringify(res));
                } else {
                    console.log(`Error retrieving data from PokeAPI. Response code ${res.status}`);
                }
            }).catch(e => {
                console.log(e);
            });
        };
        getPokemon();
    }, [pokemonId]);

    const handleNextPokemonClick = () => {
        let newId = pokemonId + 1;
        setPokemonId(newId);
    }

    const handlePreviousPokemonClick = () => {
        let newId = pokemonId - 1;
        setPokemonId(newId);
    }

    return (
        <div className="App">
            <AppContext.Provider value={
                {
                    pokemon,
                    pokemonId,
                    setPokemonId,
                    handleNextPokemonClick,
                    handlePreviousPokemonClick
                }
            }>
                <Main/>
            </AppContext.Provider>
        </div>
    );
}

export const AppContext = createContext();
export default App;

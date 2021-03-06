import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {getSelectedPokemon} from "./services/pokeApiHelper";
import Main from "./main";
import SearchAppBar from "./Components/navigation/searchAppBar";

function App() {
    const [pokemonId, setPokemonId] = useState(25);
    const [pokemon, setPokemon] = useState(() => {
        const result = sessionStorage.getItem('pokemon');
        return result ? JSON.parse(result) : {}
    });

    // Get pokemon from PokeAPI on initial page load and save to session storage
    useEffect(() => {
        const getPokemon = async () => {
            await getSelectedPokemon(pokemonId).then(res => {
                if (res.status === 200) {
                    setPokemon(res.data);
                    sessionStorage.setItem('pokemon', JSON.stringify(res));
                }
            }).catch(e => {
                console.log(e);
            });
        };
        getPokemon();
    }, [pokemonId]);

    // increment pokemon id, up to 151. loop back to 1 if at 151
    const handleNextPokemonClick = () => {
        if (pokemonId === 151) {
            setPokemonId(1);
        } else {
            let newId = pokemonId + 1;
            setPokemonId(newId);
        }
    };

    // decrement pokemon id, down to 1. loop back to 151 if at 1
    const handlePreviousPokemonClick = () => {
        if (pokemonId - 1 === 0) {
            setPokemonId(151);
        } else {
            let newId = pokemonId - 1;
            setPokemonId(newId);
        }
    };

    return (
        <div className="App">
            <AppContext.Provider value={
                {
                    pokemon,
                    pokemonId,
                    setPokemonId,
                    handleNextPokemonClick,
                    handlePreviousPokemonClick,
                }
            }>
                <SearchAppBar setPokemonId={setPokemonId}/>
                <Main/>
            </AppContext.Provider>
        </div>
    );
}

export const AppContext = createContext();
export default App;

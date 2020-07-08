import React, {useEffect, useState} from 'react';
import './App.css';
import {getSelectedPokemon} from "./services/pokeApiHelper";

function App() {
  let pokemonId = 25;
  const [pokemon, setPokemon] = useState(() => {
    const result = sessionStorage.getItem('allPokemon');
    return result ? JSON.parse(result) : {}
  });
  console.log('POKEMON',pokemon)

  // Get all pokemon from PokeAPI on initial page load and save to session storage

  useEffect(() => {
    const getPokemon = async () => {
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
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;

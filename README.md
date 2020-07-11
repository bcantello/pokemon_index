# Pokemon index

Search for your favorite pokemon and view their abilities and other details. This applicaiton consumes the
[PokeAPI](https://pokeapi.co/).

## npm Libraries
* react-router
* @material-ui/core
* @material-ui/icons
* @material-ui/lab
* axios

## Additional Libraries
* Roboto Font
* Material Icons Font

## Testing/Usage
The application should start with Pikachu. From this point the user can navigate to the next pokemon or to the previous
pokemon using the buttons located below the current pokemon card. Alternately, a search field is located in the upper
right corner of the header. The user may use the drop down menu in the search field to scroll through a list of all
available pokemon, or they can begin typing to sort the list according to their input. Upon clicking on a pokemon
in the list, the card will update to the chosen pokemon. If the user types in the full name, it is not necessary to.
The card will update automatically upon name completion. From the new card, the user is then able to use the buttons
to navigate to the surounding pokemon. Upon clicking the previous or the next button, the user input in the search
field will clear. Finally, just for fun, the user can hover over the card to 'lift' it slightly from the page.

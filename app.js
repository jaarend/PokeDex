// adding info to HTML
let pokemonName = document.querySelector("#name");
let pokemonWeight = document.querySelector("#weight");
let pokemonHeight = document.querySelector("#height");
let pokemonTypes = document.querySelector("#ul-2");
let pokemonSprite = document.querySelector("#sprite-img");

function refreshPage() {
  location.reload();
}

//grabs pokemon names
fetch("https://pokeapi.co/api/v2/pokemon/?limit=1281")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (json) {
    let pokemon = json.results;
    console.log(pokemon);
    const randomIndex = Math.floor(Math.random() * pokemon.length);
    let nameOfPokemon = pokemon[randomIndex].name;
    console.log(nameOfPokemon);
    let urlOfPokemon = pokemon[randomIndex].url;
    console.log(urlOfPokemon);

    //capitalize the name
    let modifiedPokemonName = nameOfPokemon
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    let pokemonNameElement = document.createElement("h2");
    pokemonNameElement.innerText = modifiedPokemonName;
    pokemonName.appendChild(pokemonNameElement);

    //how fetch the URL associated with the randomly called pokemon
    fetch(urlOfPokemon)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (json) {
        let morePokemon = json.results;
        console.log(morePokemon);

        //grab the sprites then select the front default
        let pokeSprites = json.sprites;
        let frontDefaultSprite = pokeSprites.front_default;
        console.log(frontDefaultSprite);
        //get height
        let pokeHeight = json.height;
        //get weight
        let pokeWeight = json.weight;
        //get types
        let pokeType = json.types;
        let pokeTypes = json.types.map((type) => type.type.name);

        console.log(pokeHeight);
        console.log(pokeType);
        console.log(pokeTypes);

        //get img src as front sprite
        let pokemonSpriteElement = document.createElement("img");
        pokemonSpriteElement.src = frontDefaultSprite;

        //convert and add height (decimeters into feet and inches)
        let heightInFeet = pokeHeight * 3.2804;
        let heightInInches = (heightInFeet - Math.floor(heightInFeet)) * 12;
        let pokemonHeightElement = document.createElement("p");
        pokemonHeightElement.innerText =
          Math.floor(heightInFeet) +
          " ft " +
          Math.round(heightInInches) +
          " in";

        //add weight to HTML and convert to lbs
        let weightLBS = pokeWeight * 0.220462;
        let pokemonWeightElement = document.createElement("p");
        pokemonWeightElement.innerText = weightLBS.toFixed(2) + " lbs";

        // create a new element for types
        let typesElement = document.createElement("p");

        // iterate over each type and create a new element for each
        pokeTypes.forEach((typeName) => {
          let typeElement = document.createElement("button");
          typeElement.innerText = typeName;
          typesElement.appendChild(typeElement);
        });

        //appending new elements
        pokemonWeight.appendChild(pokemonWeightElement);
        pokemonHeight.appendChild(pokemonHeightElement);
        pokemonTypes.appendChild(typesElement);
        pokemonSprite.appendChild(pokemonSpriteElement);
      });
  });

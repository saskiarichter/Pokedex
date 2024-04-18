function searchPokemon() {
    let search = document.getElementById('search').value.toLowerCase();

    if (search.length >= 3) {
        loadResults(search);
        document.getElementById('morePokemon-button').classList.add('d-none');
    } else {
        createPokemonOverview();
        document.getElementById('morePokemon-button').classList.remove('d-none');
    }
}

async function loadResults(search) {
    pokemonSearch = [];
    for (let i = 0; i < pokemonNames.length; i++) {
        let pokemonName = pokemonNames[i];

        if (pokemonName.includes(search)) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            pokemonSearch.push(currentPokemon);
        } else {
            document.getElementById('pokemonOverview').innerHTML = '';
        }
    }
    showResults();
}

function showResults() {
    document.getElementById('pokemonOverview').innerHTML = '';
    for (let j = 0; j < pokemonSearch.length; j++) {
        const pokemon = pokemonSearch[j];
        let name = pokemon['name'];
        let type = pokemon['types']['0']['type']['name'];
        let image = pokemon['sprites']['other']['official-artwork']['front_default'];

        document.getElementById('pokemonOverview').innerHTML += templatePokemonCardSearch(j, name, type, image);
        addSecondTypeSearch(j);
        adjustColorSearch(j);
    }
}

function templatePokemonCardSearch(j, name, type, image) {
    return /*html*/ `
    <div id="pokedex${j}" class="pokedex" onclick="openPokemonCardSearch(${j})">
        <h2 id="pokemonName" class="pokemonName">${name}</h2>
        <div id="pokemonInfo${j}" class="pokemonInfo">
            <div id="pokemonTypes${j}">
            <button id="pokemonType1" class="pokemonType">${type}</button>
            </div>
            <img id="PokemonImg" src="${image}" alt="Pokemon">
        </div>
    </div> 
    `;
}

function addSecondTypeSearch(j) {
    if (pokemonSearch[j]['types']['1']) {
        document.getElementById(`pokemonTypes${j}`).innerHTML += `
        <button id="pokemonType1" class="pokemonType">${pokemonSearch[j]['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustColorSearch(j) {
    let type = pokemonSearch[j]['types']['0']['type']['name'];
    colorSearch1(j, type);
    colorSearch2(j, type);
}

function colorSearch1(j, type) {
    if (type == 'fire' | type == 'dragon' | type == 'fighting') {
        document.getElementById(`pokedex${j}`).classList.add('backgroundRed');
    }
    if (type == 'fairy' | type == 'ghost' | type == 'flying') {
        document.getElementById(`pokedex${j}`).classList.add('backgroundYellow');
    }
    if (type == 'electric' | type == 'steel') {
        document.getElementById(`pokedex${j}`).classList.add('backgroundPurple');
    }
    if (type == 'psychic' | type == 'poison') {
        document.getElementById(`pokedex${j}`).classList.add('backgroundRose');
    }
}

function colorSearch2(j, type) {
    if (type == 'grass' | type == 'bug' | type == 'ground') {
        document.getElementById(`pokedex${j}`).classList.add('backgroundGreen');
    }
    if (type == 'water' | type == 'ice') {
        document.getElementById(`pokedex${j}`).classList.add('backgroundBlue');
    }
    if (type == 'normal' | type == 'rock' | type == 'dark') {
        document.getElementById(`pokedex${j}`).classList.add('backgroundGrey');
    }
}

function openPokemonCardSearch(j) {
    document.getElementById('containerSingleCard').classList.remove('d-none');
    createSingleCardSearch(j);
    addSecondTypeSingleCardSearch(j);
    adjustColorSingleCardSearch(j);
    openStatisticsSearch(j);

    document.getElementById('body').classList.add('noscroll');
}

function createSingleCardSearch(j) {
    let pokemon = pokemonSearch[j];
    let name = pokemon['name'];
    let type = pokemon['types']['0']['type']['name'];
    let image = pokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('containerSingleCard').innerHTML = templateSingleCardSearch(j, name, type, image);
}

function templateSingleCardSearch(j, name, type, image) {
    return /*html*/ `
    <div class="layoutSingleCard" onclick="doNotClose(event)">   
        <img id="previous${j}" class="skip-img" src="./img/left-white.png" onclick="previousCardSearch(${j})">
            <div id="singleCard">
            <div class="singleCard-top">
            <div class="card-nav">
                <img onclick="closeSingleCard()" id="card-nav-left" src="./img/arrow-to-left-white.png" alt="Zurück">
                <img id="card-nav-right" src="./img/heart-white.png" alt="Favorit">
            </div>
            <h2 class="pokemonName">${name}</h2>
            <div id="card-types" class="card-types">
                <button >${type}</button>
            </div>
            <div class="card-pokemonImage">
                <img src="${image}" alt="Pokemon">
            </div>
            </div>
            <div class="singleCard-bottom">
            <h3>statistics</h3>
            <div class="div-statistics">
                <canvas id="statistics"></canvas>
            </div>
            </div>
        </div>
        <img class="skip-img" src="./img/right-white.png" onclick="nextCardSearch(${j})">
    </div>
    `;
}

function addSecondTypeSingleCardSearch(j) {
    if (pokemons[j]['types']['1']) {
        document.getElementById('card-types').innerHTML += `
        <button>${pokemons[j]['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustColorSingleCardSearch(j) {
    let type = pokemonSearch[j]['types']['0']['type']['name'];
    colorSingleCardSearch1(type);
    colorSingleCardSearch2(type);
}

function colorSingleCardSearch1(type) {
    if (type == 'fire' | type == 'dragon' | type == 'fighting') {
        document.getElementById('singleCard').classList.add('backgroundRed');
    }
    if (type == 'fairy' | type == 'ghost' | type == 'flying') {
        document.getElementById('singleCard').classList.add('backgroundYellow');
    }
    if (type == 'electric' | type == 'steel') {
        document.getElementById('singleCard').classList.add('backgroundPurple');
    }
    if (type == 'psychic' | type == 'poison') {
        document.getElementById('singleCard').classList.add('backgroundRose');
    }
}

function colorSingleCardSearch2(type) {
    if (type == 'grass' | type == 'bug' | type == 'ground') {
        document.getElementById('singleCard').classList.add('backgroundGreen');
    }
    if (type == 'water' | type == 'ice') {
        document.getElementById('singleCard').classList.add('backgroundBlue');
    }
    if (type == 'normal' | type == 'rock' | type == 'dark') {
        document.getElementById('singleCard').classList.add('backgroundGrey');
    }
}

function openStatisticsSearch(j) {
    let hp = pokemons[j]['stats']['0']['base_stat'];
    let attack = pokemons[j]['stats']['1']['base_stat'];
    let defense = pokemons[j]['stats']['2']['base_stat'];
    let spAttack = pokemons[j]['stats']['3']['base_stat'];
    let spDefense = pokemons[j]['stats']['4']['base_stat'];
    let speed = pokemons[j]['stats']['5']['base_stat'];

    const ctx = document.getElementById('statistics');
    createChart(ctx, hp, attack, defense, spAttack, spDefense, speed);
}

function nextCardSearch(j) {
    j++;
    if (j == pokemonSearch.length) {
        j = 0;
    }
    openPokemonCardSearch(j);
}

function previousCardSearch(j) {
    j--;
    if (j == -1) {
        j = pokemonSearch.length - 1;
    }
    openPokemonCardSearch(j);
}
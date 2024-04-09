let pokemonNames = ["charmander", "vulpix", "jigglypuff", "pikachu", "squirtle", "oddish", "bellsprout", "togepi", "clefairy", "cyndaquil", "mudkip", "chikorita", "growlithe", "mareep", "pichu", "eevee", "psyduck", "meowth", "teddiursa", "celebi", "mew", "mewtwo", "togekiss", "blaziken", "flareon", "jolteon", "xerneas", "leafeon", "espeon", "vaporeon", "suicune", "entei", "raikou", "snorlax", "gardevoir", "alakazam", "kirlia", "blaziken", "roselia", "ludicolo", "meganium", "jumpluff", "azumarill", "wigglytuff", "azelf", "zacian", "uxie", "volcanion", "lickitung", "luxray"];
let pokemons = [];
let currentPokemon;

async function loadPokemon() {
    for (let i = 0; i < pokemonNames.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemons.push(currentPokemon);
    }

        createPokemonOverview();
        
    console.log('loaded Pokemon', currentPokemon);
    console.log(pokemons);
}

function createPokemonOverview() {
    for (let i = 0; i < 20; i++) {
        const pokemon = pokemons[i];
        let name = pokemon['name'];
        let type = pokemon['types']['0']['type']['name'];
        let image = pokemon['sprites']['other']['official-artwork']['front_default'];        
        
        document.getElementById('pokemonOverview').innerHTML += templatePokemonCard(i, name, type, image);
          
        addSecondType(i);
        adjustBackgroundColor(i); 
    }
}

function loadMorePokemon(){
    let openPokemon = document.querySelectorAll('.pokedex');
    let number = openPokemon.length;
    
    for (let i = number; i < number + 10; i++) {
        const pokemon = pokemons[i];
        let name = pokemon['name'];
        let type = pokemon['types']['0']['type']['name'];
        let image = pokemon['sprites']['other']['official-artwork']['front_default'];        
        
        document.getElementById('pokemonOverview').innerHTML += templatePokemonCard(i, name, type, image);
          
        addSecondType(i);
        adjustBackgroundColor(i);   
    }

}

function templatePokemonCard(i, name, type, image) {
    return /*html*/ `
    <div id="pokedex${i}" class="pokedex" onclick="openPokemonCard(${i})">
        <h2 id="pokemonName" class="pokemonName">${name}</h2>
        <div id="pokemonInfo${i}" class="pokemonInfo">
            <div id="pokemonTypes${i}">
            <button id="pokemonType1" class="pokemonType">${type}</button>
            </div>
            <img id="PokemonImg" src="${image}" alt="Pokemon">
        </div>
    </div> 
    `;
}

function addSecondType(i) {
    if (pokemons[i]['types']['1']) {
        document.getElementById(`pokemonTypes${i}`).innerHTML += `
        <button id="pokemonType1" class="pokemonType">${pokemons[i]['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustBackgroundColor(i) {
    let type = pokemons[i]['types']['0']['type']['name'];
    backgroundColor1(i, type);
    backgroundColor2(i, type);
}

function backgroundColor1(i, type) {
    if (type == 'fire') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundRed');
    }
    if (type == 'fairy' || type == 'ghost') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundYellow');
    }
    if (type == 'electric') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundPurple');
    }
    if (type == 'psychic') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundRose');
    }
}

function backgroundColor2(i, type) {
    if (type == 'grass') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundGreen');
    }
    if (type == 'water') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundBlue');
    }
    if (type == 'normal') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundGrey');
    }
}

function openPokemonCard(i) {
    createSingleCard(i);
    addSecondTypeSingleCard(i);
    adjustBackgroundSingleCard(i);
    openStatistics(i);

    document.getElementById('body').classList.add('noscroll');
}

function createSingleCard(i) {
    let pokemon = pokemons[i];
    let name = pokemon['name'];
    let type = pokemon['types']['0']['type']['name'];
    let image = pokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('containerSingleCard').innerHTML = templateSingleCard(name, type, image);
}

function templateSingleCard(name, type, image) {
    return /*html*/ `
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
    `;
}

function addSecondTypeSingleCard(i) {
    if (pokemons[i]['types']['1']) {
        document.getElementById('card-types').innerHTML += `
        <button>${pokemons[i]['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustBackgroundSingleCard(i) {
    let type = pokemons[i]['types']['0']['type']['name'];
    adjustBackgroundColor1(type);
    adjustBackgroundColor2(type);
}

function adjustBackgroundColor1(type) {
    if (type == 'fire') {
        document.getElementById('singleCard').classList.add('backgroundRed');
    }
    if (type == 'fairy' || type == 'ghost') {
        document.getElementById('singleCard').classList.add('backgroundYellow');
    }
    if (type == 'electric') {
        document.getElementById('singleCard').classList.add('backgroundPurple');
    }
    if (type == 'psychic') {
        document.getElementById('singleCard').classList.add('backgroundRose');
    }
}

function adjustBackgroundColor2(type) {
    if (type == 'grass') {
        document.getElementById('singleCard').classList.add('backgroundGreen');
    }
    if (type == 'water') {
        document.getElementById('singleCard').classList.add('backgroundBlue');
    }
    if (type == 'normal') {
        document.getElementById('singleCard').classList.add('backgroundGrey');
    }
}

function openStatistics(i) {
    let hp = pokemons[i]['stats']['0']['base_stat'];
    let attack = pokemons[i]['stats']['1']['base_stat'];
    let defense = pokemons[i]['stats']['2']['base_stat'];
    let spAttack = pokemons[i]['stats']['3']['base_stat'];
    let spDefense = pokemons[i]['stats']['4']['base_stat'];
    let speed = pokemons[i]['stats']['5']['base_stat'];

    const ctx = document.getElementById('statistics');
    createChart(ctx, hp, attack, defense, spAttack, spDefense, speed);
}

function createChart(ctx, hp, attack, defense, spAttack, spDefense, speed) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'],
            datasets: [{
                data: [hp, attack, defense, spAttack, spDefense, speed],
                fill: true,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
            },
        }
    });
}

function closeSingleCard() {
    document.getElementById('containerSingleCard').innerHTML = '';
    document.getElementById('body').classList.remove('noscroll');
}

function searchPokemon() {
    console.log('test');
    let search = document.getElementById('search').value.toLowerCase();
    let allPokemons = document.querySelectorAll('.pokedex');
    
    if (search.length >= 3) {
            showResults(search, allPokemons);
    } else {
        for (let i = 0; i < pokemons.length; i++) {
            allPokemons[i].style.display = '';
        }
    }
}

function showResults(search, allPokemons){
    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = allPokemons[i];
        let name = pokemonNames[i];

        if (name.includes(search)) {
            pokemon.style.display = ''; 
        } else {
            pokemon.style.display = 'none'; 
        }   
    }
}
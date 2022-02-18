let datos = [];
let fondos = {
    0: '/img/fondo-agua.jpg',
    1: '/img/fondo-fuego.jpg',
    2: '/img/fondo-planta.jpg'
}
const escribirPokemones = (datos) => {
    let template = '';
    let main_pokemon;
    datos.map((dato, i) => {
        let numero_aleatorio = Math.floor(Math.random() * 3);
        let imagen_aleatoria = fondos[numero_aleatorio];
        main_pokemon = document.getElementById('main_pokemon');
        template += `<article class="tarjeta">
        <img src=${imagen_aleatoria} alt="fondo-tarjeta" class="tarjeta-fondo">
        <header class="tarjeta-header">
            <img src=${dato.image_front_url} alt="pokemon" class="tarjeta-header-imagen">
            <h1 class="tarjeta-titulo">${dato.name} #<span>${dato.id}</span></h1>
            <p class="tarjeta-tipo-pokemon">${dato.type[0]}</p>
        </header>
        <footer class="tarjeta-footer">
            <div class="tarjeta-footer-habilidad">
                <h3>Habilidad</h3>
                <p>${dato.abilities[0]}</p>
            </div>
            <div class="tarjeta-footer-experiencia">
                <h3>N Experiencia</h3>
                <p>${dato.experience}</p>
            </div>
        </footer>
    </article>`;
    })
    main_pokemon.innerHTML = template;
} 

const obtenerPokemones = async() => {
    //Petición
    try {
        const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200');
        if (respuesta.status == 200){
            respuesta.data.results.map(dato => {
                    axios.get(dato.url).then(respuestaPokemon => {
                        if (respuestaPokemon.status == 200){
                            let pokedata = {
                                id : respuestaPokemon.data.id,
                                name : dato.name,
                                image_front_url : respuestaPokemon.data.sprites.front_default,
                                image_back_url : respuestaPokemon.data.sprites.back_default, 
                                abilities : respuestaPokemon.data.abilities.map(dataAbility => dataAbility.ability.name),
                                type : respuestaPokemon.data.types.map(dataType => dataType.type.name),
                                experience : respuestaPokemon.data.base_experience
                            }
                            datos.push(pokedata);
                            escribirPokemones(datos);    
                        }
                    })
                    .catch(error => console.log('ocurrio un error', error))   
            })
        }
    } catch(error) {
        console.log(error);
    }
}

obtenerPokemones();
let datos = [];
const escribirPokemones = (datos) => {
    datos.map((dato, i) => {
        console.log("iteracion", i, dato);
    })
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
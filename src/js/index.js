const obtenerPokemones = async() => {
    //Petición
    try {
        const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        console.log(respuesta);
    } catch(error) {
        console.log(error);
    }
}
// URL base de la API
const API_URL = "https://pokeapi.co/api/v2";

// Función auxiliar para construir la imagen
const getPokemonImage = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// Consumo de API para obtener listado
export const getPokemonList = async (
  offset = 0,
  limit = 20
) => {
  const response = await fetch(
    `${API_URL}/pokemon?offset=${offset}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(
      "Error al obtener Pokémon"
    );
  }

  const data = await response.json();

  return data.results.map((item) => {
    const id = item.url
      .split("/")
      .filter(Boolean)
      .pop();

    return {
      id,
      name: item.name,
      image: getPokemonImage(id),
    };
  });
};

// Búsqueda por nombre o número
export const searchPokemon = async (
  searchTerm
) => {
  const term = searchTerm
    .trim()
    .toLowerCase();

  const response = await fetch(
    `${API_URL}/pokemon/${term}`
  );

  if (!response.ok) {
    throw new Error(
      "Pokémon no encontrado"
    );
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: getPokemonImage(data.id),
  };
};

// Consumo de API para detalle
export const getPokemonDetail = async (
  pokemonId
) => {
  const response = await fetch(
    `${API_URL}/pokemon/${pokemonId}`
  );

  if (!response.ok) {
    throw new Error(
      "Error al obtener detalle"
    );
  }

  const data = await response.json();

  return {
    id: data.id,

    name: data.name,

    image:
      data.sprites.other[
        "official-artwork"
      ].front_default,

    height: data.height / 10,

    weight: data.weight / 10,

    types: data.types.map(
      (item) => item.type.name
    ),

    stats: data.stats.map(
      (item) => ({
        name: item.stat.name,
        value: item.base_stat,
      })
    ),
  };
};
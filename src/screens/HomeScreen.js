import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import CardItem from "../components/CardItem";

import {
  getPokemonList,
  searchPokemon,
} from "../services/api";

export default function HomeScreen({
  navigation,
}) {
  // Hook useState
  const [pokemonList, setPokemonList] =
    useState([]);

  // Estado de carga
  const [loading, setLoading] =
    useState(true);

  // Estado para scroll infinito
  const [loadingMore, setLoadingMore] =
    useState(false);

  // Estado de búsqueda
  const [searchText, setSearchText] =
    useState("");

  // Estado de error
  const [error, setError] =
    useState("");

  // Estado offset
  const [offset, setOffset] =
    useState(0);

  // Hook useEffect
  useEffect(() => {
    loadPokemon();
  }, []);

  // Consumo de API
  const loadPokemon = async () => {
    try {
      setLoading(true);

      const data =
        await getPokemonList();

      setPokemonList(data);

      setOffset(20);

      setError("");
    } catch (error) {
      setError(
        "Ocurrió un error al cargar los Pokémon"
      );
    } finally {
      setLoading(false);
    }
  };

  // Scroll infinito
  const loadMorePokemon =
    async () => {
      if (
        loadingMore ||
        searchText.trim() !== ""
      ) {
        return;
      }

      try {
        setLoadingMore(true);

        const data =
          await getPokemonList(
            offset
          );

        setPokemonList(
          (previous) => [
            ...previous,
            ...data,
          ]
        );

        setOffset(
          (previous) =>
            previous + 20
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMore(false);
      }
    };

  // Búsqueda
  const handleSearch =
    async () => {
      if (!searchText.trim()) {
        loadPokemon();
        return;
      }

      try {
        setLoading(true);

        const pokemon =
          await searchPokemon(
            searchText
          );

        setPokemonList([
          pokemon,
        ]);

        setError("");
      } catch (error) {
        setPokemonList([]);

        setError(
          "No se encontró el Pokémon"
        );
      } finally {
        setLoading(false);
      }
    };

  // Renderizado condicional
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />

        <Text>
          Cargando Pokémon...
        </Text>
      </View>
    );
  }

  // Renderizado condicional
  if (
    error &&
    pokemonList.length === 0
  ) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={
            loadPokemon
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Reintentar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        PokéDex Explorer
      </Text>

      <View
        style={
          styles.searchContainer
        }
      >
        <TextInput
          style={styles.input}
          placeholder="Busca por nombre o número..."
          value={searchText}
          onChangeText={
            setSearchText
          }
        />

        <TouchableOpacity
          style={styles.button}
          onPress={
            handleSearch
          }
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Renderizado de listas con FlatList */}
      <FlatList
        data={pokemonList}
        keyExtractor={(item) =>
          item.id.toString()
        }
        numColumns={2}
        onEndReached={
          loadMorePokemon
        }
        onEndReachedThreshold={
          0.5
        }
        renderItem={({
          item,
        }) => (
          <CardItem
            pokemon={item}
            onPress={() =>
              // Navegación entre pantallas
              navigation.navigate(
                "Detalle",
                {
                  pokemonId:
                    item.id,
                }
              )
            }
          />
        )}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator />
          ) : null
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 15,
    },

    searchContainer: {
      flexDirection: "row",
      marginBottom: 15,
    },

    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      paddingHorizontal: 10,
      marginRight: 10,
    },

    button: {
      backgroundColor:
        "#ef5350",
      justifyContent:
        "center",
      paddingHorizontal: 15,
      borderRadius: 10,
    },

    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },

    center: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
    },
  });
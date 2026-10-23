import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { getPokemonDetail } from "../services/api";

// Traducción de estadísticas
const statTranslations = {
  hp: "Vida",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defensa Especial",
  speed: "Velocidad",
};



export default function DetalleScreen({
  route,
}) {
  // Parámetros recibidos
  const { pokemonId } =
    route.params;

  // Hook useState
  const [pokemon, setPokemon] =
    useState(null);

  // Estado de carga
  const [loading, setLoading] =
    useState(true);

  // Hook useEffect
  useEffect(() => {
    loadPokemonDetail();
  }, []);

  // Consumo de API
  const loadPokemonDetail =
    async () => {
      try {
        const data =
          await getPokemonDetail(
            pokemonId
          );

        setPokemon(data);
      } catch (error) {
        console.log(error);
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
        Cargando detalle...
      </Text>
    </View>
  );
}

  return (
    <ScrollView
      style={styles.container}
    >
      <Image
        source={{
          uri: pokemon.image,
        }}
        style={styles.image}
      />

      <Text style={styles.number}>
        #
        {String(
          pokemon.id
        ).padStart(3, "0")}
      </Text>

      <Text style={styles.name}>
        {pokemon.name.toUpperCase()}
      </Text>

      <Text style={styles.section}>
        Tipos
      </Text>

      {pokemon.types.map(
        (type) => (
          <Text
            key={type}
            style={styles.type}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        )
      )}

      <Text style={styles.info}>
        Altura: {pokemon.height} m
      </Text>

      <Text style={styles.info}>
        Peso: {pokemon.weight} kg
      </Text>

      <Text style={styles.section}>
        Estadísticas
      </Text>

      {/* Renderizado de listas */}
      {pokemon.stats.map(
        (stat) => (
          <View
            key={stat.name}
          >
            <Text>
              {statTranslations[stat.name] || stat.name}:{" "}
              {stat.value}
            </Text>

            <View
              style={
                styles.barBackground
              }
            >
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${
                      (stat.value /
                        255) *
                      100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>
        )
      )}
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },

    center: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
    },

    image: {
      width: 250,
      height: 250,
      alignSelf: "center",
    },

    number: {
      textAlign: "center",
      color: "#666",
    },

    name: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 15,
    },

    section: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 15,
      marginBottom: 10,
    },

    type: {
      fontSize: 16,
      marginBottom: 5,
    },

    info: {
      fontSize: 16,
      marginTop: 10,
    },

    barBackground: {
      height: 10,
      backgroundColor:
        "#ddd",
      borderRadius: 10,
      marginBottom: 10,
    },

    barFill: {
      height: 10,
      backgroundColor:
        "#4CAF50",
      borderRadius: 10,
    },
  });
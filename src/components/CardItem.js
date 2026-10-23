import React from "react";

import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";

export default function CardItem({
  pokemon,
  onPress,
}) {
  return (
    // Evento onPress
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={{
          uri: pokemon.image,
        }}
        style={styles.image}
      />

      <Text style={styles.number}>
        #{String(pokemon.id).padStart(3, "0")}
      </Text>

      <Text style={styles.name}>
        {pokemon.name
          .charAt(0)
          .toUpperCase() +
          pokemon.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    elevation: 3,
  },

  image: {
    width: 100,
    height: 100,
  },

  number: {
    color: "#666",
    marginTop: 5,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
});
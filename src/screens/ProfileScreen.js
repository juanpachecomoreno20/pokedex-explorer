import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function ProfileScreen() {
  // Hook useState
  const [trainerName, setTrainerName] =
    useState("Entrenador Pokémon");

  // Evento onPress
  const handleSave = () => {
    Alert.alert(
      "Perfil",
      "Perfil actualizado correctamente"
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Imagen */}
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
        }}
        style={styles.avatar}
      />

      <Text style={styles.title}>
        Mi Perfil
      </Text>

      <Text style={styles.label}>
        Nombre del entrenador
      </Text>

      {/* TextInput */}
      <TextInput
        style={styles.input}
        value={trainerName}
        onChangeText={setTrainerName}
        placeholder="Ingresa tu nombre"
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Información del proyecto
        </Text>

        <Text style={styles.info}>
          Aplicación: PokéDex Explorer
        </Text>

        <Text style={styles.info}>
          Framework: React Native
        </Text>

        <Text style={styles.info}>
          Entorno: Expo
        </Text>

        <Text style={styles.info}>
          API consumida: PokéAPI
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Conceptos utilizados
        </Text>

        <Text style={styles.info}>
          • useState
        </Text>

        <Text style={styles.info}>
          • useEffect
        </Text>

        <Text style={styles.info}>
          • Fetch API
        </Text>

        <Text style={styles.info}>
          • FlatList
        </Text>

        <Text style={styles.info}>
          • React Navigation
        </Text>

        <Text style={styles.info}>
          • Componentes reutilizables
        </Text>

        <Text style={styles.info}>
          • Props
        </Text>

        <Text style={styles.info}>
          • Renderizado condicional
        </Text>
      </View>

      {/* Evento onPress */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Guardar Perfil
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    marginBottom: 6,
  },

  button: {
    backgroundColor: "#ef5350",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

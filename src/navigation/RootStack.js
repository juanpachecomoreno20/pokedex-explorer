import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RootTabs from "./RootTabs";
import DetalleScreen from "../screens/DetalleScreen";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  console.log("ROOT STACK CARGADO");

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Principal"
        component={RootTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Detalle"
        component={DetalleScreen}
        options={{
          title: "Detalle Pokémon",
        }}
      />
    </Stack.Navigator>
  );
}

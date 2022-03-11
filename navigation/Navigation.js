import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PokemonsList from "../components/organisms/PokemonList";

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function pokemonStack(){
    return(
        <stack.Navigator>
        <stack.Screen name="pokemonList" component={PokemonsList} />
        </stack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="pokemon" component={pokemonStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
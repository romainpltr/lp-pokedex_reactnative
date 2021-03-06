import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, FlatList, View, ScrollView, Text } from 'react-native';
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import PokemonsList from "../components/organisms/PokemonList";
import PokemonDetails from "../components/organisms/PokemonDetails";
import MyTeam from "../components/organisms/MyTeam";
import PokemonSearch from "../components/organisms/PokemonSearch";
const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


function PokemonListStack(){
    return(
        <stack.Navigator initialRouteName="Accueil">     
            <stack.Screen name="Accueil" component={PokemonsList} options={{ title: 'Liste des Pokémons' }}/>
            <stack.Screen name="PokemonDetails" component={PokemonDetails} />
        </stack.Navigator>
    )
}

function PokemonSearchStack(){
    return(
        <stack.Navigator initialRouteName="Recherche">     
            <stack.Screen name="Recherche de Pokémons" component={PokemonSearch} />
        </stack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if(route.name === 'Mon équipe'){
                    iconName = focused
                      ? 'ios-people'
                      : 'ios-people-outline';
                  }

                  if (route.name === 'Liste des Pokémons') {
                    iconName = focused
                      ? 'ios-list'
                      : 'ios-list-outline';
                  }

                  if (route.name === 'Rechercher') {
                    iconName = focused
                      ? 'ios-search'
                      : 'ios-search-outline';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#533E85',
                tabBarInactiveTintColor: 'gray',
              })}
        >

            <Tab.Screen name="Liste des Pokémons" component={PokemonListStack}/>
            <Tab.Screen name="Rechercher" component={PokemonSearchStack}/>
            <Tab.Screen name="Mon équipe" component={MyTeam}/>
        </Tab.Navigator>
    </NavigationContainer>
    )
}
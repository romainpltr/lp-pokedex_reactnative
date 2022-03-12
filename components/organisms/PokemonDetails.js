import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, View, ScrollView, Text } from 'react-native';
import { useEffect, useState, useCallback } from 'react';

function PokemonDetails({route, navigation}) {
    // Capitalize
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    // navigator title
    navigation.setOptions({
        title: capitalize(route.params.data.name),
    });
    
    // props
    const { data } = route.params;
    // Maps
    const Abilities = data.abilities.map((item, index) => {
        return (
            <Text key={index}>{item.ability.name}</Text>
        )
    });
    const renderItemAbilities = useCallback(({item}) => (
        <Text style={styles.text}>{item.name}</Text>
    ));

    const Types = data.types.map((type, index) => {
        return (
            <Text key={index}>{type.type.name}</Text>
        )
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.abilities}>
                { Abilities }
            </View>
            <View style={styles.abilities}>
               { Types }
            </View>
            <View>
                { data.stats.map((item, index) => {
                    return (
                        <Text key={index}>{item.stat.name}</Text>
                    )
                })}
            </View>
            <View>
                { data.moves.map((item, index) => {
                    return (
                        <Text key={index}>{item.move.name}</Text>
                    )
                })}
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    PokemonDetails: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default PokemonDetails;
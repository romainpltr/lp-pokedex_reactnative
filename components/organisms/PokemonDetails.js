import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, View, ScrollView, Text, Button } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { setDataStorageItem, getDataStorageItem, eraseDataStorageItem } from '../../services/asyncStorage'
import { useIsFocused } from '@react-navigation/native';
function PokemonDetails({route, navigation, props}) {
    const [team, setTeam] = useState([]);
    const [isInTeam, setIsInTeam] = useState(false);
    const isFocused = useIsFocused();
    // Capitalize
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    navigation.setOptions({
        title: capitalize(route.params.data?.name),
    });
     
    useEffect(() => { 
        getDataStorageItem('@myTeam').then((result) => {
            setTeam(result ?? []);
            result.find((item) => {
                if(item.name === route.params.data.name){
                    setIsInTeam(true);
                }
            })
        })

    }, [isFocused])

    const addToTeam = () => {
        if(isTeamFull){
            alert('Your team is full');
        }else{
            setIsInTeam(true)
            setDataStorageItem('@myTeam', JSON.stringify([route.params.data, ...team]))
        }
    }

    const removeFromTeam = () => {
        setIsInTeam(false)
        // Remove from team
        const newTeam = team.filter(item => item.name !== route.params.data.name)
        console.log(newTeam);
        setDataStorageItem('@myTeam', JSON.stringify(newTeam))

    }

    // PokemonTeam is inferior to 6 
    function isTeamFull(){
        console.log('TEAM',team.length);
        if(team.length <= 6){
            return false;
        }
    }
    
    // props
    const { data } = route.params ?? item;
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
            
            { isInTeam ? <Button title="Remove from team" onPress={removeFromTeam} /> : <Button title="Add to team" onPress={addToTeam}   />}
        
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
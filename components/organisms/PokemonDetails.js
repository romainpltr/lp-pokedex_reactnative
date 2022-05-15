import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, View, ScrollView, Text, Button, Image } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { setDataStorageItem, getDataStorageItem, eraseDataStorageItem } from '../../services/asyncStorage'
import { useIsFocused } from '@react-navigation/native';
function PokemonDetails({route, navigation, props}) {
    const [team, setTeam] = useState([]);
    const [isInTeam, setIsInTeam] = useState(false);
    const isFocused = useIsFocused();
    const { data } = route.params ?? item;

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
        if(team.length >= 6){
            alert('Your team is full');
        }else{
            setIsInTeam(true)
            setDataStorageItem('@myTeam', JSON.stringify([route.params.data, ...team]))
        }
    }

    const removeFromTeam = () => {
        setIsInTeam(false)
        const newTeam = team.filter(item => item.name !== route.params.data.name)
        setDataStorageItem('@myTeam', JSON.stringify(newTeam))

    }
    // Maps
    const Abilities = data.abilities.map((item, index) => {
        return (
            <Text key={index}>{item.ability.name.toUpperCase()} </Text>
        )
    });
    const renderItemAbilities = useCallback(({item}) => (
        <Text style={styles.text}>{item.name}</Text>
    ));

    const Types = data.types.map((type, index) => {
        return (
            <Text key={index}>{type.type.name.toUpperCase()}</Text>
        )
    });

    return (
        <ScrollView style={styles.container}>
            
            { isInTeam ? <Button title="Remove from team" onPress={removeFromTeam} /> : <Button title="Add to team" onPress={addToTeam}   />}
            
            <Text style={styles.title}>{data.name.toUpperCase()} - {data.id}</Text>
            <Text style={styles.text}>Sprites</Text>
            <View style={styles.imageBox}>
                <View style={styles.imageBoxLeft}>
                    <Image source={{uri: data.sprites.front_default}} style={styles.image}/>
                </View>
                <View style={styles.imageBoxRight}>
                    <Image source={{uri: data.sprites.front_shiny}} style={styles.image}/>
                </View>
            </View>
            <Text style={styles.text}>Abilities</Text>
            <View style={styles.abilities}>
                <Text>{ Abilities }</Text>
            </View>
            <Text style={styles.text}>Types</Text>
            <View style={styles.abilities}>
               { Types }
            </View>
            <Text style={styles.text}>Stats</Text>
            <View>
                { data.stats.map((item, index) => {
                    return (
                        <View key={index} style={styles.stats}>
                            <Text key={index}>{item.stat.name.toUpperCase()}</Text>
                            <Text key={index}>{item.base_stat}</Text>
                        </View>
                    )
                })}
            </View>
            <Text style={styles.text}>Moves</Text>
            <View style={styles.stats}>
                { data.moves.map((item, index) => {
                    return (
                        <Text>{item.move.name}</Text>
                    )
                })}
            </View>
            <Text style={styles.text}>Evolution</Text>
            <View style={styles.stats}>
               
               <Text>{ data.order }</Text>
                
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    PokemonDetails: {
        flex: 1,
        backgroundColor: '#fff',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    abilities: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default PokemonDetails;
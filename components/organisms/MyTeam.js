import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, View, ScrollView, Text } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { setDataStorageItem, getDataStorageItem, eraseDataStorageItem } from '../../services/asyncStorage'
import PokemonCard from '../molecules/PokemonCard';
import { useIsFocused } from '@react-navigation/native';
function MyTeam({route, navigation }) {

        const [team, setTeam] = useState([]);
        const isFocused = useIsFocused();
        useEffect(() => { 
            getDataStorageItem('@myTeam').then((result) => {
                setTeam(result ?? []);
            })
        }, [isFocused])
        
        return (
            <View>
                <FlatList
                    data={team}
                    renderItem={({ item }) => <PokemonCard data={item.name} navigation={navigation} name={item.name} item={item} />}
                    keyExtractor={(item) => item.name}
                    numColumns={3}
                />
            </View>
        );


}
export default MyTeam;
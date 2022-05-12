import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, View, ScrollView } from 'react-native';
import { useEffect, useState, useCallback } from 'react';

import { getPokemon } from '../../api/getPokemons';
import PokemonCard from '../molecules/PokemonCard';

function PokemonsList({ navigation }) {
  const [listPokemons, setListPokemons] = useState([]);
  const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      !isLoading && loadPokemon(nextPage);
    }
    return () => { 
      isMounted = false;
    }
  }, []);

  const loadPokemon = async (url) => {
     await getPokemon(url).then((datas) => { 
      setListPokemons([...listPokemons, ...datas.results]);
      setNextPage(datas.next)
      setIsLoading(false);
    })
  }

  const renderItem = useCallback(({ item }) => (
    <PokemonCard style={styles.PokemonCard} navigation={navigation} name={item.name} link={item.url} />
  ), [])

  const keyExtractor = useCallback((item) => item.name);
  const infiniteScrollLoad = () => { loadPokemon(nextPage) };

  return (
    <View style={styles.pokemonGrid}>
        <FlatList
          data={listPokemons} 
          renderItem={renderItem} 
          keyExtractor={keyExtractor}
          onEndReached={infiniteScrollLoad}
          onEndReachedThreshold={0.5}
          numColumns={3}
          windowSize={18}
          maxToRenderPerBatch={18}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          ListFooterComponent={() =>
            isLoading && (
              <View style={styles.loader}>
                <ActivityIndicator size={"large"} color={"blue"} />
              </View>
            )
          }

        />
    </View>
  );
}

const styles = StyleSheet.create({
  PokemonCard: {

  },
  loader: {
    width: 100
  },
  pokemonGrid: {
    display: 'flex',
    backgroundColor: '#533E85',
  }
});

export default PokemonsList;

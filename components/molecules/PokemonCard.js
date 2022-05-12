
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState, memo } from 'react';

function PokemonsCard(props) {
  const [pokemonData, setPokemonData] = useState();
  const [loadingPokemonData, setLoadingPokemonData] = useState(true);
  const { name, link, navigation, item } = props;
  const getPokemonItem = () => fetch(link)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));

  useEffect(() => {
   let isMounted = true;
   getPokemonItem(link).then(( data ) => {
      if(isMounted ){
        setPokemonData(data);
        setLoadingPokemonData(false);
      }
   });
   return () => { 
    cancel = true;
  }
  }, []);

  const onTouch = () => {
    navigation.navigate('PokemonDetails', { data: pokemonData ?? item });
  }

  if(loadingPokemonData){
    return <View style={styles.container}><Image source={require('../../assets/pokeLoader.gif')} style={{width: 100, marginLeft: 'auto', marginRight: 'auto', height: 100}} /></View>
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onTouch}>
          <Image source={{uri: pokemonData?.sprites.front_default ?? item.sprites.front_default}} style={{width: 100, height: 100}}/>
          <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
      </View>
  );
}

export default memo(PokemonsCard);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '33%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: 150,
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.5,
    borderColor: '#533E70',
    borderWidth: 3,
  },
  text: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    textTransform: 'capitalize',
  },
  Image: {
    width: 100,
    height: 100,
  },
});

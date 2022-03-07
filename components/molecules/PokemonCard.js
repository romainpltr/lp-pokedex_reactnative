
import { StyleSheet, Image, Text } from 'react-native';
import { useEffect } from 'react';
import { View } from 'react-native-web';

export default function PokemonsCard(props) {
  const { name, link } = props;
  const getPokemonItem = () => fetch(url)
      .then((response) => console.log(response.json()))
      .catch((error) => console.log('error', error));

  useEffect(() => {
    const pokemonUnit = getPokemonItem(link);
    console.log(getPokemonItem(link));
    console.log(pokemonUnit);
    });

  return (
    <View>
       
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

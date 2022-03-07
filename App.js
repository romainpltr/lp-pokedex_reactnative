import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, View } from 'react-native';
import Button from './components/atoms/button';
import { getPokemon } from './api/getPokemons';
import { PokemonCard } from './components/molecules/PokemonCard';
import { useEffect, useState } from 'react';

export default function App() {
  const [listPokemons, setListPokemons] = useState({});
  async function onLoad() {
    const pokemons = await getPokemon()
    setListPokemons(pokemons);
  };

  useEffect(() => {
    onLoad();
    console.log(listPokemons);
  }, []);

  const onClick = (color) => {
    console.log(color)
  }

  const renderItem = ({ item }) => (
    <PokemonCard name={item.name} link={item.url} />
  )

  return (
    <View style={styles.container}>
      <FlatList data={listPokemons} renderItem={renderItem} />
      <Button btnTitle="Oui oui je suis dans l'espace, dans l'espace" onClick={onClick} color="blue"/>
      <Button btnTitle="EWWWWW EWWWWW EWWWW Et non je ne suis pas yann solo, ceci est une descente de police" onClick={onClick}  color="red"/>
      <Button btnTitle="Je vous demande d'enlever vos chaussettes" onClick={onClick} color="green"/>
      <StatusBar style="auto" />
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

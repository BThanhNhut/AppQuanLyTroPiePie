import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {District} from '../assets/types/PropTypes';

function CardAddres({id, name, link}: District) {
  return (
    <View style={styles.container}>
      <Image source={link} resizeMode="cover" style={styles.image}></Image>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
}
export default CardAddres;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 100,
    width: 150,
    backgroundColor: 'red',
    marginRight: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: -50,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
});

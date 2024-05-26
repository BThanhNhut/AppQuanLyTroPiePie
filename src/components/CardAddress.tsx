import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {District, District1} from '../assets/types/PropTypes';
import {Colors} from '../assets/Colors';

function CardAddres({id, name, link, onPress}: District1) {
  const handlePress = () => {
    onPress(name);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}>
      <Image source={link} resizeMode="cover" style={styles.image}></Image>
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
}
export default CardAddres;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 100,
    width: 150,
    backgroundColor: Colors.primary,
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

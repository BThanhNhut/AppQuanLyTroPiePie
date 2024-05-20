import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CardServiceProps} from '../assets/types/PropTypes';

const {width, height} = Dimensions.get('window');

function CardService({name, image}: CardServiceProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.border}>
        <Image style={styles.image} source={image} resizeMode="contain"></Image>
      </View>
      <View style={styles.txt}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default CardService;

const styles = StyleSheet.create({
  container: {
    width: width * 0.4,
    height: height * 0.25,
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    // Viền
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    justifyContent: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  border: {
    width: width * 0.4,
    height: height * 0.16,
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
    marginTop: 10,
  },
  txt: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

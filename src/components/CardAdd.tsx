import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native';
import {Colors} from '../assets/Colors';

function CardAdd({navigation}: any) {
  const goToMenu = () => {
    navigation.navigate('ManagementPost');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback onPress={goToMenu} style={styles.cardAdd}>
          <View style={styles.cardAddInner}>
            <Image
              source={require('../assets/images/Add.png')}
              resizeMode="contain"
              style={styles.addIcon}></Image>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default CardAdd;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  box: {
    width: 60,
    height: 60,
    marginTop: -30,
  },
  cardAdd: {
    shadowColor: 'Black',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardAddInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addIcon: {
    height: 40,
    width: 40,
  },
});

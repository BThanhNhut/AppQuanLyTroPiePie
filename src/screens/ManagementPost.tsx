import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../assets/Colors';

const {width, height} = Dimensions.get('window');

export default function ManagementPost({navigation}: any): React.JSX.Element {
  const gotoRentalPost = () => {
    navigation.navigate('RentalPost');
    navigation.navigate('ChatScreen');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={gotoRentalPost}>
        <Image
          style={styles.img}
          source={require('../assets/images/icon/thuetro.png')}
          resizeMode="contain"></Image>
        <Text style={styles.txt}>Cho thuê phòng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('MyChatRoomsScreen')}>
        <Image
          style={styles.img}
          source={require('../assets/images/icon/ogep.png')}
          resizeMode="contain"></Image>
        <Text style={styles.txt}>Ở ghép</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: height * 0.15,
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    //Viền
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  img: {
    margin: 10,
    width: '20%',
    height: '70%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  txt: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

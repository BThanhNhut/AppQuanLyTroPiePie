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
import {styles} from './styles/ManagementPostStyle';

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

import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../assets/Colors';
import {SearchContext} from '../contexts/SearchContext';

const {width, height} = Dimensions.get('window');

function CardSearch({navigation}: any) {
  const searchContext = useContext(SearchContext);

  const goToNotification = () => {
    navigation.navigate('NotifacationScreen');
  };
  const goToPost = async () => {
    navigation.navigate('PostScreen', {});
  };
  return (
    <View style={styles.container}>
      <View style={styles.layout1}>
        <Icon2 name="place" size={25} color="#ff7911"></Icon2>
        <Text style={{color: '#ff7911'}}>{searchContext?.Province}</Text>
      </View>
      <TouchableOpacity style={styles.txtplace} onPress={goToPost}>
        <Text style={styles.txt}>Tìm kiếm tin đăng</Text>
      </TouchableOpacity>
      <Icon
        name="bell"
        size={25}
        style={styles.icon}
        color={'#ff7911'}
        onPress={goToNotification}></Icon>
    </View>
  );
}
export default CardSearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 0.12 * height,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
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
  row: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  layout1: {
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    width: width * 0.37,
    height: '40%',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,

    zIndex: 1,
  },
  txtplace: {
    justifyContent: 'center',
    alignItems: 'center',

    width: width * 0.5,
    height: '40%',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: -15,
    backgroundColor: '#EEEEEE',
  },
  txt: {
    color: Colors.silver1,
  },
  icon: {
    marginTop: height * 0.02,
    marginLeft: width * 0.03,
  },
});

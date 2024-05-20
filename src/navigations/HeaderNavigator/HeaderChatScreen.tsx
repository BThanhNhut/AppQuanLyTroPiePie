import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import Icon5 from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

function HeaderChatScreen({navigation, route}: any) {
  const {avatar, customer_name} = route.params;
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.8}>
          <Icon5
            name="back"
            size={22}
            color={Colors.white}
            onPress={goBack}></Icon5>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={{uri: avatar}}
            style={{
              width: 35,
              height: 35,
              marginHorizontal: 5,
              borderRadius: 20,
            }}></Image>
          <Text style={styles.title}>{customer_name}</Text>
        </View>
        <View></View>
      </View>
    </View>
  );
}
export default HeaderChatScreen;

const styles = StyleSheet.create({
  container: {
    height: height * 0.1,
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
    width: width,
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.white,
    // marginRight: width * 0.64,
    // marginLeft: 10,
  },
});

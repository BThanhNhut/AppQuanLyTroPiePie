import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

const images = ['../assets/images/sl1.png', '../assets/images/sl1.png'];

const Slider = ({navigation}: any) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <TouchableOpacity
            style={styles.bell}
            onPress={() => navigation.navigate('NotifacationScreen')}>
            <Icon name="bell" size={32} color={Colors.white}></Icon>
          </TouchableOpacity>
          <Image
            source={require('../assets/images/sl1.png')}
            style={styles.image}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width,
    height: height * 0.3,
  },
  slide: {
    width,
    height: height * 0.3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  bell: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginLeft: width * 0.8,
    position: 'absolute',
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Slider;

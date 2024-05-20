import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from '../screens/styles/HomeStyle';

import Icon2 from 'react-native-vector-icons/MaterialIcons';

import {SearchContext} from '../contexts/SearchContext';

import CustomModalProvine from '../components/CustomModalProvine';
import {scrollData} from '../assets/Datas/HomeData';

const {width, height} = Dimensions.get('window');

export default function CardSearchMenu({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const searchContext = useContext(SearchContext);

  const onPressSearch = () => {
    navigation.navigate('PostScreen');
  };

  return (
    <View style={styles.cardsearch}>
      <View style={[styles.row, {height: '25%'}]}>
        <TouchableOpacity
          style={styles.layout1}
          activeOpacity={0.8}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Icon2 name="place" size={25} color="#ff7911"></Icon2>
          <Text style={{color: '#ff7911'}}>{searchContext?.Province}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.txtplace} activeOpacity={0.9}>
          <Text onPress={onPressSearch}>Tìm kiếm tin đăng </Text>
        </TouchableOpacity>
      </View>

      <CustomModalProvine
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          console.log('xin chao');
        }}
      />

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={[
            styles.row,
            {
              height: height * 0.1,
              width: width,
              marginTop: 10,
            },
          ]}>
          {scrollData.map((item, index) => (
            <View
              key={index}
              style={{
                height: '100%',
                width: '20%',
                marginLeft: 10,
              }}>
              <Image
                source={item.nameIcon}
                resizeMode="contain"
                style={{
                  height: '60%',
                  width: '100%',
                }}></Image>
              <Text
                style={{
                  textAlign: 'center',
                  height: '40%',
                  fontSize: 11,
                  marginTop: 5,
                }}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

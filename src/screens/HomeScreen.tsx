import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import CardSearch from '../components/CardSearch';
import Slider from '../components/Slider';
import {SearchContext} from '../contexts/SearchContext';
import {District, Posts} from '../assets/types/PropTypes';
import {
  districtsOfHCMC,
  districtsOfDaNang,
  districtsOfHaNoi,
} from '../assets/Datas/HomeData';
import {checkProvince, renderCards} from '../assets/Services/HomeService';
import CardAddress from '../components/CardAddress';
import CardPost from '../components/CardPost';
import CardSearchMenu from '../components/CardSeachMenu';
import {HomeContext} from '../contexts/HomeContext';

const {width, height} = Dimensions.get('window');
export default function HomeScreen({navigation}: any): React.JSX.Element {
  const [showHeader, setShowHeader] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const searchContext = useContext(SearchContext);
  const homeContext = useContext(HomeContext);
  useEffect(() => {
    const animateHeader = () => {
      Animated.timing(animatedValue, {
        toValue: showHeader ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    };
    animateHeader();
  }, [showHeader, animatedValue]);

  const latestPosts = (homeContext?.posts ?? [])
    .sort((a, b) => {
      const dateA = new Date(a.create_at).getTime();
      const dateB = new Date(b.create_at).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  const onpressDetail = (id: number) => {
    navigation.navigate('DetailScreen', {
      id_post: id,
    });
  };

  const districtsToShow: District[] = checkProvince({
    provinceroot: searchContext?.Province ?? ' ',
    districtHCM: districtsOfHCMC,
    districtDN: districtsOfDaNang,
    districtHN: districtsOfHaNoi,
  });

  const handleScroll = (event: any) => {
    const position = event.nativeEvent.contentOffset.y;
    console.log(position);
    const show = position > 350;
    setShowHeader(show);
  };

  const animatedStyleOpen = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Animated.View style={[styles.animatedContainer, animatedStyleOpen]}>
        <CardSearch navigation={navigation}></CardSearch>
      </Animated.View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View>
          <Slider navigation={navigation}></Slider>
        </View>
        {/* Card search */}
        <CardSearchMenu navigation={navigation} />
        {/*  */}
        <View style={styles.layout2}>
          <View style={styles.row}>
            <Icon3
              name="place-of-worship"
              size={20}
              color="#ff7911"
              style={styles.icon}></Icon3>
            <Text style={styles.txticon}>Khám phá</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {districtsToShow.map((item, index) => (
              <CardAddress
                key={index}
                id={item.id}
                name={item.name}
                link={item.link}></CardAddress>
            ))}
          </ScrollView>
        </View>
        <View>
          <View style={styles.row}>
            <Icon
              name="newspaper-o"
              size={20}
              color="#ff7911"
              style={styles.icon}></Icon>
            <Text style={styles.txticon}>Bài viết gần đây</Text>
          </View>
        </View>
        <View style={{marginBottom: height * 0.02}}>
          {/* <CardPost onPress={onpressDetail}  /> */}
          {latestPosts.map(item => (
            <CardPost
              key={item.id}
              item={item}
              onPress={(id: number) => onpressDetail(id)}
            />
          ))}
        </View>

        <View>
          <View style={styles.row}>
            <Icon
              name="newspaper-o"
              size={20}
              color="#ff7911"
              style={styles.icon}></Icon>
            <Text style={styles.txticon}>Bài viết nổi bật</Text>
          </View>
        </View>
        <View
          style={{
            width: width,
          }}>
          {renderCards({
            data: homeContext?.posts || [],
            onPress: onpressDetail,
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

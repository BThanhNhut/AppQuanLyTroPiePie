import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {favoriteItem} from '../assets/types/PropTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../assets/Colors';
import {AuthContext} from '../contexts/AuthContext';
import {styles} from './styles/FavoriteScreenStyle';
const {width} = Dimensions.get('window');

export default function FavoriteScreen({navigation}: any): React.JSX.Element {
  const [favorite, setfavorite] = useState<favoriteItem[]>();
  const authContext = useContext(AuthContext);
  const id_account = authContext?.account?.id;

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const responese = await Promise.all([
        axios.get(
          `https://qlphong-tro-production.up.railway.app/posts/whishlist/${id_account}`,
        ),
      ]);
      setfavorite(responese[0].data);
    } catch (error) {
      console.log('Fetch api error', error);
    }
  };
  const onpressDetail = (id: number) => {
    navigation.navigate('DetailScreen', {
      id_post: id,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {favorite?.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
            <Image
              style={styles.img}
              source={{uri: item.posts.rooms.image}}></Image>
            <View style={{marginLeft: 10}}>
              <Text>{item.posts.title}</Text>
              <View style={styles.row}>
                <Icon
                  name="transgender"
                  size={15}
                  color={Colors.primary}
                  style={{marginRight: 5}}></Icon>
                <Text>{item.posts.rooms.note_gender}</Text>
                <Icon
                  name="users"
                  size={15}
                  color={Colors.primary}
                  style={styles.icon}></Icon>
                <Text>{item.posts.rooms.number_of_people}</Text>
                <Icon
                  name="square-o"
                  size={15}
                  color={Colors.primary}
                  style={styles.icon}></Icon>
                <Text>
                  {item.posts.rooms.area_width}x{item.posts.rooms.area_height}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon2
                  name="place"
                  size={15}
                  color={Colors.primary}
                  style={{marginRight: 5}}></Icon2>
                <Text numberOfLines={1} style={{width: width * 0.5}}>
                  {item.posts.rooms.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

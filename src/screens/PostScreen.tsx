import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {HomeContext} from '../contexts/HomeContext';
import {Posts} from '../assets/types/PropTypes';
import CardPost2 from '../components/CardPost2';
import {SearchContext} from '../contexts/SearchContext';
import debounce from 'lodash.debounce';
import {styles} from './styles/PostScreenStyle';

type Props = {
  route: any;
  navigation: any;
};

export default function PostScreen({
  route,
  navigation,
}: Props): React.JSX.Element {
  const searchContext = useContext(SearchContext);
  const homeContext = useContext(HomeContext);
  const [visibleposts, setVisibleposts] = useState<Posts[]>([]);
  const [textSearch, settextSearch] = useState<string>('');
  const {district} = route.params;

  const filterPosts = useCallback(() => {
    const filteredPosts = homeContext?.posts.filter(post => {
      const provinceMatch = post.rooms.province
        .toLowerCase()
        .includes(searchContext?.Province?.toLowerCase() || '');
      const textMatch = post.rooms.address
        .toLowerCase()
        .includes(textSearch.toLowerCase());
      const districtMatch = district
        ? post.rooms.district.toLowerCase().includes(district.toLowerCase())
        : true;
      return provinceMatch && textMatch && districtMatch;
    });
    setVisibleposts(filteredPosts || []);
  }, [homeContext?.posts, searchContext?.Province, textSearch, district]);

  useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  const handleonpress = useCallback((id: number) => {
    console.log('Chọn chi tiết ' + id);
  }, []);

  const renderItem = ({item}: {item: Posts}) => (
    <View>
      <CardPost2 item={item} onPress={handleonpress}></CardPost2>
    </View>
  );

  const debouncedSetTextSearch = useCallback(
    debounce(text => {
      settextSearch(text);
    }, 2000),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Image
          source={require('../assets/images/icon/search.png')}
          style={styles.img}
          resizeMode="contain"
        />
        <TextInput
          style={styles.txt}
          placeholder="Tìm kiếm"
          onChangeText={debouncedSetTextSearch}
        />
      </View>
      <FlatList
        style={styles.flat}
        data={visibleposts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        initialNumToRender={4}
        onEndReachedThreshold={0.1}
        extraData={visibleposts}
      />
    </View>
  );
}

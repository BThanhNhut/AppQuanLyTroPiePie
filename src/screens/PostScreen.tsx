import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Colors} from '../assets/Colors';
import {HomeContext} from '../contexts/HomeContext';
import {Posts} from '../assets/types/PropTypes';
import CardPost2 from '../components/CardPost2';
import {SearchContext} from '../contexts/SearchContext';
import debounce from 'lodash.debounce';
const {width, height} = Dimensions.get('window');

export default function PostScreen(): React.JSX.Element {
  const searchContext = useContext(SearchContext);
  const homeContext = useContext(HomeContext);
  const [visibleposts, setVisibleposts] = useState<Posts[]>([]);
  const [textSearch, settextSearch] = useState<string>('');

  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  useEffect(() => {
    const visible = homeContext?.posts.filter(post =>
      post.rooms.province
        .toLowerCase()
        .includes(searchContext?.Province?.toLowerCase() || 'TP Hồ Chí Minh'),
    );
    setVisibleposts(visible || []);
  }, [homeContext?.posts, searchContext?.Province]);

  useEffect(() => {
    const visible = homeContext?.posts.filter(post =>
      post.rooms.address.toLowerCase().includes(textSearch.toLocaleLowerCase()),
    );
    setVisibleposts(visible || []);
  }, [textSearch, homeContext?.posts]);

  const handleonpress = (id: number) => {
    console.log('Chon chi tiet ' + id);
  };

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  search: {
    marginTop: 10,
    width: width * 0.9,
    height: height * 0.05,
    backgroundColor: Colors.silver2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  img: {
    marginLeft: 10,
    marginRight: 10,
    width: 24,
    height: 24,
  },
  txt: {
    marginTop: 2,
    height: '100%',
    width: '100%',
  },
  flat: {
    width: '100%',
    flex: 1,
  },
});

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import axios from 'axios';
import {Posts} from '../assets/types/PropTypes'; // Kiểu dữ liệu của posts
import {Colors} from '../assets/Colors';
import CardPost from '../components/CardPost';
import {styles} from './styles/BillManagementStyle';

const ContractManagement = ({navigation}: any): React.JSX.Element => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [dataactive, setDatadataactive] = useState<Posts[]>([]);
  const [dataunactive, setDatadataunactive] = useState<Posts[]>([]);
  const id_account = 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get(
          `https://qlphong-tro-production.up.railway.app/posts/listactive/${id_account}`,
        ),
        axios.get(
          `https://qlphong-tro-production.up.railway.app/posts/listunactive/${id_account}`,
        ),
      ]);
      setDatadataactive(responses[0].data);
      setDatadataunactive(responses[1].data);
      console.log(dataactive.length);
    } catch (error) {
      console.log('fetch data error', error);
    }
  };

  const renderScene = SceneMap({
    first: () => <FirstRoute data={dataactive} />,
    second: () => <SecondRoute data={dataunactive} />,
    third: () => <SecondRoute data={dataunactive} />,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.white}}
      style={{backgroundColor: Colors.primary}}
      activeColor={Colors.white}
      inactiveColor={Colors.white}
    />
  );

  const gotoCreateRoom = () => {
    console.log('Lọc theo điều kiện');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.search}>
          <Image
            source={require('../assets/images/icon/search.png')}
            style={styles.img}
            resizeMode="contain"
          />
          <TextInput style={styles.txt} placeholder="Tìm kiếm" />
        </View>
        <TouchableOpacity
          style={{width: 32, height: 32, marginRight: 10}}
          activeOpacity={0.8}
          onPress={gotoCreateRoom}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/images/icon/calender.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TabView
          navigationState={{
            index,
            routes: [
              {key: 'first', title: `Đang chờ kí`},
              {key: 'second', title: `Còn hiệu lực`},
              {key: 'third', title: `Hết hiệu lực`},
            ],
          }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const FirstRoute = ({data}: {data: Posts[]}) => (
  <View style={{flex: 1}}>
    <ScrollView>
      {data &&
        data.map((post, index) => (
          <CardPost
            key={index}
            item={post}
            onPress={() => {
              console.log('chon phong');
            }}
            onLongPress={() => {}}></CardPost>
        ))}
    </ScrollView>
  </View>
);

const SecondRoute = ({data}: {data: Posts[]}) => (
  <View style={{flex: 1}}>
    <ScrollView>
      {data &&
        data.map((post, index) => (
          <CardPost
            key={index}
            item={post}
            onPress={() => {
              console.log('chon phong');
            }}
            onLongPress={() => {}}></CardPost>
        ))}
    </ScrollView>
  </View>
);
export default ContractManagement;

import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function AccountAvatar(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../assets/images/icon/armchair.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: width,
    height: height * 0.1,
  },
});

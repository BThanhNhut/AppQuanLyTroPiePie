import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createChat} from './Services/ChatService';

export default function MessageScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Tin nhắn</Text>
      <TouchableOpacity
        style={{width: 50, height: 50, backgroundColor: 'red'}}
        onPress={() => createChat('2', '7')}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

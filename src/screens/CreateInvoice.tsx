import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export default function CreateInvoice(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

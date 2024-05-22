import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    width: width,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

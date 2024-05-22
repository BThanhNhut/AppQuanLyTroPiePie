import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: height * 0.15,
    width: width * 0.3,
    borderRadius: 10,
  },
  card: {
    width: width * 0.9,
    height: height * 0.15,
    borderRadius: 10,
    flexDirection: 'row',
    margin: 5,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginLeft: 15,
    marginRight: 5,
  },
});

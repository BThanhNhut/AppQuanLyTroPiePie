import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
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

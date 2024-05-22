import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: height * 0.14,
    marginVertical: 3,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: width,
    flexDirection: 'row',
    //Viền
    backgroundColor: Colors.white,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

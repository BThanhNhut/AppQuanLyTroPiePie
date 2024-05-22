import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: height * 0.15,
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    //Viền
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  img: {
    margin: 10,
    width: '20%',
    height: '70%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  txt: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

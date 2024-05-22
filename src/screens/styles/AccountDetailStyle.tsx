import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    borderRadius: 5,
    alignItems: 'center',
    height: height * 0.9,
    width: width * 0.9,
    backgroundColor: 'white',
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
  rowonly: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  img: {
    borderWidth: 2,
    borderColor: Colors.primary,
    margin: 10,
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  txt: {
    margin: 5,
    borderWidth: 1,
    width: '90%',
    borderColor: Colors.silver,
    borderRadius: 15,
  },
  button: {
    borderRadius: 10,
    margin: height * 0.04,
    height: height * 0.05,
    width: '80%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtbutton: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.white,
  },
});

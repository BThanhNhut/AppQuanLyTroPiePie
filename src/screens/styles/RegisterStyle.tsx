import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background1: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    //
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  txtusername: {
    borderColor: Colors.silver,
    marginTop: 30,
    borderWidth: 1,
    height: 45,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  txtpassword: {
    borderColor: Colors.silver,
    height: 45,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 10,
    height: 45,
    width: 100,
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.primary,
  },
  text1: {
    marginTop: 15,
    marginLeft: 20,
  },
  text2: {
    marginLeft: width * 0.25,
    color: Colors.primary,
  },
  text3: {
    fontSize: 16,
    color: Colors.primary,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 20,
    marginTop: 10,
  },
});

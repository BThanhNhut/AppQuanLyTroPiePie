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
    marginTop: height * 0.08,
    width: 300,
    height: height * 0.35,
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
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.primary,
  },
  button2: {
    marginTop: height * 0.05,
    borderRadius: 10,
    height: 55,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
  },

  text1: {
    marginTop: 15,
    marginLeft: 20,
    color: Colors.back,
  },
  text2: {
    marginTop: 15,
    marginLeft: 5,
    color: Colors.red2,
  },
  text3: {
    fontSize: 16,
    color: Colors.red2,
  },
});

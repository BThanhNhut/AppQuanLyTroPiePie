import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 10,
    flex: 1,
    backgroundColor: Colors.white,
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
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  title2: {
    margin: 10,
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.back,
  },
  rowonly: {
    alignItems: 'center',
    width: width,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.silver,
    marginHorizontal: 10,
  },
  rowcodeid: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
  },
  cmnd: {
    width: width * 0.3,
    height: height * 0.15,
    borderStyle: 'dashed',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 10,
  },
  txtinput: {
    // borderWidth: 1,
    width: width,
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.08,
    backgroundColor: Colors.white,
  },
  button: {
    height: '60%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    backgroundColor: Colors.accent,
  },
  txtbutton: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

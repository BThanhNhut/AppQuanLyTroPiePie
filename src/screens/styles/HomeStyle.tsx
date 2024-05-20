import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  cardsearch: {
    marginTop: -15,
    height: height * 0.24,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 20,
    // Viền
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  search1: {
    backgroundColor: 'black',
  },
  txtplace: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '55%',
    height: '100%',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: -10,

    backgroundColor: '#EEEEEE',
    paddingLeft: 20,
  },
  layout1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    width: '40%',
    height: '100%',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,

    zIndex: 1,
  },
  layout2: {
    height: height * 0.21,
    justifyContent: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    height: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  txticon: {
    height: 25,
    marginLeft: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  // scroll dich vu
  cardSv: {
    width: 100,
    height: '40%',
    borderWidth: 1,
  },
  //animated
  animatedContainer: {
    position: 'absolute',
    width,
    zIndex: 99,
  },
});

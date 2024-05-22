import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  background: {
    flex: 1,
  },

  rowavatar: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  rowcreate: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  custom1: {
    marginLeft: -20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: height * 0.06,
    width: width * 0.6,
    height: height * 0.04,
    backgroundColor: Colors.white,
  },
  txt: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
  img: {
    width: 60,
    height: 60,
    marginLeft: width * 0.05,
    backgroundColor: 'yellow',
    borderRadius: 30,
  },
  txttitleava: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  txtname: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  border2: {
    alignItems: 'center',
  },

  borderinfo: {
    backgroundColor: Colors.white,
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 10,
    marginTop: height * 0.05,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
  borderinfo2: {
    backgroundColor: Colors.white,
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 10,
    marginTop: height * 0.05,

    paddingLeft: 10,

    alignSelf: 'center',
    justifyContent: 'center',
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
  borderinfo3: {
    backgroundColor: Colors.white,
    width: width * 0.8,
    height: height * 0.8,
    borderRadius: 10,
    marginTop: height * 0.05,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 200,
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
  colborderinfo: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    color: Colors.back,
  },
  num: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  colborderfunction: {
    backgroundColor: 'red',
  },
  iconfunction: {
    width: 32,
    height: 32,
  },
  iconmenu: {
    width: 32,
    height: 32,
  },
  txtmenu: {
    width: width * 0.5,
    fontSize: 16,
  },
  row2: {
    height: height * 0.08,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: Colors.silver,
  },
});

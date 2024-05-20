import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DDDDDD',
  },
  imgmain: {
    height: 0.4 * height,
    width: width,
  },
  imgsuport: {
    width: '100%',
    height: '100%',
  },
  borderscroll: {
    backgroundColor: '#DDDDDD',
    height: 0.15 * height,
    marginBottom: 4,
  },
  borderimg: {
    marginRight: 4,
    backgroundColor: 'white',
    padding: 4,
    height: 0.15 * height,
    width: 0.35 * width,
  },
  infotitle: {
    width: width,
    height: height * 0.15,
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
  row: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoaddress: {
    marginTop: 5,
    width: width,
    height: height * 0.12,
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
  txt: {
    marginLeft: 10,
  },
  inforoom: {
    marginTop: 5,
    width: width,
    height: height * 0.12,
    backgroundColor: 'white',
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
  column: {
    alignItems: 'center',
    width: 0.25 * width,
    height: 80,
  },
  infotxt: {
    fontSize: 15,
    color: '#777777',
    fontWeight: 'bold',
    marginBottom: 20,
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
  info2: {
    color: '#FF7613',
  },
  //Phần dịch vụ
  service: {
    marginTop: 5,
    width: '100%',
    flex: 1,
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
  amenitie: {
    marginTop: 5,
    width: '100%',
    flex: 1,
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
  furniture: {
    marginTop: 5,
    width: '100%',
    flex: 1,
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
  //Phần chi tiết
  detail: {
    marginTop: 5,
    width: '100%',
    height: height * 0.15,
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
  servicedetail: {
    width: width,
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 20,
    marginTop: 10,
  },
  cardamenities: {
    width: width * 0.2,
    height: height * 0.1,
    margin: 2,
  },
});

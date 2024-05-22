import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.silver2,
  },
  box: {
    width: '100%',
    marginBottom: 15,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 17,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowonly: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    height: height * 0.06,
    borderBottomWidth: 0.2,
    width: '80%',
  },
  scroll: {},
  card: {
    width: width,
    marginBottom: 5,
    backgroundColor: Colors.white,
  },
  item: {
    width: '33%',
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  container2: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container3: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeroom: {
    borderWidth: 1,
    width: '30%',
    height: 30,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    marginTop: height * 0.05,
    width: width * 0.3,
    height: height * 0.15,
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  convenientcard: {
    width: '40%',
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: Colors.silver2,
  },
  // thiet lap
  button: {
    marginLeft: 10,
    width: width * 0.45,
    height: height * 0.05,
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.silver,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedButton: {
    // Màu của nút khi được chọn
    borderColor: Colors.primary,
  },
  cardbottom: {
    width: width,
    height: height * 0.1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsave: {
    width: width * 0.8,
    height: '50%',
    borderRadius: 10,
    backgroundColor: Colors.red2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

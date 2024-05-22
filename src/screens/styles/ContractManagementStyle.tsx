import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  search: {
    margin: 20,
    width: '80%',
    height: '45%',
    backgroundColor: Colors.silver2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  img: {
    marginLeft: 10,
    marginRight: 10,
    width: 24,
    height: 24,
  },
  txt: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
});

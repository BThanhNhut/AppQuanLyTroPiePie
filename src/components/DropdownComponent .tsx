import React, {useState} from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {roomsid_name} from '../assets/types/PropTypes';

type DropdownProps = {
  data?: roomsid_name[];
  onIdSelected?: (id: string) => void;
};

const DropdownComponent = ({
  data = [],
  onIdSelected = () => {},
}: DropdownProps) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="name_room"
      valueField="id"
      placeholder="Chọn tòa nhà/Phòng"
      searchPlaceholder="Tìm kiếm"
      value={value}
      onChange={item => {
        setValue(item.id);
        onIdSelected(item.id);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

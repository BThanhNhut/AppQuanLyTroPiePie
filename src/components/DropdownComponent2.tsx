import React, {useState} from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

type month = {
  id: string;
  month: string;
};

const data: month[] = [
  {id: '1', month: '1 Tháng'},
  {id: '2', month: '2 Tháng'},
  {id: '3', month: '3 Tháng'},
  {id: '4', month: '4 Tháng'},
  {id: '5', month: '5 Tháng'},
  {id: '6', month: '6 Tháng'},
  {id: '7', month: '7 Tháng'},
  {id: '8', month: '8 Tháng'},
  {id: '9', month: '9 Tháng'},
  {id: '10', month: '10 Tháng'},
  {id: '11', month: '11 Tháng'},
  {id: '12', month: '12 Tháng'},
];

type DropdownProps = {
  onIdSelected?: (id: string) => void;
};

const DropdownComponent = ({onIdSelected = () => {}}: DropdownProps) => {
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
      labelField="month"
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

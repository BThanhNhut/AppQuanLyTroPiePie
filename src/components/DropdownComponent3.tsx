import React, {useState} from 'react';
import {StyleSheet, Vibration, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

type month = {
  id: string;
  month: string;
};

const data: month[] = [
  {id: '1', month: 'Tháng 1'},
  {id: '2', month: 'Tháng 2'},
  {id: '3', month: 'Tháng 3'},
  {id: '4', month: 'Tháng 4'},
  {id: '5', month: 'Tháng 5'},
  {id: '6', month: 'Tháng 6'},
  {id: '7', month: 'Tháng 7'},
  {id: '8', month: 'Tháng 8'},
  {id: '9', month: 'Tháng 9'},
  {id: '10', month: 'Tháng 10'},
  {id: '11', month: 'Tháng 11'},
  {id: '12', month: 'Tháng 12'},
];

type DropdownProps = {
  onIdSelected?: (id: string) => void;
};

const DropdownComponent3 = ({onIdSelected = () => {}}: DropdownProps) => {
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
      placeholder="Chọn tháng thanh toán"
      searchPlaceholder="Tìm kiếm"
      value={value}
      onChange={item => {
        setValue(item.id);
        onIdSelected(item.id);
      }}
    />
  );
};

export default DropdownComponent3;

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

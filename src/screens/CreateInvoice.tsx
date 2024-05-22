import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import DropdownComponent3 from '../components/DropdownComponent3';
import axios from 'axios';
import {AuthContext} from '../contexts/AuthContext';
import {Contracts} from '../assets/types/PropTypes';
import {HomeContext} from '../contexts/HomeContext';
import {InvoicesCreate} from '../assets/types/PropTypes';
const {width, height} = Dimensions.get('window');

function formatCurrency(amount: any) {
  if (typeof amount === 'undefined' || amount === null) {
    return '';
  }
  return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function CreateInvoice({navigation}: any): React.JSX.Element {
  const authContext = useContext(AuthContext);
  const homeContext = useContext(HomeContext);
  const [contracts, setcontracts] = useState<Contracts[]>([]);
  //
  const [month, setmonth] = useState<number>(0);
  const [id_Contracts, setid_Contracts] = useState<number>();
  const [room_price, setroom_price] = useState<number>(0);
  const [nameContracts, setnameContracts] = useState<string>('');
  const [service_note, setservice_note] = useState<string>('');
  const [service_charge, setservice_charge] = useState<number>(0);

  const [discount, setdiscount] = useState<number>(0);
  const [discount_note, setdiscount_note] = useState<string>('');
  const [note, setnote] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://qlphong-tro-production.up.railway.app/contracts/accounts/${authContext?.account?.id}`,
        );
        setcontracts(response.data);
      } catch (error) {
        console.log('error');
      }
    };
    fetchData();
  }, []);
  const handleIdSelected2 = (id: string) => {
    setmonth(parseInt(id));
  };

  const selectContract = (
    id_contracts: number,
    name: string,
    room_price: number,
    navigation: any,
  ) => {
    setid_Contracts(id_contracts);
    setnameContracts(name);
    setroom_price(room_price);
    navigation.goBack();
  };

  const gotoSelect = () => {
    navigation.navigate('SelectContract', {
      selectContract: selectContract,
    });
  };

  const handleCreateInvoice = () => {
    const newInvoice: InvoicesCreate = {
      monthly_bill: month,
      service_charge,
      service_note,
      discount,
      discount_note,
      note,
      status: false,
      contracts: id_Contracts || 0,
      accounts: authContext?.account?.id || 0,
    };
    console.log(newInvoice);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.card}>
          <Text style={styles.title}>Thông tin</Text>
          <Text style={styles.title2}>Hóa đơn tiền nhà tháng</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon1
              name="calendar"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon1>
            <View
              style={{
                width: '85%',
                height: '100%',
              }}>
              <DropdownComponent3
                onIdSelected={handleIdSelected2}></DropdownComponent3>
            </View>
          </TouchableOpacity>

          <Text style={styles.title2}>Chọn hợp đồng</Text>
          <TouchableOpacity style={styles.rowonly} onPress={gotoSelect}>
            <Icon2
              name="file-contract"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon2>
            <TextInput
              style={styles.txtinput}
              placeholder="Chọn hợp đồng"
              keyboardType="numeric"
              onChangeText={text => setnameContracts(text)}>
              {nameContracts}
            </TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Phí dịch vụ</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="sticky-note-o"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập các dịch vụ"
              onChangeText={text => setservice_note(text)}></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="money"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Tổng chi phí"
              keyboardType="numeric"
              onChangeText={text =>
                setservice_charge(parseInt(text))
              }></TextInput>
          </TouchableOpacity>

          <Text style={styles.title2}>Giảm giá</Text>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="sticky-note-o"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Nhập khoản giảm"
              onChangeText={text => setdiscount_note(text)}>
              {discount_note}
            </TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowonly}>
            <Icon
              name="money"
              color={Colors.primary}
              size={24}
              style={styles.icon}></Icon>
            <TextInput
              style={styles.txtinput}
              placeholder="Tổng chi phí giảm"
              keyboardType="numeric"
              onChangeText={text => setdiscount(parseInt(text))}>
              {discount}
            </TextInput>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.rowcodeid}>
          <Text>Tiền phòng</Text>
          <Text style={styles.txt}>{formatCurrency(room_price)}</Text>
        </View>
        <View style={styles.rowcodeid}>
          <Text>Phí dịch vụ</Text>
          <Text style={styles.txt}>{formatCurrency(service_charge)}</Text>
        </View>
        <View style={styles.rowcodeid}>
          <Text>Tổng</Text>
          <Text style={styles.txt}>
            {formatCurrency(room_price + service_charge)}
          </Text>
        </View>
        <View style={styles.rowcodeid}>
          <Text>Giảm giá</Text>
          <Text style={styles.txt}>{formatCurrency(discount)}</Text>
        </View>
        <View style={styles.rowcodeid}>
          <View>
            <Text style={styles.result}>Tổng tiền</Text>
            <Text style={styles.result2}>
              {formatCurrency(room_price + service_charge - discount)}
            </Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{fontWeight: 'bold', color: Colors.white}}>
              Tạo hóa đơn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: width,
  },
  icon: {
    margin: 10,
  },
  txtinput: {
    // borderWidth: 1,
    width: width,
  },
  bottom: {
    width,
    height: height * 0.24,
    //
    backgroundColor: Colors.white,
    shadowColor: Colors.back,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  txt: {
    fontWeight: 'bold',
  },
  result: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  result2: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'red',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '40%',
    height: 30,
    backgroundColor: Colors.red2,
  },
});

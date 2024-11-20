import React from "react";
import { Text, TouchableOpacity, View, Image } from 'react-native';
import generalStyles from "../../../styles/generalStyles";
import { Icons } from "../../../assets/icons";
import homeStyles from "../homeStyles";
import colors from "../../../values/colors";
import Modal from "../../../components/Modal";
import InfoSection from "../../../components/InfoSection/index";
import { useSelector } from "react-redux";
const Home = ({navigation}) => {
  
  const userData = useSelector((state) => state.user.userInfo)
  const infoData = [
    [
      { label: 'Số tòa nhà', value: '15' },
      { label: 'Số người thuê', value: '400' },
    ],
    [
      { label: 'Số phòng', value: '440' },
      { label: 'Số phòng trống', value: '25' },
    ],
  ];
  return (
    <View style={generalStyles.container}>
        <View style={{height:'18%', width:'100%',position:'absolute', top:0, zIndex:2, backgroundColor: colors.primary_green, borderBottomEndRadius:20, borderBottomStartRadius:20}}>
            <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:"center", width:"90%", alignSelf:"center", marginTop:'4%'}}>
                <View>
                    <Text style={{fontSize:12,color:'white'}}>Xin chào</Text>
                    <Text style={{color:'white', fontWeight:"600", fontSize:16}}>{userData.firstName} {userData.lastName}</Text>
                </View>
                <View>
                    {/* <Text style={{fontSize:12,color:'white'}}>Xin chào</Text>
                    <Text style={{color:'white', fontWeight:"600", fontSize:14}}>Phạm Văn Hoàng</Text> */}
                </View>
            </View>
        </View>
      {/* Thông tin chung */}

        <InfoSection style={{position:"absolute", zIndex:10, top:'8%'}} data={infoData} numColumns={2}/>


      <View style={[homeStyles.containerColumn, { gap: 40, position:"absolute", top:'28%', }]}>
        {[
          [
            { icon: Icons.iconService, label: 'Dịch vụ', navigate: 'Services' },
            { icon: Icons.iconPipe, label: 'Chốt điện nước' },
            { icon: Icons.iconInvoice, label: 'Hóa đơn' },
          ],
          [
            { icon: Icons.iconAlert, label: 'Sự cố', navigate: 'Problem'  },
            { icon: Icons.iconContract, label: 'Hợp đồng' },
            { icon: Icons.iconBill, label: 'Sổ nợ' },
          ],
          [
            { icon: Icons.iconAlert, label: 'Tòa nhà', navigate: 'Building'  },
          ],

        ].map((row, rowIndex) => (
          <View key={rowIndex} style={homeStyles.flexRow}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity onPress={()=>navigation.navigate(item.navigate)} key={itemIndex} style={homeStyles.iconButtonContainer}>
                <Image style={{ height: 40, width: 40 }} source={item.icon} />
                <Text style={{fontWeight:"500"}}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

        {/* <Modal
          title={'Thông báo'}
          modalContainerStyle={{height:'100%',borderRadius:0}}
          leftIconHeader={Icons.iconLeftArrow}
          styleIconHeader={{height:20,width:20}}
        /> */}
    </View>
  );
};

export default Home;

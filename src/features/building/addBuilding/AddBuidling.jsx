// AddBuilding.js
import { StyleSheet, View, Dimensions, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import colors from '../../../values/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import TextInputComponent from '../../../components/TextInput';
import { fontFamily } from '../../../assets/fonts/useFont';
import generalStyles from '../../../styles/generalStyles';
import { Icons } from '../../../assets/icons';
const AddBuilding = ({navigation}) => {
  // Lấy kích thước màn hình
  const { width, height } = Dimensions.get('window');

  // Hàm trả về biểu tượng quay lại
  const leftIcon = (
    <Ionicons onPress={()=> navigation.goBack()}  name="chevron-back-outline" size={30} color={colors.black} />
  );

  const [buildingInfo, setBuildingInfo] = useState({
    building_name: '',
    number_of_floors: '',
    rental_costs: '',
    description: '',
    address: '',
    city: '',
    district: '',
    payment_date: new Date().toISOString(),
    advance_notice: 0,
    payment_time: new Date().toISOString(),
    payment_timeout: new Date().toISOString(),
    management: '',
    fee_based_service: '',
    free_service: '',
    utilities: '',
    building_note: '',
  });

  return (
    <View style={[styles.container, { width, height }]}>
      <Header leftIcon={leftIcon} titleHeader={'Thêm tòa nhà'} />
      <ScrollView contentContainerStyle={{paddingHorizontal:10}}>
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Tên tòa nhà <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập tên tòa nhà'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Số tầng <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập số tầng'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Chi phí thuê nhà</Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập chi phí thuê nhà'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Mô tả <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập mô tả'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            />
        <View style={{height:20}}></View>
        <Text style={{fontFamily: fontFamily.regular}}>Địa chỉ <Text style={{color:'red'}}>*</Text></Text>
        <TextInputComponent 
            noBorder={true} 
            styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
            placeholder={'Nhập địa chỉ'}
            borderColor={colors.grayC4}
            styleLabel={{fontFamily:fontFamily.regular}}
            />
        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:20}}>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Tỉnh/Thành phố <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Nhập Tỉnh/Thành phố'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Quận/Huyện <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Nhập Quận/Huyện'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:20}}>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Mở cửa</Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'06:00'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Đóng cửa </Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'23:00'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:20}}>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Ngày chốt tiền <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Chọn ngày chốt'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Chuyển báo trước <Text style={{color:'red'}}>*</Text> </Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Số ngày báo trước'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:20}}>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}>Thời gian nộp tiền phòng <Text style={{color:'red'}}>*</Text></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Ngày bắt đầu'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
            <View style={{width:"48%"}}>
                <Text style={{fontFamily: fontFamily.regular}}></Text>
                <TextInputComponent 
                    noBorder={true} 
                    styleAreaInput={{borderBottomWidth:1,marginTop:10,paddingHorizontal:0}}  
                    placeholder={'Ngày kết thúc'}
                    borderColor={colors.grayC4}
                    styleLabel={{fontFamily:fontFamily.regular}}
                    />
            </View>
        </View>
        <View style={{marginTop:30,gap:10}}>
            <Text style={{fontFamily:fontFamily.bold}}>Quản lý tòa nhà</Text>
            <View style={[{height:150, width:120, borderRadius:10, alignItems:"center", justifyContent:"center"}, generalStyles.boxShadow]}>
                <Image style={{height:50,width:50, marginBottom:10}} resizeMode={'cover'} source={Icons.iconUserGrayC4Full}/>
                <Text style={{fontSize:12, fontFamily:fontFamily.semiBold, marginBottom:4}}>Phạm Văn Hoàng</Text>
                <Text style={{fontSize:12, color:colors.primary_green}}>0382823789</Text>
            </View>
        </View>

        <View style={{marginTop:30,gap:10}}>
            <Text style={{fontFamily:fontFamily.bold}}>Dịch vụ có phí</Text>
            <View style={[{height:150}]}>
               
            </View>
        </View>

        <View style={{width:"100%",gap:40}}>
            <Text style={{fontFamily:fontFamily.bold}}>Lưu ý của tòa nhà</Text>
            <TextInputComponent
                style={[{height:100,width:"100%", borderRadius:10, color:colors.black, paddingHorizontal:10}, generalStyles.boxShadow]}
                noBorder
                numberOfLines={4}
                multiline
                placeholder={'Nhập lưu ý của tòa nhà'}
                placeholderTextColor={colors.gray59}
            />
        </View>
        <TouchableOpacity style={{height:50, width:"100%", backgroundColor:colors.primary_green, marginTop:80, borderRadius:10, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontFamily:fontFamily.bold, color:colors.white, fontSize:15}}>Thêm tòa nhà</Text>
        </TouchableOpacity>


        <View style={{height:300}}></View>


      </ScrollView>
    </View>
  );
};

export default AddBuilding;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.white,
  },
});

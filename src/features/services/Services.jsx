import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";
import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import colors from '../../values/colors'
import { Icons } from '../../assets/icons'
import Icon from "react-native-vector-icons/FontAwesome";
import FontAweSome5 from "react-native-vector-icons/FontAwesome5";
import TextInputComponent from "../../components/TextInput";
import { fontFamily } from "../../assets/fonts/useFont";
import generalStyles from "../../styles/generalStyles";
import Modal from "../../components/Modal";
import ServicesComponent from "./components/ServicesComponent";

const Services = ({navigation}) => {
  return (
    <View style={[styles.container, {position:"relative"}]}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={'Dịch vụ'}
        rightIcon={
          <Icon
            name="edit"
            size={24}
            // onPress={() => setIsOpenEditBuildingModal(true)}
            color={colors.orange}
          />
        }
      />
      <ScrollView style={{flex:1, paddingHorizontal:10, backgroundColor:'white', marginTop:1}}>
        <TextInputComponent
            styleAreaInput={{ height: 40, width: "100%", alignSelf: "center", marginBottom: 20, marginTop:10 ,backgroundColor:colors.lightGray }}
            borderRadius={20}
            borderColor={colors.grey}
            leftIcon={Icons.iconSearchBlackFull}
            placeholder={'Tìm kiếm dịch vụ'}
            // onChangeText={handleSearch}
            style={{ marginLeft: 5 }}
            />
        
        <Text style={{fontSize:16, fontWeight:'700', marginBottom:20}}>Dịch vụ có phí</Text>

        <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'flex-start', gap:20, paddingBottom:20 }}>
            <View style={[{ width: "30%", justifyContent: 'center', alignItems: "center",   paddingVertical: 30, gap: 8, borderRadius: 10 }, generalStyles.boxShadow]}>
                <Image style={{ height: 35, width: 35 }} source={Icons.iconLight} />
                <Text style={{ fontSize: 13, fontWeight: '600' }}>Điện</Text>
                <Text style={{ fontSize: 12, color: colors.red }}>3.500 đ/Kwh</Text>
            </View>
            <View style={[{ width: "30%", justifyContent: 'center', alignItems: "center",   paddingVertical: 30, gap: 8, borderRadius: 10 }, generalStyles.boxShadow]}>
                <Image style={{ height: 35, width: 35 }} source={Icons.iconLight} />
                <Text style={{ fontSize: 13, fontWeight: '600' }}>Điện</Text>
                <Text style={{ fontSize: 12, color: colors.red }}>3.500 đ/Kwh</Text>
            </View>
            <View style={[{ width: "30%", justifyContent: 'center', alignItems: "center",  paddingVertical: 30, gap: 8, borderRadius: 10 }, generalStyles.boxShadow]}>
                <Image style={{ height: 35, width: 35 }} source={Icons.iconLight} />
                <Text style={{ fontSize: 13, fontWeight: '600' }}>Điện</Text>
                <Text style={{ fontSize: 12, color: colors.red }}>3.500 đ/Kwh</Text>
            </View>
            <View style={[{ width: "30%", justifyContent: 'center', alignItems: "center",   paddingVertical: 30, gap: 8, borderRadius: 10 }, generalStyles.boxShadow]}>
                <Image style={{ height: 35, width: 35 }} source={Icons.iconLight} />
                <Text style={{ fontSize: 13, fontWeight: '600' }}>Điện</Text>
                <Text style={{ fontSize: 12, color: colors.red }}>3.500 đ/Kwh</Text>
            </View>
            
        </View>

      </ScrollView>

      <View style={{position:"absolute", height:60,width:60,borderRadius:30, backgroundColor:colors.primary_green, bottom:'8%', right:"8%", justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:30,fontWeight:'600', color:colors.white}}>+</Text>
      </View>


        <Modal
            titleHeader={'Thêm dịch vụ'} 
            fullScreen
            leftIconHeader={Icons.iconLeftArrow}
          styleIconHeader={{ height: 20, width: 20 }}
          rightIconHeader={Icons.IconThreeDots} 
          headerStyles={{ justifyContent: "space-between" }}   
          children={ <ServicesComponent/> }
            />
    </View>
  )
}

export default Services

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
    }
})
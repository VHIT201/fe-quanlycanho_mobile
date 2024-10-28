import { ScrollView, StyleSheet, Text, TouchableOpacity, View,  } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import generalStyles from "../../../styles/generalStyles";
import Header from "../../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../values/colors";
import { fontFamily } from "../../../assets/fonts/useFont";
import InfoSection from "../../../components/InfoSection";
import RoomInfoComponent from "./components/RoomInfo";


const DetailRoom = ({ navigation }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(0);
  const { room } = useSelector((state) => state.building);
  console.log(room);


  return (
    <View style={[generalStyles.container, {backgroundColor:colors.white}]}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={room.room_name}
        rightIcon={
          <Icon
            name="edit"
            size={24}
            // onPress={() => setIsOpenEditBuildingModal(true)}
            color={colors.orange}
          />
        }
      />
      <View style={[generalStyles.container, {marginTop:1 ,backgroundColor:colors.white}]}>
        <View
          style={{
            height: 50,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={()=>setMode(0)} style={mode === 0 ? styles.active : styles.nonActive}>
            <Text >Thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setMode(1)} style={mode === 1 ? styles.active : styles.nonActive}>
            <Text >Người thuê</Text>
          </TouchableOpacity>
        </View>

        <View style={[generalStyles.container, {backgroundColor:colors.white}]}>
            {
                mode === 0 ? 
                (
                    <RoomInfoComponent room={room}/>
                )
                :
                (
                    
                        room?.renter === 0 ? 
                        (
                            <View style={{flex:1, paddingTop:'70%', alignItems:"center"}}>
                                <Text style={{color:colors.gray59}}>Chưa có khách hàng</Text>
                            </View>
                        )
                        :
                        (
                            
                            <View style={{width:"95%", alignSelf:'center', paddingTop:10}}>
                    <TouchableOpacity style={[{flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center" ,paddingHorizontal:10 ,paddingVertical:10, borderRadius:10}, generalStyles.boxShadow]}>
                        <View style={{width:'12%',}}>
                            <View style={{height:40, width:40, borderRadius:20, backgroundColor:"red"}}></View>
                        </View>
                        <View style={{width:'58%', height:"100%", justifyContent:"flex-start",gap:1}}>
                            <Text style={{fontWeight:'600'}}>Phạm Văn Hoàng</Text>
                            <Text style={{fontSize:12, fontWeight:"400", color:colors.gray59}}>test 1 - khu kios</Text>
                        </View>
                        <View style={{width:'30%', height:'100%',alignItems:"flex-end"}}>
                            <Text style={{fontSize:12, fontFamily:fontFamily.semiBold, color:colors.primary_green}}>0382823784</Text>
                        </View>
               </TouchableOpacity>
           </View>
                        )
                    

                )
            }



        </View>

      </View>
    </View>
  );
};

export default DetailRoom;

const styles = StyleSheet.create({
  active: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary_green,
    backgroundColor:"white",
    width: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nonActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.greyF3,
    backgroundColor:"white",
    width: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});

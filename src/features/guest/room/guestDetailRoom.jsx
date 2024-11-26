import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import generalStyles from "../../../styles/generalStyles";
import Header from "../../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../values/colors";
import RoomInfoComponent from "../../building/detailRoom/components/RoomInfo";
import { fetchRoomById } from "../../../services/guestService";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
const GuestDetailRoom = ({ navigation }) => {
    const { room } = useSelector((state) => state.guest);
    const route = useRoute()
    const dispatch = useDispatch()
    const roomId = route.params.roomId
    const fetchInitialData = async ( roomId ) => {
        await fetchRoomById(dispatch, roomId);
    }
  useFocusEffect(
    React.useCallback(() => {
        fetchInitialData(roomId)
      return () => {
        // navigation.goBack()
      };
    }, [])
  );
  return (
    <View style={[generalStyles.container, { backgroundColor: colors.white }]}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={room.room_name || "Thông tin phòng"}
      />

      <View
        style={[
          generalStyles.container,
          { marginTop: 1, backgroundColor: colors.white },
        ]}
      >
        <ScrollView style={{ width: "100%" }}>
          {/* Thông tin phòng */}
          <RoomInfoComponent navigation={navigation} isUserViewing={false} room={room} />
        </ScrollView>
      </View>
    </View>
  );
};

export default GuestDetailRoom;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    position: "relative",
  },
});

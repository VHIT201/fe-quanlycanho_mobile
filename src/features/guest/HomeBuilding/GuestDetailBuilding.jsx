import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import Header from "../../../components/Header";
import colors from "../../../values/colors";
import TextInputComponent from "../../../components/TextInput";
import { Icons } from "../../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAweSome5 from "react-native-vector-icons/FontAwesome5";
import generalStyles from "../../../styles/generalStyles";
import { fontFamily } from "../../../assets/fonts/useFont";
import RoomItem from "../../../components/RoomItem/RoomItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRoomsByBuildingId } from "../../../services/guestService";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../store/stateSlice";
import { fetchRoomById } from "../../../services/guestService";
import { listRoom } from "../../../store/guestSlice";
import { showMessage } from "react-native-flash-message";
import { resetListRoom } from "../../../store/guestSlice";
import Modal from "../../../components/Modal";
import { FontAwesome5 } from "@expo/vector-icons";

const GuestDetailBuilding = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { building } = route.params;
  const { listRoom } = useSelector((state) => state.guest);

  const getRooms = async () => {
    try {
      await fetchRoomsByBuildingId(dispatch, building.id);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handlePressRoomItem = async (id) => {
    try {
      navigation.navigate('GuestDetailRoom',{
        roomId : id
      })
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const openInGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    Linking.canOpenURL(googleMapsUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(googleMapsUrl);
        } else {
          console.error("Google Maps is not supported");
        }
      })
      .catch((err) => {
        console.error("Error opening Google Maps:", err);
      });
  };

  useEffect(() => {
    dispatch(clearError());
    dispatch(resetListRoom());
    getRooms();
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      getRooms();
    }, [])
  );
  return (
    <View style={styles.container}>
      <Header
        leftIcon={
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={building.building_name}
        rightIcon={
          <Icon
            name="location-arrow"
            size={24}
            onPress={() =>
              openInGoogleMaps(
                `${building.address}, ${building.district}, ${building.city}`
              )
            }
            color={colors.primary_green}
          />
        }
      />
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.tertiary_blue,
            marginBottom: 16,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            marginTop: 20,
          }}
        >
          {/* Diện tích */}
          <View
            style={{
              width: "50%",
              alignItems: "center",
              padding: 8,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              Địa chỉ
            </Text>
            <Text style={{ color: "white", fontSize: 14 }}>
              {building.address} {building.district}
            </Text>
          </View>

          {/* Tầng */}
          <View
            style={{
              width: "50%",
              alignItems: "center",
              padding: 8,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              Tầng
            </Text>
            <Text style={{ color: "white", fontSize: 14 }}>
              {building.number_of_floors}
            </Text>
          </View>
          <View
            style={{
              width: "50%",
              alignItems: "center",
              padding: 8,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              Tỉnh/Thành
            </Text>
            <Text style={{ color: "white", fontSize: 14 }}>
              {building.city}
            </Text>
          </View>

          {/* Phòng khách */}
          <View
            style={{
              width: "50%",
              alignItems: "center",
              padding: 8,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              Tình trạng
            </Text>
            <Text style={{ color: "white", fontSize: 14 }}>Đang hoạt động</Text>
          </View>
        </View>
        {listRoom && listRoom.length == 0 ? (
          <View
            style={{
              height: 350,
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.gray59 }}>
              Không có phòng, vui lòng tạo phòng!
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingHorizontal: "4%",
                paddingVertical: 10,
              }}
            >
              {listRoom?.rooms.map((item) => (
                <RoomItem
                  onPress={() => handlePressRoomItem(item.id)}
                  key={item.id}
                  roomName={"test"}
                  price={"2.000.000"}
                  userCount={2}
                  invoiceCount={0}
                  warningCount={0}
                />
              ))}
            </View>
            <View style={{ height: 200 }}></View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default GuestDetailBuilding;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "relative",
  },
});

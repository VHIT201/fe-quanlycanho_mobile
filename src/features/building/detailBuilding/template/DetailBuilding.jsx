import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import Header from "../../../../components/Header";
import colors from "../../../../values/colors";
import TextInputComponent from "../../../../components/TextInput";
import { Icons } from "../../../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAweSome5 from "react-native-vector-icons/FontAwesome5";
import generalStyles from "../../../../styles/generalStyles";
import { fontFamily } from "../../../../assets/fonts/useFont";
import RoomItem from "../../../../components/RoomItem/RoomItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchRoomsByBuildingId,
  fetchBuildingById,
  fetchRoomById,
} from "../../../../services/buildingServies";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../../store/stateSlice";

import { showMessage } from "react-native-flash-message"; // Import showMessage
import { resetListRoom } from "../../../../store/buildingSlice";
import Modal from "../../../../components/Modal/index";
import EditBuilding from "../components/EditBuilding";

const DetailBuilding = ({ navigation }) => {
  const [isOpenEditBuildingModal, setIsOpenEditBuildingModal] = useState(false);
  const [userToken, setUserToken] = useState();
  const route = useRoute();
  const dispatch = useDispatch();
  const { listRoom, building } = useSelector((state) => state.building);

  // Hàm để fetch danh sách phòng
  const getRooms = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken"); 
      setUserToken(token);
      if (token) {
        await fetchRoomsByBuildingId(dispatch, token, building.id); 
      } else {
        console.error("Token not found");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handlePressRoomItem = async (id) => {
    try {
      if (userToken) {
        await fetchRoomById(dispatch, userToken, id);
        navigation.navigate('DetailRoom')
      } else {
        console.error("Token not found");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    // Reset room list khi component được mount
    dispatch(clearError());
    dispatch(resetListRoom());

    // Gọi API để lấy danh sách phòng lần đầu tiên
    getRooms();
  }, [dispatch]);

  // Dùng useFocusEffect để gọi lại getRooms khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      getRooms(); // Gọi lại API khi màn hình được focus
    }, [])
  );

  const handleEditBuildingInModal = async () => {
    try {
      setIsOpenEditBuildingModal(false); // Đóng modal sau khi cập nhật
      showMessage({ message: "Tòa nhà đã được cập nhật!", type: "success" });
      await dispatch(fetchBuildingById(dispatch, building.id, userToken));
    } catch (error) {
      // console.log("Lỗi khi cập nhật:", error);
      // showMessage({ message: "Lỗi khi cập nhật tòa nhà!", type: "danger" });
    }
  };

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
            name="edit"
            size={24}
            onPress={() => setIsOpenEditBuildingModal(true)}
            color={colors.orange}
          />
        }
      />
      <ScrollView style={{ width: "100%", flex: 1 }}>
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
            <TextInputComponent
              placeholder={"Tìm kiếm theo tên"}
              noBorder
              styleAreaInput={{
                borderRadius: 20,
                paddingHorizontal: 20,
                backgroundColor: colors.lightGray,
                width: "95%",
                alignSelf: "center",
                marginTop: 10,
              }}
              placeholderTextColor={colors.gray59}
              leftIcon={Icons.iconSearchBlackFull}
            />
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
                  onPress={()=>handlePressRoomItem(item.id)}
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddRoom", { buildingId: building.id })
        }
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          position: "absolute",
          bottom: "5%",
          right: "6%",
          backgroundColor: colors.primary_green,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3.5,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "600", color: colors.white }}>
          +
        </Text>
      </TouchableOpacity>

      {isOpenEditBuildingModal && (
        <Modal
          fullScreen={true}
          titleHeader={"Sửa thông tin Building"}
          leftIconHeader={Icons.iconLeftArrow}
          styleIconHeader={{ height: 20, width: 20 }}
          rightIconHeader={Icons.IconThreeDots}
          onLeftIconHeaderPress={() => setIsOpenEditBuildingModal(false)}
          headerStyles={{ justifyContent: "space-between" }}
          children={
            <EditBuilding
              handleEditBuildingInModal={handleEditBuildingInModal}
              building={building}
            />
          }
        />
      )}
    </View>
  );
};

export default DetailBuilding;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "relative",
  },
});

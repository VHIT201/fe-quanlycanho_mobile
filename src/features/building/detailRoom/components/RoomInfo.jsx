import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../../../values/colors";
import { fontFamily } from "../../../../assets/fonts/useFont";
import InfoSection from "../../../../components/InfoSection";
import generalStyles from "../../../../styles/generalStyles";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

const RoomInfoComponent = ({ room, isUserViewing = true, navigation  }) => {
  const infoData1 = [
    [
      { label: "Diện tích", value: room.acreage },
      { label: "Phòng ngủ", value: room.number_of_bedrooms },
    ],
    [
      { label: "Tầng", value: room.floor },
      { label: "Phòng khách", value: room.number_of_living_rooms },
    ],
  ];
  const handleBooking = () => {
    navigation.navigate("CreateBooking", {
      room: room,
    });
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          height: 50,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.grayC4,
        }}
      >
        <Text style={{ color: colors.white, fontFamily: fontFamily.semiBold }}>
          Phòng trống
        </Text>
      </View>
      <View
        style={{
          height: 50,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: fontFamily.semiBold }}>
          {room.room_price} đ
        </Text>
      </View>
      <InfoSection
        styleValue={{ color: 'white', fontFamily: fontFamily.bold }}
        styleLabel={{ color: colors.white, fontFamily: fontFamily.semiBold }}
        style={{ backgroundColor: colors.primary_green }}
        data={infoData1}
        numColumns={3}
      />

      <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
        <Text style={styles.label}>Dịch vụ có phí</Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.gray59 }}>Dữ liệu trống</Text>
        </View>

        <Text style={styles.label}>Dịch vụ miễn phí</Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.gray59 }}>Dữ liệu trống</Text>
        </View>

        <Text style={styles.label}>Tiện ích phòng</Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.gray59 }}>Dữ liệu trống</Text>
        </View>

        <Text style={styles.label}>Nội thất</Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.gray59 }}>Dữ liệu trống</Text>
        </View>

        <Text style={styles.label}>Mô tả phòng</Text>
        <View style={[generalStyles.boxShadow, styles.textInputContainer]}>
          <AutoGrowingTextInput
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            placeholder={"Chưa có mô tả"}
            editable={isUserViewing} // Điều kiện chỉnh sửa
          />
        </View>

        <Text style={styles.label}>Lưu ý cho người thuê phòng</Text>
        <View style={[generalStyles.boxShadow, styles.textInputContainer]}>
          <AutoGrowingTextInput
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            placeholder={"Chưa có lưu ý"}
            editable={isUserViewing} // Điều kiện chỉnh sửa
          />
        </View>

        {isUserViewing ? (
          <TouchableOpacity
            style={{
              height: 50,
              marginTop: 20,
              width: "100%",
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: fontFamily.bold, color: colors.white }}>
              Xóa phòng
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              height: 50,
              marginTop: 20,
              width: "100%",
              backgroundColor: colors.primary_green,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleBooking}
          >
            <Text style={{ fontFamily: fontFamily.bold, color: colors.white }}>
              Đặt lịch
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default RoomInfoComponent;

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.bold,
  },
  textInputContainer: {
    paddingVertical: 10,
    minHeight: 70,
    marginTop: 10,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
});

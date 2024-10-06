import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import generalStyles from "../../../styles/generalStyles";
import { Icons } from "../../../assets/icons";
import colors from "../../../values/colors";
import { fontFamily } from "../../../assets/fonts/useFont";
import CustomModal from "../.././../components/Modal/index";
import TextInputComponent from "../../../components/TextInput";
import managementStyles from "../managementStyles";
import Header from "../../../components/Header";

const InfoRow = ({ label, value, style, styleTitle, styleValue }) => (
  <View
    style={[generalStyles.flexRow, { justifyContent: "space-between" }, style]}
  >
    <Text style={[{ fontFamily: fontFamily.bold, fontSize: 14 }, styleTitle]}>
      {label}
    </Text>
    <Text style={[{ fontSize: 14 }, styleValue]}>{value}</Text>
  </View>
);

const ActionButton = ({ icon, label, color }) => (
  <TouchableOpacity style={managementStyles.actionButton}>
    <View
      style={[
        managementStyles.actionButtonIconContainer,
        { backgroundColor: color },
      ]}
    >
      <Image style={{ height: 30, width: 30 }} source={icon} />
    </View>
    <Text style={managementStyles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const Management = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(true);

  return (
    <View style={[managementStyles.container]}>
      <Header titleHeader={"Quản lý"} />
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[
            generalStyles.centerView,
            generalStyles.boxShadow,
            managementStyles.profileSectionContainer,
          ]}
        >
          <View style={managementStyles.avatarContainer} />
          <TouchableOpacity style={managementStyles.iconContainer}>
            <Image
              style={{ height: 20, width: 20 }}
              source={Icons.IconThreeDots}
            />
          </TouchableOpacity>
          <View style={managementStyles.profileInfoContainer}>
            <InfoRow label="Tên" value="Phạm Văn Hoàng" />
            <InfoRow label="Số điện thoại" value="0382823785" />
            <InfoRow label="Địa chỉ" value="Biên Hòa, Đồng Nai" />
          </View>
        </TouchableOpacity>

        <View
          style={[
            generalStyles.centerView,
            generalStyles.boxShadow,
            {
              paddingVertical: 20,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-evenly",
            },
          ]}
        >
          <ActionButton
            color={colors.grayC4}
            icon={Icons.iconAddPerson}
            label="Thêm nhân viên mới"
          />
          <ActionButton
            color={colors.orange}
            icon={Icons.iconAddPerson}
            label="Danh sách nhân viên"
          />
          <ActionButton
            color={colors.primary_blue}
            icon={Icons.iconAddPerson}
            label="Danh sách đã mời"
          />
          <ActionButton
            color={colors.green}
            icon={Icons.iconAddPerson}
            label="Danh sách vai trò"
          />
        </View>

        <View
          style={[
            generalStyles.centerView,
            generalStyles.boxShadow,
            {
              paddingVertical: 20,
              gap: 10,
              paddingHorizontal: 20,
              marginTop: 20,
              borderRadius: 10,
            },
          ]}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text
                style={{
                  fontFamily: fontFamily.bold,
                  color: colors.black,
                  fontSize: 13,
                }}
              >
                GÓI QUẢN LÝ
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.bold,
                  color: colors.black,
                  fontSize: 13,
                  color: colors.primary_green,
                }}
              >
                CÁ NHÂN
              </Text>
            </View>
            <Text
              style={{
                color: colors.orange,
                fontFamily: fontFamily.regular,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 10,
                borderColor: colors.orange,
                fontSize: 13,
              }}
            >
              Chi tiết
            </Text>
          </View>
          <InfoRow
            style={{ width: "100%" }}
            styleTitle={{ fontFamily: fontFamily.semiBold }}
            styleValue={{ fontFamily: fontFamily.bold }}
            label="Ngày kích hoạt"
            value="14-09-2023"
          />
          <InfoRow
            style={{ width: "100%" }}
            styleTitle={{ fontFamily: fontFamily.semiBold }}
            styleValue={{ fontFamily: fontFamily.bold }}
            label="Ngày kết thúc"
            value="[Không giới hạn]"
          />
        </View>
      </View>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        children={
          <>
            <TouchableOpacity
              onPress={() => setModalUpdateVisible(true)}
              style={[generalStyles.boxShadow, managementStyles.modalButton]}
            >
              <Text style={{ fontFamily: fontFamily.bold }}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[generalStyles.boxShadow, managementStyles.modalButton]}
            >
              <Text style={{ fontFamily: fontFamily.bold }}>
                Chuyển đổi doanh nghiệp quản lý
              </Text>
            </TouchableOpacity>
          </>
        }
      />

      <CustomModal
        visible={modalUpdateVisible}
        title={"Cập nhật doanh nghiệp"}
        leftIconHeader={Icons.iconLeftArrow}
        onLeftIconHeaderPress={() => setModalUpdateVisible(false)}
        styleIconHeader={{ height: 20, width: 20 }}
        modalContainerStyle={{ height: "100%" }}
        children={
          <View
            style={{
              paddingHorizontal: 10,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={managementStyles.modalText}>
              Doanh nghiệp sẽ giúp bạn chia sẻ quản lý cho các thành viên, phân
              quyền quản lý, tài nguyên, tối ưu và đơn giản hóa quá trình vận
              hành
            </Text>
            <TouchableOpacity style={managementStyles.modalProfilePicContainer}>
              <Image
                style={{ height: 40, width: 40 }}
                source={Icons.iconProfile}
              />
              <View style={managementStyles.modalProfileIconContainer}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={Icons.iconCamera}
                />
              </View>
            </TouchableOpacity>
            <TextInputComponent
              noBorder
              styleAreaInput={managementStyles.textInput}
              placeholder={"Tên doanh nghiệp"}
            />
            <TextInputComponent
              noBorder
              styleAreaInput={managementStyles.textInput}
              placeholder={"Số điện thoại"}
            />
            <TextInputComponent
              noBorder
              styleAreaInput={managementStyles.textInput}
              placeholder={"Địa chỉ"}
            />
            <TouchableOpacity
              style={{
                height: 50,
                width: "100%",
                backgroundColor: colors.primary_blue,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{ fontFamily: fontFamily.bold, color: colors.white }}
              >
                Cập nhật
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default Management;

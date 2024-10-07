import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import generalStyles from "../../../styles/generalStyles";
import BuildingButton from "../../../components/BuildingButton";
import styles from "../buildingStyles";
import colors from "../../../values/colors";
import { Icons } from "../../../assets/icons";
import Header from "../../../components/Header";

// Dữ liệu các khu vực của từng thành phố
const citiesData = [
  {
    name: "Đồng Nai",
    buildings: [
      {
        imageSource:
          "https://www.phatdat.com.vn/wp-content/uploads/2024/07/VIEW-NIGHT-LIGHTING-1024x576.jpg",
        title: "Khu Văn Phòng 1",
        address: "Số 123, Đường Nguyễn Văn Cừ, Quận 1, TP.HCM",
      },
      {
        imageSource: Icons.iconCustom,
        title: "Khu Văn Phòng 2",
        address: "Số 124, Đường Nguyễn Văn Cừ, Quận 1, TP.HCM",
      },
      {
        imageSource: Icons.iconCustom,
        title: "Khu Văn Phòng 3",
        address: "Số 125, Đường Nguyễn Văn Cừ, Quận 1, TP.HCM",
      },
      {
        imageSource: Icons.iconCustom,
        title: "Khu Văn Phòng 4",
        address: "Số 126, Đường Nguyễn Văn Cừ, Quận 1, TP.HCM",
      },
    ],
  },
  {
    name: "Bình Dương",
    buildings: [
      {
        imageSource: Icons.iconCustom,
        title: "Khu Văn Phòng A",
        address: "Số 789, Đường Bình Dương, TP.Thủ Dầu Một",
      },
      {
        imageSource: Icons.iconCustom,
        title: "Khu Văn Phòng B",
        address: "Số 790, Đường Bình Dương, TP.Thủ Dầu Một",
      },
    ],
  },
  {
    name: "Nha Trang",
    buildings: [
      {
        id:1,
        imageSource: Icons.iconCustom,
        title: "Khu Văn Phòng X",
        address: "Số 456, Đường Trần Phú, TP.Nha Trang",
      },
      {
        imageSource: Icons.iconCustom,
        title: "Khu Văn Phòng Y",
        address: "Số 457, Đường Trần Phú, TP.Nha Trang",
      },
    ],
  },
];

const Building = ({navigation}) => {
  const [expandedCities, setExpandedCities] = useState(new Set());

  // Xử lý khi người dùng nhấn vào tên thành phố để mở rộng hoặc thu gọn danh sách tòa nhà
  const handleCityPress = (cityName) => {
    setExpandedCities((prev) => {
      const newExpandedCities = new Set(prev);
      if (newExpandedCities.has(cityName)) {
        newExpandedCities.delete(cityName);
      } else {
        newExpandedCities.add(cityName);
      }
      return newExpandedCities;
    });
  };

  return (
    <View
      style={[
        generalStyles.container,
        { backgroundColor: colors.white, position: "relative" },
      ]}
    >
      <Header titleHeader={"Tòa nhà"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Danh sách các thành phố và tòa nhà */}
        <View style={{ height: 10 }}></View>
        {citiesData.map((city, index) => (
          <View key={index} style={styles.citySection}>
            {/* Tiêu đề của thành phố */}
            <TouchableOpacity
              onPress={() => handleCityPress(city.name)}
              style={styles.cityTitleContainer}
            >
              <Text style={styles.cityTitle}>
                {city.name} ({city.buildings.length})
              </Text>
            </TouchableOpacity>

            {/* Danh sách tòa nhà nếu thành phố được mở rộng */}
            {expandedCities.has(city.name) && (
              <View style={styles.buttonContainer}>
                {city.buildings.map((building, idx) => (
                  <BuildingButton
                    key={idx}
                    containerStyle={{ width: "46%" }}
                    imageSource={building.imageSource}
                    title={building.title}
                    address={building.address}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
      onPress={()=> navigation.navigate('AddBuilding')}
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
          // Thêm bóng đen
          shadowColor: "black", // Màu bóng
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3.5,
          elevation: 5, // Thêm độ cao cho Android
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "600", color: colors.white }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Building;

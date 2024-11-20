import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../../components/Header";
import TextInputAutoHeight from "../../../components/TextInputAutoHeight";
import generalStyles from "../../../styles/generalStyles";
import colors from "../../../values/colors";
import { createProblem } from "../../../services/problemServices";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { getAllProblem } from "../../../services/problemServices";
import { launchImageLibrary } from "react-native-image-picker";

const CreateProblemModal = ({ modalVisible, onClose, userData, userRoomList }) => {
  const dispatch = useDispatch();
  const initialFormState = {
    id: userData.id,
    room_name: userRoomList.room_name,
    problem: "",
    decription: "",
    image: null, // Để lưu đường dẫn hình ảnh
    fatal_level: 0,
    status: 0,
    roomid: userRoomList.id,
  };
  const [formState, setFormState] = useState(initialFormState);
  const [selectedLevel, setSelectedLevel] = useState(0);

  const levels = [
    { label: "Thấp", color: "green" },
    { label: "Trung bình", color: "orange" },
    { label: "Cao", color: "red" },
  ];

  const handleChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };

  // Hàm mở thư viện ảnh
  const pickImage = () => {
    const options = {
      mediaType: "photo",
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("Image Picker Error: ", response.errorMessage);
      } else {
        // Lấy URI của ảnh được chọn
        const selectedImage = response.assets[0].uri;
        setFormState({ ...formState, image: selectedImage });
      }
    });
  };

  const handleSubmit = async () => {
    try {
      // Tạo FormData
      const data = new FormData();
      data.append("id", formState.id);
      data.append("room_name", formState.room_name);
      data.append("problem", formState.problem);
      data.append("decription", formState.decription);
      data.append("fatal_level", selectedLevel);
      data.append("status", formState.status);
      data.append("roomid", formState.roomid);

      // Nếu có hình ảnh thì thêm vào FormData
      if (formState.image) {
        data.append("image", {
          uri: formState.image,
          type: "image/jpeg", // Định dạng file
          name: "problem-image.jpg", // Tên file
        });
      }

      await createProblem(data, dispatch);
      showMessage({
        message: "Thành công",
        description: "Đã gửi thông báo!",
        type: "success",
        backgroundColor: colors.green,
        color: colors.white,
      });
      await getAllProblem(dispatch);
      onClose();
    } catch (error) {
      showMessage({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi tạo thông báo. Vui lòng thử lại.",
        type: "danger",
        backgroundColor: "red",
        color: colors.white,
      });
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <Header
        leftIcon={
          <Icon
            onPress={onClose}
            name="chevron-left"
            size={20}
            color={colors.light_black}
          />
        }
        titleHeader={"Tạo sự cố"}
      />
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { gap: 20, padding: 20 }]}
      >
        <View style={styles.problemRoomContainer}>
          <Text style={styles.sectionTitle}>
            Phòng gặp sự cố <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.roomInputContainer}>
            <Text style={styles.roomText}>{formState.room_name}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>
            Sự cố <Text style={styles.required}>*</Text>
          </Text>
          <TextInputAutoHeight
            placeholder={"Nhập sự cố"}
            onChangeText={(text) => handleChange("problem", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>
            Mô tả sự cố <Text style={styles.required}>*</Text>
          </Text>
          <TextInputAutoHeight
            placeholder={"Nhập mô tả sự cố"}
            onChangeText={(text) => handleChange("decription", text)}
          />
        </View>

        <View style={styles.levelContainer}>
          <Text style={styles.sectionTitle}>
            Mức độ nghiêm trọng <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.levelButtonContainer}>
            {levels.map((level, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedLevel(index)}
                style={[
                  styles.levelButton,
                  {
                    backgroundColor:
                      selectedLevel === index ? level.color : "#ffffff",
                    borderWidth: selectedLevel === index ? 0 : 1,
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedLevel === index ? "white" : level.color,
                    fontWeight: "500",
                  }}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.sectionTitle}>Hình ảnh</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={pickImage}
          >
            <Text style={styles.imageButtonText}>Chọn ảnh</Text>
          </TouchableOpacity>
          {formState.image && (
            <Image
              source={{ uri: formState.image }}
              style={styles.imagePreview}
            />
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Thêm sự cố</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpacer}></View>
      </ScrollView>
    </Modal>
  );
};

export default CreateProblemModal;

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    padding: 10,
  },
  problemRoomContainer: {
    paddingVertical: 5,
    width: "100%",
    gap: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  roomInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary_green,
    width: "100%",
    paddingBottom: 5,
  },
  roomText: {
    fontSize: 15,
  },
  inputContainer: {
    paddingVertical: 5,
    width: "100%",
    gap: 10,
  },
  levelContainer: {
    paddingVertical: 5,
    width: "100%",
    gap: 15,
  },
  levelButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 8,
    borderColor: colors.primary_green,
    marginHorizontal: 5,
  },
  submitButton: {
    height: 50,
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_green,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  bottomSpacer: {
    height: 200,
  },
});
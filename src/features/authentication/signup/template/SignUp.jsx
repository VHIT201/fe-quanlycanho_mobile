import React, { useCallback, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import ButtonComponent from "../../../../components/Button";
import TextInputComponent from "../../../../components/TextInput";
import generalStyles from "../../../../styles/generalStyles";
import colors from "../../../../values/colors";
import { CommonImage } from "../../../../assets/images";
import { Icons } from "../../../../assets/icons";
import styles from "../signUpStyles";

const SignUp = ({ toggleShowPass, showPass, navigation }) => {
  // Bước 1: Tạo state để lưu trữ thông tin đăng ký
  const [account, setAccount] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "user", // Mặc định là "user"
  });

  // Bước 2: Xử lý sự kiện khi người dùng nhập thông tin
  const handleInputChange = (field, value) => {
    setAccount((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Bước 3: Xử lý khi người dùng nhấn nút "ĐĂNG KÝ"
  const onSubmitSignUp = useCallback(() => {
    console.log("Thông tin tài khoản đăng ký:", account);
    // Bạn có thể thực hiện gọi API đăng ký tại đây
  }, [account]);

  const navigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  return (
    <SafeAreaView style={generalStyles.container}>
      <View style={[generalStyles.centerView, styles.topContainer]}>
        <Image source={CommonImage.LogoDefault} style={styles.logo} />
        <View style={styles.inputContainer}>
          <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Họ"}
            onChangeText={(text) => handleInputChange("firstName", text)}
            borderColor={colors.primary_green}
          />
          <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Tên"}
            onChangeText={(text) => handleInputChange("lastName", text)}
            borderColor={colors.primary_green}
          />
          <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Nhập email của bạn"}
            keyboardType="email-address"
            onChangeText={(text) => handleInputChange("username", text)}
            borderColor={colors.primary_green}
          />
          <TextInputComponent
            style={{ color: colors.primary_green }}
            styleAreaInput={styles.input}
            placeholder={"Mật khẩu"}
            rightIcon={
              showPass ? Icons.iconShowPassword : Icons.iconHidePassword
            }
            onPressRightIcon={toggleShowPass}
            secureTextEntry={showPass}
            onChangeText={(text) => handleInputChange("password", text)}
            borderColor={colors.primary_green}
          />
        </View>
        <ButtonComponent
          style={styles.btnContinue}
          text={"ĐĂNG KÝ"}
          textStyle={styles.btnText}
          onPress={onSubmitSignUp}
          backgroundColor={colors.white}
        />
        <View style={generalStyles.flexRow}>
          <Text style={styles.haveAccountText}>{"Đã có tài khoản?"} </Text>
          <Text onPress={navigateToLogin} style={styles.loginText}> 
            {"Đăng Nhập"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

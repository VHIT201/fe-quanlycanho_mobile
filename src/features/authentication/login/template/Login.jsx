// src/features/authentication/login/template/Login.js

import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import generalStyles from '../../../../styles/generalStyles';
import colors from '../../../../values/colors';
import { CommonImage } from '../../../../assets/images';
import TextInputComponent from '../../../../components/TextInput/index';
import loginStyles from '../loginStyles';
import ButtonComponent from '../../../../components/Button';
import axios from '../../../../config/axiosConfig';
import { useDispatch } from 'react-redux';
import { setAccount, saveToken } from '../../../../store/userSlice'; // Import action để lưu thông tin người dùng
import { showMessage } from "react-native-flash-message"; // Import showMessage
import Spinner from '../../../../components/Spinner/Spinner';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('vanhoangit2001@gmail.com'); // State cho username
  const [password, setPassword] = useState('Hoang2001'); // State cho password
  const [loading, setLoading] = useState(false); // State cho loading
  const dispatch = useDispatch(); // Hook để truy cập dispatch

  const handleLogin = async () => { // Không cần tham số navigation ở đây
    if (!username || !password) {
      showMessage({
        message: "Vui lòng nhập email và mật khẩu.",
        type: "danger",
      });
      return;
    }

    setLoading(true); // Bắt đầu loading

    try {
      const response = await axios.post('identityusers/login', {
        username,
        password,
        role: 'user',
      });

      setLoading(false); // Kết thúc loading

      if (response.data.isSuccess) {
        dispatch(setAccount({ userAccount: { username, password } }));
        dispatch(saveToken(response.data.data));

        // Gọi thông báo thành công
        showMessage({
          message: "Đăng nhập thành công!",
          type: "success",
          backgroundColor: colors.primary_green,
        });

        // Chuyển trang sau 1 giây
        setTimeout(() => {
          navigation.navigate('Home'); // Chuyển đến trang Home
        }, 1000); // 1000 ms = 1 giây

      } else {
        // Gọi thông báo lỗi nếu không thành công
        showMessage({
          message: "Đăng nhập thất bại! Vui lòng kiểm tra thông tin của bạn.",
          type: "danger",
        });
      }
    } catch (error) {
      setLoading(false); // Kết thúc loading
      console.error('Login error:', error); // Log lỗi
      showMessage({
        message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={[generalStyles.container,{position: 'relative'}]}>
      <View style={[{ alignItems: 'center', marginTop: '30%',  }, generalStyles.container]}>
        <View style={{ marginVertical: 30 }}>
          <Image source={CommonImage.LogoDefault} style={{ height: 100, width: 100 }} />
        </View>
        <View style={loginStyles.viewLogin}>
          <TextInputComponent
            styleAreaInput={{
              borderRadius: 5,
              height: 40,
              marginVertical: 10,
            }}
            style={{ color: colors.primary_green }}
            placeholder={'Email'}
            keyboardType={'email-address'}
            borderColor={colors.primary_green}
            value={username} // Gán giá trị cho input
            onChangeText={setUsername} // Cập nhật state khi người dùng nhập
          />
          <TextInputComponent
            styleAreaInput={{
              borderRadius: 5,
              height: 40,
            }}
            style={{ color: colors.primary_green }}
            placeholder={'Mật khẩu'}
            secureTextEntry={true} // Đảm bảo mật khẩu được ẩn
            borderColor={colors.primary_green}
            value={password} // Gán giá trị cho input
            onChangeText={setPassword} // Cập nhật state khi người dùng nhập
          />
        </View>
        <ButtonComponent
          text={'ĐĂNG NHẬP'}
          onPress={handleLogin} // Gọi hàm handleLogin khi nhấn nút
          style={{
            height: 40,
            width: '90%',
            backgroundColor: colors.primary_green,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          textStyle={{ color: colors.white, fontWeight: '600' }}
        />
        
        <Text style={{ textDecorationLine: 'underline', fontSize: 13, marginTop: 10, color: colors.light_black }}>
          Bạn quên mật khẩu?
        </Text>
        <View
          style={[
            generalStyles.container,
            { width: '100%', paddingHorizontal: 20, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40 },
          ]}
        >
          <Text style={{ color: colors.light_black }}>
            Bạn chưa có tài khoản? <Text
              onPress={() => navigation.navigate('SignUp')}
              style={{ color: colors.primary_green }}>Đăng ký ngay!</Text>
          </Text>
        </View>
        
      </View>
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});

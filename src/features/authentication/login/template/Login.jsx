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
import { setUser } from '../../../../store/userSlice'; // Import action để lưu thông tin người dùng


const Login = ({navigation}) => {
  const [username, setUsername] = useState(''); // State cho username
  const [password, setPassword] = useState(''); // State cho password
  const dispatch = useDispatch(); // Hook để truy cập dispatch
  
  const handleLogin = async ({navigation}) => {
    try {
      const response = await axios.post('identityusers/login', {
        username,
        password,
        role: 'user',
      });
  
      console.log('Login successful:', response.config.data); // In ra dữ liệu trả về từ API
      
      // Dispatch action để lưu thông tin người dùng vào Redux store
      dispatch(setUser({ userInfo: { username, password }, token: response.data })); // Lưu username và password vào Redux store
  
    } catch (error) {
      console.error('Login error:', error); // Log lỗi
    }
  };

  return (
    <SafeAreaView style={generalStyles.container}>
      <View style={[{ alignItems: 'center', marginTop: '30%' }, generalStyles.container]}>
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
            style={{color:colors.primary_green}}
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
            style={{color:colors.primary_green}}
            placeholder={'Mật khẩu'}
            secureTextEntry={true} // Đảm bảo mật khẩu được ẩn
            borderColor={colors.primary_green}
            value={password} // Gán giá trị cho input
            onChangeText={setPassword} // Cập nhật state khi người dùng nhập
          />
        </View>
        <ButtonComponent
          text={'ĐĂNG NHẬP'}
          // onPress={handleLogin} // Gọi hàm handleLogin khi nhấn nút
          onPress={()=> navigation.navigate('Home')} // Gọi hàm handleLogin khi nhấn nút
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
              onPress={()=> navigation.navigate('SignUp')}
             style={{ color: colors.primary_green }}>Đăng ký ngay!</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});

import React, { useCallback, useEffect } from 'react';
import { Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { BottomBarIcons } from './src/assets/icons';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen
import Intro from './src/features/authentication/intro/template/Intro';
import Login from './src/features/authentication/login/template/Login';
import SignUp from './src/features/authentication/signup/template/SignUp';
import colors from './src/values/colors';
import Home from './src/features/home/template/Home';
import Building from './src/features/building/template/Building';
import Message from './src/features/message/template/Message';
import CashFlow from './src/features/cashflow/template/CashFlow';
import Management from './src/features/management/template/Management';
import useCustomFonts from './src/assets/fonts/useFont';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync(); // Ngăn SplashScreen biến mất cho đến khi font được tải

const BottomTabs = () => {
  const fontsLoaded = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Ẩn SplashScreen khi font đã được tải
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Giữ màn hình splash cho đến khi font tải xong
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return focused ? (
                <Image source={BottomBarIcons.HomeActive} style={{ width: 30, height: 30 }} />
              ) : (
                <Image source={BottomBarIcons.HomeNotActive} style={{ width: 30, height: 30 }} />
              );
            case 'Building':
              return focused ? (
                <Image source={BottomBarIcons.BuildingActive} style={{ width: 30, height: 30 }} />
              ) : (
                <Image source={BottomBarIcons.BuildingNonActive} style={{ width: 30, height: 30 }} />
              );
            case 'Message':
              return focused ? (
                <Image source={BottomBarIcons.ChatActive} style={{ width: 20, height: 20 }} />
              ) : (
                <Image source={BottomBarIcons.ChatNonActive} style={{ width: 20, height: 20 }} />
              );
            case 'CashFlow':
              return focused ? (
                <Image source={BottomBarIcons.WalletActive} style={{ width: 20, height: 20 }} />
              ) : (
                <Image source={BottomBarIcons.WalletNoActive} style={{ width: 20, height: 20 }} />
              );
            case 'Management':
              return focused ? (
                <Image source={BottomBarIcons.ManagementAct} style={{ width: 20, height: 20 }} />
              ) : (
                <Image source={BottomBarIcons.ManagementNoAct} style={{ width: 20, height: 20 }} />
              );
          }
        },
        tabBarActiveTintColor: colors.primary_green,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: { height: 70, paddingBottom: 10 }, // Tăng chiều cao của BottomTab
        tabBarLabelStyle: { fontSize: 13 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Main" component={Home} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="Building" component={Building} options={{ tabBarLabel: 'Tòa nhà' }} />
      <Tab.Screen name="Message" component={Message} options={{ tabBarLabel: 'Tin nhắn' }} />
      <Tab.Screen name="CashFlow" component={CashFlow} options={{ tabBarLabel: 'Thu chi' }} />
      <Tab.Screen name="Management" component={Management} options={{ tabBarLabel: 'Quản lý' }} />
    </Tab.Navigator>
  );
};

const App = () => {
  const fontsLoaded = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={colors.primary_green} />
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

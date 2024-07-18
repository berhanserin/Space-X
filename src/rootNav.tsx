import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginPage, RegisterPage } from '@/pages';
import { NavStackParams, Screen } from '@/types/navigation.type';
import Toast from 'react-native-toast-message';
import toastConfig from './utils/toast';
import { useAppState } from './utils/zustand';

import AuthNav from '@/authNav';
import axios from 'axios';

const Stack = createNativeStackNavigator<NavStackParams>();

export const navigationRef =
  React.createRef<NavigationContainerRef<NavStackParams>>();

const rootNav = () => {
  const { auth } = useAppState();

  if (auth.length > 0) {
    axios.defaults.headers.common = { Authorization: `Bearer ${auth}` };
  }

  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
        initialRouteName={auth.length > 0 ? Screen.HOME : Screen.LOGIN}>
        {auth.length > 0 ? (
          <>
            <Stack.Screen name={Screen.HOME} component={AuthNav} />
          </>
        ) : (
          <>
            <Stack.Screen name={Screen.LOGIN} component={LoginPage} />
            <Stack.Screen name={Screen.REGISTER} component={RegisterPage} />
          </>
        )}
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default rootNav;

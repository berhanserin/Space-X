import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum Screen {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',

  HOME = 'HOME',
}

export type NavStackParams = {
  [Screen.LOGIN]: undefined;
  [Screen.REGISTER]: undefined;
  [Screen.HOME]: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

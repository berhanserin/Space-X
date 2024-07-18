import React, { useEffect } from 'react';

import {
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

import { FONT } from '../Textstyle';
import { scaledSize } from '@/utils/dimensions';
import { useTheme } from '@react-navigation/native';

const BASE_TEXT: TextStyle = {
  fontSize: scaledSize(16),
};

export const presets = {
  default: BASE_TEXT,
  loginText1: {
    ...BASE_TEXT,
    fontWeight: 'light',
  } as TextStyle,
  date: {
    fontSize: scaledSize(12),
    fontWeight: 'light',
    lineHeight: 14,
  } as TextStyle,
  calendarTime: {
    fontSize: scaledSize(12),
    fontWeight: 'regular',
    lineHeight: 20,
  } as TextStyle,
  title: {
    fontSize: scaledSize(24),
  } as TextStyle,
  recentTitle: {
    fontSize: scaledSize(16),
    fontWeight: 'semibold',
  } as TextStyle,
  recentDestination: {
    fontSize: scaledSize(12),
    fontWeight: 'light',
    lineHeight: 13,
  } as TextStyle,
  recentDdate: {
    fontSize: scaledSize(12),
    fontWeight: 'semibold',
    lineHeight: 20,
    color: '#ffffff33',
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;

export interface TextProps extends TextProperties {
  style?: StyleProp<TextStyle>;
  type?: TextPresets;
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = ({ children, ...props }: TextProps) => {
  const {
    color,
    type = 'default',
    style: styleOverride,
    textAlign = 'auto',
    ...rest
  } = props;

  const { colors } = useTheme();

  return (
    <RNText
      {...rest}
      style={[
        presets[type] as TextProps,
        { textAlign: textAlign, color: colors.text },
        styleOverride,
      ]}>
      {children}
    </RNText>
  );
};

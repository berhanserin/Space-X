import { screenHeight, screenWidth } from '@/utils';
import React, { useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export type BaseLayoutProps = React.PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
  containerstyle?: StyleProp<ViewStyle>;
  backgroundView?: boolean;
};

export const BaseLayout = React.memo(
  ({
    children,
    style,
    backgroundView = false,
    containerstyle,
  }: BaseLayoutProps) => {
    const styles = baseLayoutStyles();

    return (
      <SafeAreaView style={[styles.safeAreaStyle, style]}>
        {backgroundView ? (
          <ImageBackground
            source={require('@/assets/background.png')}
            style={{
              zIndex: -1,
              position: 'absolute',
              width: screenWidth,
              top: 0,
              left: 0,
              height: screenHeight,
            }}
          />
        ) : null}
        {children}
      </SafeAreaView>
    );
  }
);

export const baseLayoutStyles = () =>
  StyleSheet.create({
    safeAreaStyle: {
      flex: 1,
      zIndex: 1,
    },
  });

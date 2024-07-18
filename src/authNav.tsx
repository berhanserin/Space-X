import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { HomePage, CalendarPage } from '@/pages';
import CalendarIcon from '@/assets/calendar.svg';
import Home from '@/assets/Home.svg';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 79,

        position: 'absolute',
        bottom: 24,
        left: 24,
        borderRadius: 12,
        width: 382,
        backgroundColor: '#264061',

        justifyContent: 'space-between',
        alignItems: 'center',

        paddingLeft: 24,
        paddingRight: 26,
      }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}>
            {options.tabBarIcon({ focused: isFocused })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AuthNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Calendar"
        component={CalendarPage}
        options={{
          tabBarIcon: color => (
            <CalendarIcon fillOpacity={color.focused ? 1 : 0.33} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: color => <Home fillOpacity={color.focused ? 1 : 0.33} />,
        }}
      />
      <Tab.Screen
        name="Home2"
        component={HomePage}
        options={{
          tabBarIcon: color => (
            <CalendarIcon fillOpacity={color.focused ? 1 : 0.33} />
          ),
        }}
      />
      <Tab.Screen
        name="Home3"
        component={HomePage}
        options={{
          tabBarIcon: color => (
            <CalendarIcon fillOpacity={color.focused ? 1 : 0.33} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthNav;

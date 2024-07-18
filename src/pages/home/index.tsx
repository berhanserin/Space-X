import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { BaseLayout, Text } from '@/bluprints';
import Profile from '@/assets/profil.svg';
import { useAppState } from '@/utils/zustand';
import useHome, { Events } from './homeAction';
import api from '@/api';

const Home = () => {
  const { setAuth } = useAppState();
  const {
    upcomingRenderItem,
    eventData,
    getUpcoming,
    getRecentLaunch,
    recentData,
    recentRenderItem,
  } = useHome();

  useEffect(() => {
    getUpcoming();
    getRecentLaunch();
  }, [api]);

  return (
    <BaseLayout style={{ flex: 1, backgroundColor: '#0E121D' }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <Profile width={58} height={58} />
        </View>
        <Text type="title" style={{ marginTop: 33 }}>
          Upcoming Events
        </Text>

        <FlatList
          data={eventData}
          style={{ width: 382, height: 174, marginTop: 24 }}
          renderItem={upcomingRenderItem}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 10 }}
        />

        <Text type="title" style={{ marginTop: 24 }}>
          Recent Launch
        </Text>

        <FlatList
          data={recentData}
          style={{ width: 382, height: 418, marginTop: 24 }}
          renderItem={recentRenderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingBottom: 40 }}
        />
      </View>
    </BaseLayout>
  );
};

export default Home;

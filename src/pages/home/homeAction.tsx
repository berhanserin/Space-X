import api from '@/api';
import { Screen } from '@/types/navigation.type';
import { useAppState } from '@/utils/zustand';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { create } from 'zustand';

import Lineer from '@/assets/Lineer.png';
import { Text } from '@/bluprints';
import moment from 'moment';

export type Events = {
  createdAt: string;
  id: string;
  image: string;
  scheduledAt: number;
  title: string;
}[];

export type Recent = RecentItem[];

export interface RecentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

type Store = {
  event: Events;
  recent: Recent;
  setEventData: (item: Events) => void;
  setRecentData: (item: Recent) => void;
};

const useStore = create<Store>()(set => ({
  event: [],
  recent: [],
  setEventData: item => set({ event: item }),
  setRecentData: item => set({ recent: item }),
}));

const useHome = () => {
  const { setAuth } = useAppState();
  const { setEventData, event, setRecentData, recent } = useStore();

  const getUpcoming = useCallback(async () => {
    const result: Events = await api.feed.events();
    if (String(result).includes('401')) {
      setAuth('');
    } else if (String(result).includes('500')) {
      getUpcoming();
    } else {
      setEventData(result);
    }
  }, [api]);

  const upcomingRenderItem = (item: {
    index: number;
    item: {
      createdAt: string;
      id: string;
      image: string;
      scheduledAt: number;
      title: string;
    };
  }) => {
    return (
      <View
        style={{
          width: 145,
          height: 174,
          borderRadius: 6,
        }}>
        <View
          style={{
            backgroundColor: '#0A0E1988',

            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: 145,
            height: 174,
          }}
        />
        <FastImage
          style={{ width: 145, height: 174, borderRadius: 6 }}
          source={{
            uri: item.item.image,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <Text
          type="default"
          style={{ position: 'absolute', left: 10, top: 10, zIndex: 99 }}>
          {item.item.title}
        </Text>
        <Text
          type="date"
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            zIndex: 99,

            width: 64,
          }}>
          {moment(item.item.scheduledAt).format('MMM DD ,YY HH:MM A')}
        </Text>
      </View>
    );
  };

  const getRecentLaunch = useCallback(async () => {
    const result: Recent = await api.feed.feed();
    if (String(result).includes('401')) {
      setAuth('');
    } else if (String(result).includes('500')) {
      getRecentLaunch();
    } else {
      setRecentData(result);
    }
  }, [api]);

  const recentRenderItem = (item: { index: number; item: RecentItem }) => {
    return (
      <View
        key={item.item.id}
        style={{
          width: 382,
          height: 91,
          borderRadius: 6,

          backgroundColor: '#36445B50',
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <FastImage
          style={{ width: 76, height: 73, borderRadius: 6, marginLeft: 10 }}
          source={{
            uri: item.item.image,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View
          style={{
            marginLeft: 16,

            justifyContent: 'space-between',
            height: 80,

            width: 230,
            marginTop: 9,
            marginBottom: 10,
          }}>
          <Text type="recentTitle">{item.item.title}</Text>
          <Text type="recentDestination">
            {item.item.description.slice(0, 100)}
          </Text>
          <Text type="recentDdate">
            {moment(item.item.createdAt).format('MMM DD, yyyy')}
          </Text>
        </View>
      </View>
    );
  };

  return {
    getUpcoming,
    eventData: event,
    upcomingRenderItem,
    getRecentLaunch,
    recentData: recent,
    recentRenderItem,
  };
};

export default useHome;

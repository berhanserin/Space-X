import { FlatList, ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';

import Notif from '@/assets/Notification.svg';
import Date from '@/assets/date.svg';
import Profile from '@/assets/profil.svg';
import { BaseLayout, Text } from '@/bluprints';
import useCalendar from './calendarAction';
import moment from 'moment';
import { screenHeight, screenWidth } from '@/utils';
import useHome from '../home/homeAction';

const Calendar = () => {
  const { calendars, calendarsRenderItem, timelineRenderItem, selectDate } =
    useCalendar();

  const { eventData, getUpcoming } = useHome();

  const hours = [
    { time: '00:00' },
    { time: '00:30' },
    { time: '01:00' },
    { time: '01:30' },
    { time: '02:00' },
    { time: '02:30' },
    { time: '03:00' },
    { time: '03:30' },
    { time: '04:00' },
    { time: '04:30' },
    { time: '05:00' },
    { time: '05:30' },
    { time: '06:00' },
    { time: '06:30' },
    { time: '07:00' },
    { time: '07:30' },
    { time: '08:00' },
    { time: '08:30' },
    { time: '09:00' },
    { time: '09:30' },
    { time: '10:00' },
    { time: '10:30' },
    { time: '11:00' },
    { time: '11:30' },
    { time: '12:00' },
    { time: '12:30' },
    { time: '13:00' },
    { time: '13:30' },
    { time: '14:00' },
    { time: '14:30' },
    { time: '15:00' },
    { time: '15:30' },
    { time: '16:00' },
    { time: '16:30' },
    { time: '17:00' },
    { time: '17:30' },
    { time: '18:00' },
    { time: '18:30' },
    { time: '19:00' },
    { time: '19:30' },
    { time: '20:00' },
    { time: '20:30' },
    { time: '21:00' },
    { time: '21:30' },
    { time: '22:00' },
    { time: '22:30' },
    { time: '23:00' },
    { time: '23:30' },
  ];

  useEffect(() => {
    getUpcoming();
  }, []);

  return (
    <BaseLayout>
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Profile width={58} height={58} />
            <View style={{ marginLeft: 20 }}>
              <Text type="title">Mert Kaya</Text>
              <Text type="date">Welcome to SpaceX Tracker</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#36445B',
              height: 38,
              width: 38,
              borderRadius: 19,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Notif />
          </View>
        </View>

        <View
          style={{
            marginTop: 23,
            flexDirection: 'row',

            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text type="title">
              {moment(selectDate, 'DD-MM-YYYY').format('MMMM DD')}
            </Text>
            <Text type="date">
              {
                eventData.filter(
                  x =>
                    moment(x.scheduledAt).format('DD') ==
                    moment(selectDate, 'DD-MM-YYYY').format('DD')
                ).length
              }{' '}
              events today
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#36445B',
              height: 38,
              width: 38,
              borderRadius: 19,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Date />
          </View>
        </View>

        <FlatList
          data={calendars}
          renderItem={calendarsRenderItem}
          horizontal
          style={{ marginTop: 32 }}
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
        />

        <FlatList
          data={hours}
          renderItem={timelineRenderItem}
          style={{ marginTop: 32, height: screenHeight / 2 }}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </BaseLayout>
  );
};

export default Calendar;

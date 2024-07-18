import { Text } from '@/bluprints';
import moment from 'moment';
import { Pressable, View } from 'react-native';
import { create } from 'zustand';
import useHome from '../home/homeAction';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';

type Store = {
  selectDate: string;
  setSelectDate: (item: string) => void;
};

const useStore = create<Store>()(set => ({
  selectDate: moment().format('DD-MM-YYYY'),
  setSelectDate: item => set({ selectDate: item }),
}));

const useCalendar = () => {
  const { selectDate, setSelectDate } = useStore();
  const { eventData } = useHome();

  const calendars = Array.from(
    { length: moment(moment().format('YYY-DD')).daysInMonth() },
    (x, i) => moment().startOf('month').add(i, 'days').format('DD-MM-YYYY')
  ).map(x => {
    return { date: x.toString() };
  });

  const calendarsRenderItem = (item: {
    index: number;
    item: { date: string };
  }) => {
    return (
      <Pressable
        key={item.index}
        onPress={() => {
          setSelectDate(item.item.date);
        }}
        style={[
          {
            width: 45,
            height: 101,
            borderRadius: 22.5,

            justifyContent: 'center',
            alignItems: 'center',

            flexDirection: 'column',
          },
          selectDate === item.item.date
            ? {
                backgroundColor: '#D9D9D9',
              }
            : {},
        ]}>
        <Text
          type="recentTitle"
          style={[
            { textAlign: 'center' },
            selectDate === item.item.date
              ? {
                  color: '#36445B',
                  fontWeight: 'bold',
                }
              : {},
          ]}>
          {moment(item.item.date, 'DD-MM-YYYY').format('DD')}
        </Text>
        <Text
          type="recentTitle"
          style={[
            { textAlign: 'center' },
            selectDate === item.item.date
              ? {
                  color: '#36445B',
                  fontWeight: 'regular',
                }
              : {},
          ]}>
          {moment(item.item.date, 'DD-MM-YYYY').format('ddd')}
        </Text>
      </Pressable>
    );
  };

  const timelineRenderItem = ({
    index,
    item,
  }: {
    index: number;
    item: { time: string };
  }) => {
    let array = [];

    for (let index = 0; index < eventData.length; index++) {
      const element = eventData[index];
      if (
        moment(item.time, 'HH:mm').format('HH:mm') <
          moment(element.scheduledAt).format('HH:mm') &&
        moment(item.time, 'HH:mm').add(30, 'minute').format('HH:mm') >=
          moment(element.scheduledAt).format('HH:mm')
      ) {
        array.push(element);
      }
    }

    return (
      <View style={{ height: 150, flexDirection: 'row' }} key={index}>
        <Text type="calendarTime">
          {moment(item.time, 'HH:mm').format('LT')}
        </Text>
        <View>
          {array.map((x, i) => (
            <View
              key={i}
              style={[
                {
                  height: 30,
                  width: 300,
                  backgroundColor: '#36445B',
                  borderRadius: 32,
                  marginLeft: 30,

                  flexDirection: 'row',
                  alignItems: 'center',
                },
                i !== 0
                  ? {
                      marginTop: 10,
                    }
                  : {},
              ]}>
              <FastImage
                style={{
                  width: 21,
                  height: 21,
                  borderRadius: 25,
                  marginLeft: 5,
                }}
                source={{
                  uri: x.image,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <Text style={{ marginLeft: 25, textAlign: 'center', width: 200 }}>
                {x.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return { calendars, calendarsRenderItem, timelineRenderItem, selectDate };
};

export default useCalendar;

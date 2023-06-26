import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useCallback, useState} from 'react';
import {
  COLORS,
  FONTS,
  METRICS,
  TImeService,
  timestampToDate,
  timestampToTime,
} from '../../../utils';
import {Button, Gap, Input} from '../../atoms';

interface TimeServiceProps {
  onDeletePress: () => void;
  data: TImeService;
  value: (T: TImeService) => void;
}

const TimeService = ({onDeletePress, data, value}: TimeServiceProps) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<any>('date');

  const onDateTimePickerChange = (val: DateTimePickerEvent) => {
    setShow(false);
    const {nativeEvent, type} = val;
    const {timestamp} = nativeEvent;

    if (type === 'set' && timestamp) {
      if (mode === 'date') {
        const date = timestampToDate(timestamp);
        const newData = {...data, date_of_service: date};
        value(newData);
      }
      if (mode === 'time') {
        const time = timestampToTime(timestamp);
        const newData = {...data, time_of_service: time};
        value(newData);
      }
    }
  };

  const onDatePress = useCallback(() => {
    setMode('date');
    setShow(true);
  }, [setMode, setShow]);

  const onTimePress = useCallback(() => {
    setMode('time');
    setShow(true);
  }, [setShow, setMode]);

  const onChangeText = (val: string) => {
    const newData = {...data, item_number: val};
    value(newData);
  };

  return (
    <>
      <View style={styles.dateService}>
        <TouchableOpacity style={styles.xContainer} onPress={onDeletePress}>
          <Text style={styles.xText}>X</Text>
        </TouchableOpacity>
        <Button
          type="fakeInput"
          title={data.date_of_service || ''}
          onPress={onDatePress}
        />
        <Gap width={METRICS.gutter.s} />
        <Button
          type="fakeInput"
          title={data.time_of_service || ''}
          onPress={onTimePress}
        />
        <Gap width={METRICS.gutter.s} />
        <Input
          placeholder="Item Number"
          value={data.item_number.toString()}
          keyboardType="numeric"
          onChangeText={val => onChangeText(val)}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={value => onDateTimePickerChange(value)}
        />
      )}
    </>
  );
};

export default TimeService;

const styles = StyleSheet.create({
  dateService: {
    position: 'relative',
    paddingBottom: METRICS.gutter.s,
    paddingTop: METRICS.gutter.l,
    flexDirection: 'row',
    maxHeight: METRICS.gutter.xxxxl + 25,
    borderWidth: 1,
    borderColor: COLORS.grayPrimary,
    borderRadius: METRICS.radius.input,
    paddingLeft: METRICS.gutter.xs,
  },
  xContainer: {
    position: 'absolute',
    right: METRICS.gutter.xs,
    top: METRICS.gutter.xs,
  },
  xText: {
    fontFamily: FONTS.primary[700],
    fontSize: 12,
  },
});

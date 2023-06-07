import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  COLORS,
  FONTS,
  METRICS,
  dateValidate,
  getDateFormat,
  timestampToDate,
} from '../../../utils';
import Icons from '../Icons';

interface InputProps extends TextInputProps {
  label?: string;
  search?: boolean;
  withDate?: boolean;
  secureTextEntry?: boolean;
  disable?: boolean;
}

const Input = ({
  label,
  search,
  value,
  onChangeText,
  keyboardType,
  withDate,
  secureTextEntry,
  disable,
  placeholder,
}: InputProps) => {
  const [border, setBorder] = useState(COLORS.grayPrimary);
  const [visibility, setVisibility] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [validDate, setValidDate] = useState(true);
  const [dateValue, setDateValue] = useState('');

  const validateDate = useCallback((date: string) => {
    setValidDate(dateValidate(date));
    setDateValue(date);
    onChangeText && onChangeText(date);
  }, []);

  const onDateTimePickerChange = useCallback(
    (val: DateTimePickerEvent) => {
      const {nativeEvent, type} = val;
      const {timestamp} = nativeEvent;
      setShowDatePicker(false);
      if (type === 'set' && timestamp) {
        const newValue = timestampToDate(timestamp);
        validateDate(newValue);
      }
    },
    [validateDate],
  );

  const inputStyle = useMemo(
    () => ({
      ...styles.input,
      borderColor: border ?? COLORS.grayPrimary,
    }),

    [border],
  );

  return (
    <>
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        {!validDate && (
          <Text style={styles.invalid}>
            {dateValue} is not valid for dd/mm/yyyy
          </Text>
        )}
        <View style={styles.imputWrapper}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={inputStyle}
            secureTextEntry={secureTextEntry && !visibility}
            editable={!disable}
            selectTextOnFocus={!disable}
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
          {secureTextEntry && (
            <TouchableOpacity
              onPress={() => setVisibility(!visibility)}
              style={styles.iconContainer}>
              <Icons
                name={visibility ? 'ICInvisible' : 'ICVisible'}
                width={24}
                height={24}
                fill={COLORS.grayPrimary}
              />
            </TouchableOpacity>
          )}
          {search && (
            <TouchableOpacity
              // onPress={() => setVisibility(!visibility)}
              style={styles.iconContainer}>
              <Icons
                name="ICSearch"
                width={24}
                height={24}
                fill={COLORS.grayPrimary}
              />
            </TouchableOpacity>
          )}
          {withDate && (
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.iconContainer}>
              <Icons
                name="ICCalendar"
                width={24}
                height={24}
                fill={COLORS.grayPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value ? getDateFormat(value) : new Date()}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onDateTimePickerChange}
        />
      )}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: METRICS.radius.xxxs - 1.5,
    borderRadius: METRICS.radius.input,
    padding: METRICS.gutter.xs + 2,
    color: COLORS.grayPrimary,
  },
  label: {
    fontSize: METRICS.gutter.s,
    color: COLORS.textPrimary,
    marginBottom: METRICS.gutter.xs - 2,
    fontFamily: FONTS.primary[400],
  },
  invalid: {
    fontSize: METRICS.gutter.s - 3,
    color: 'red',
    marginBottom: METRICS.gutter.xs - 2,
    fontFamily: FONTS.primary[500],
  },
  imputWrapper: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top:
      Platform.OS === 'android'
        ? METRICS.gutter.xs + 4
        : METRICS.gutter.xs - 1.5,
    right:
      Platform.OS === 'android'
        ? METRICS.gutter.xs + 4
        : METRICS.gutter.xs - 1.5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

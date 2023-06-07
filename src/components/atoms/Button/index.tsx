import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, METRICS} from '../../../utils';

interface ButtonProps {
  type?: 'secondary' | 'fakeInput' | 'blue';
  title?: string;
  onPress: () => void;
  disable?: boolean;
  size?: 'small';
}

const Button = ({type, title, onPress, disable, size}: ButtonProps) => {
  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      backgroundColor:
        type === 'secondary'
          ? COLORS.red1
          : type === 'blue'
          ? COLORS.bluePrimary
          : COLORS.greenPrimary,
      paddingVertical:
        size === 'small' ? METRICS.gutter.s - 4 : METRICS.gutter.xs + 4,
      paddingHorizontal:
        size === 'small' ? METRICS.gutter.s : METRICS.gutter.xs + 4,
    }),
    [type, size],
  );

  const textStyle = useMemo(
    () => ({
      ...styles.text,
      fontSize: size === 'small' ? METRICS.gutter.s - 3 : METRICS.gutter.s + 2,
    }),
    [size],
  );

  if (type === 'fakeInput') {
    return (
      <TouchableOpacity style={styles.fakeInputWrapper} onPress={onPress}>
        <Text style={styles.fakeInputText}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: METRICS.gutter.m,
  },
  disableBg: {
    paddingVertical: METRICS.gutter.xs + 4,
    borderRadius: METRICS.gutter.xs + 2,
    backgroundColor: COLORS.grayPrimary,
  },
  text: {
    fontFamily: FONTS.primary[500],
    textAlign: 'center',
    color: COLORS.white,
  },
  disableText: {
    fontSize: METRICS.gutter.s + 2,
    fontFamily: FONTS.primary[600],
    textAlign: 'center',
    color: COLORS.white,
  },
  fakeInputWrapper: {
    paddingVertical: METRICS.gutter.xs,
    borderRadius: METRICS.gutter.xs + 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grayPrimary,
    borderWidth: 1,
    minWidth: (METRICS.screen.width - 32) / 3.4,
  },
  fakeInputText: {
    fontSize: METRICS.gutter.s - 2,
    fontFamily: FONTS.primary[400],
    textAlign: 'center',
    color: COLORS.textPrimary,
  },
});

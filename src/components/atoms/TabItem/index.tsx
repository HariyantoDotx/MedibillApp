import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS, FONTS, METRICS} from '../../../utils';
import Gap from '../Gap';
import Icons from '../Icons';

interface TabItemProps {
  title: string;
  active?: boolean;
  onLongPress?: () => void;
  onPress: () => void;
  textstyle?: number;
  innerText?: string;
}

const TabItem = ({
  title,
  active,
  onLongPress,
  onPress,
  textstyle,
  innerText,
}: TabItemProps) => {
  const testStyle = useMemo(
    () => ({
      ...styles.text,
      fontSize: textstyle ?? METRICS.gutter.s - 2,
      color: active ? COLORS.greenPrimary : COLORS.black1,
    }),
    [active, textstyle],
  );

  const innerTestStyle = useMemo(
    () => ({
      ...styles.innerText,
      fontSize: textstyle ?? METRICS.gutter.s - 2,
      color: active ? COLORS.greenPrimary : COLORS.black1,
    }),
    [active, textstyle],
  );

  const _renderIcon = () => {
    if (title === 'Submitted' && innerText === 'Billing Sheets') {
      return (
        <Icons
          name="ICDocuments"
          width={36}
          height={38}
          stroke={COLORS.greenPrimary}
          strokeWidth={4}
        />
      );
    }
    if (title === 'Monthly' && innerText === 'Reports') {
      return (
        <Icons
          name="ICCopy"
          width={36}
          height={38}
          stroke={COLORS.greenPrimary}
          strokeWidth={4}
        />
      );
    }
    if (title === 'Upload') {
      return (
        <View style={styles.plushContainer}>
          <Icons name="ICPlus" width={18} height={18} fill={COLORS.white} />
        </View>
      );
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      {_renderIcon()}
      <Gap width={METRICS.gutter.xs} />
      <Text style={testStyle}>{title}</Text>
      {innerText && <Text style={innerTestStyle}>{innerText}</Text>}
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: METRICS.gutter.l + 2,
    height: METRICS.gutter.l + 3,
  },
  text: {
    fontFamily: FONTS.primary[600],
    marginTop: 5,
  },
  innerText: {
    fontFamily: FONTS.primary[600],
    marginTop: -1.5,
  },
  plushContainer: {
    width: 64,
    height: 42,
    backgroundColor: COLORS.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginTop: 32,
    marginBottom: 8,
  },
  iconPlus: {
    width: 22,
    height: 47,
  },
});

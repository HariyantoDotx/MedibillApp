import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, METRICS} from '../../../utils';
import {Gap} from '../../atoms';

interface ListWithLabelAndLineProps {
  label: string | number;
  name: string | number;
}

const ListWithLabelAndLine = ({label, name}: ListWithLabelAndLineProps) => {
  return (
    <View style={styles.contaier}>
      <Text style={styles.sub}>{label || ''}</Text>
      <Gap height={2} />
      <Text style={styles.name}>{name || ''}</Text>
      <Gap height={2} />
      <View style={styles.line} />
    </View>
  );
};

export default ListWithLabelAndLine;

const styles = StyleSheet.create({
  contaier: {
    paddingVertical: METRICS.gutter.xxs,
  },
  line: {
    borderBottomColor: COLORS.grayPrimary,
    borderBottomWidth: 1,
    marginVertical: METRICS.gutter.xxs,
  },
  sub: {
    fontFamily: FONTS.primary[400],
    color: COLORS.black1,
  },
  name: {
    fontFamily: FONTS.primary[600],
    color: COLORS.black1,
  },
});

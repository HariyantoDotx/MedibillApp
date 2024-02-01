import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, METRICS, ReportData, mounth} from '../../../utils';
import {Button, Gap} from '../../atoms';

interface InvoiceCardProps {
  data: ReportData;
  onPress: (T: any) => void;
}

const InvoiceCard = ({data, onPress}: InvoiceCardProps) => {
  return (
    <View style={styles.container}>
      {/* patient Name */}
      <Text style={styles.label}>Doctor Name</Text>
      <Gap height={2} />
      <Text style={styles.value}>{data.doctor_name}</Text>
      <View style={styles.line} />
      <Gap height={2} />
      <Text style={styles.label}>Month</Text>
      <Gap height={2} />
      <Text style={styles.value}>{mounth(data.month)}</Text>
      <View style={styles.line} />
      <Gap height={12} />
      <Button
        title="Show Report"
        onPress={() => onPress(data.pdf_url)}
        type="blue"
      />
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.grayPrimary,
    padding: METRICS.gutter.s,
    borderWidth: METRICS.gutter.xxxs,
    borderRadius: METRICS.radius.input,
    marginBottom: METRICS.gutter.xxs,
  },
  label: {
    fontFamily: FONTS.primary[400],
    color: COLORS.black1,
  },
  value: {
    fontFamily: FONTS.primary[600],
    color: COLORS.black1,
  },
  line: {
    borderBottomColor: COLORS.grayPrimary,
    borderBottomWidth: 1,
    marginVertical: METRICS.gutter.xxs,
  },
  expandContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

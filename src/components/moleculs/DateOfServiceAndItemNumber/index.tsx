import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  COLORS,
  DetailDetailBillingSheetFile,
  FONTS,
  METRICS,
} from '../../../utils';
import {Gap} from '../..';

interface DateOfServiceAndItemNumberProps {
  data: DetailDetailBillingSheetFile;
}

const DateOfServiceAndItemNumber = ({
  data,
}: DateOfServiceAndItemNumberProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.lContainer}>
        <Text style={styles.sub}>Date of Service</Text>
        <Gap height={2} />
        <Text style={styles.name}>
          {data.date_of_service} {data.time_of_service}
        </Text>
        <Gap height={2} />
      </View>
      <View style={styles.rContainer}>
        <Text style={styles.sub}>Item Number</Text>
        <Gap height={2} />
        <Text style={styles.name}>{data.item_number}</Text>
        <Gap height={2} />
      </View>
    </View>
  );
};

export default DateOfServiceAndItemNumber;

const styles = StyleSheet.create({
  container: {
    paddingVertical: METRICS.gutter.xxs,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: COLORS.grayPrimary,
    borderBottomWidth: 1,
    marginVertical: METRICS.gutter.xxs,
  },
  lContainer: {
    flex: 1,
  },
  rContainer: {
    flex: 1,
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

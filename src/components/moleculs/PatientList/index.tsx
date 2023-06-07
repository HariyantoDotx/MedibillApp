import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, METRICS, formatDate} from '../../../utils';

interface PatientListProps {
  data: any;
  onPress: () => void;
}

const PatientList = ({data, onPress}: PatientListProps) => {
  const {address, dob, patient_name} = data;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.conten}>
        <View style={styles.left}>
          <Text style={styles.text}>Name</Text>
        </View>
        <View style={{}}>
          <Text style={styles.text}>{patient_name}</Text>
        </View>
      </View>

      <View style={styles.conten}>
        <View style={styles.left}>
          <Text style={styles.text}>DOB</Text>
        </View>
        <View style={{}}>
          <Text style={styles.text}>{formatDate(dob)}</Text>
        </View>
      </View>

      <View style={styles.conten}>
        <View style={styles.left}>
          <Text style={styles.text}>Address</Text>
        </View>
        <View style={{}}>
          <Text style={styles.text}>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PatientList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: METRICS.gutter.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greenSecondary,
  },
  conten: {
    flexDirection: 'row',
  },
  left: {
    width: 64,
  },
  text: {
    fontFamily: FONTS.primary[600],
    color : COLORS.black1
  },
});

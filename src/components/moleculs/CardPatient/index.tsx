import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../utils';

interface CardPatientProps {
  data: {
    patient_name: string;
    reference_number: string;
    date_of_submissions: string;
  };
  onPress: () => void;
}

const CardPatient = ({data, onPress}: CardPatientProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.sub}>Name</Text>
      <Text style={styles.name}>{data.patient_name}</Text>
      <View style={styles.line} />
      <Text style={styles.sub}>Reference</Text>
      <Text style={styles.name}>{data.reference_number}</Text>
      <View style={styles.line} />
      <Text style={styles.sub}>Submission</Text>
      <Text style={styles.name}>{data.date_of_submissions}</Text>
    </TouchableOpacity>
  );
};

export default CardPatient;

const styles = StyleSheet.create({
  card: {
    margin: METRICS.gutter.xxs,
    height: 150,
    borderRadius: METRICS.radius.button,
    padding: METRICS.gutter.xs,
    borderWidth: 1,
    borderColor: COLORS.grayPrimary,
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

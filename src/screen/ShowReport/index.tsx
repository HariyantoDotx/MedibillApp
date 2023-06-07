import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { Button, Gap, Header } from '../../components';
import { COLORS, METRICS, ShowReportProps } from '../../utils';

const ShowReport = ({navigation, route}: ShowReportProps) => {
  const {pdf_url} = route.params;

  return (
    <View style={{flex: 1}}>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header
        withBack
        onBackPress={() => navigation.goBack()}
        title="Reports"
      />
      <Pdf
        source={{uri: pdf_url, cache: true}}
        trustAllCerts={false}
        style={{flex: 1}}
      />
      <View style={styles.buttonContainer}>
        <Button title="Download" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ShowReport;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
});

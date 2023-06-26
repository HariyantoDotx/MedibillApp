import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, METRICS, ShowBillingProps} from '../../utils';
import {Button, Gap, Header} from '../../components';
import Pdf from 'react-native-pdf';

const ShowBilling = ({navigation, route}: ShowBillingProps) => {
  const {params} = route;

  if (params.type === 'image/jpeg') {
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
          title="Billing"
        />
        <Image source={{uri: params.url}} style={{flex: 1, margin : 32}} />
      </View>
    );
  }
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
        title="Billing"
      />
      <Pdf
        source={{uri: params.url, cache: true}}
        trustAllCerts={false}
        style={{flex: 1}}
      />
    </View>
  );
};

export default ShowBilling;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
});

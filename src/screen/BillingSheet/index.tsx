import React from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {CardPatient, Gap, Header, Input} from '../../components';
import {useInfinityBillingSheet} from '../../hooks';
import {BillingSheetProps, COLORS, FONTS, METRICS} from '../../utils';

const BillingSheet = ({navigation}: BillingSheetProps) => {
  const {handleScroll, data, search, setSearch} = useInfinityBillingSheet();

  console.log('data', data)

  return (
    <>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header
        title="Billing Sheets"
        desc="Only the billing sheets uploaded through the Medibill portal are displayed"
      />
      <Gap height={METRICS.gutter.s} />
      <View style={styles.page}>
        <Input
          placeholder="Search Billing Sheets"
          search
          value={search}
          onChangeText={setSearch}
        />
        <Gap height={METRICS.gutter.s} />
        <ScrollView
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {data?.length > 0 &&
              data?.map((dt, i) => {
                const id = dt.reference_number;
                return (
                  <CardPatient
                    data={dt}
                    key={i}
                    onPress={() =>
                      navigation.navigate('DetailBillingSheet', {id})
                    }
                  />
                );
              })}
          </View>
          <Gap height={METRICS.gutter.s} />
        </ScrollView>
      </View>
    </>
  );
};

export default BillingSheet;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: METRICS.gutter.s,
  },
  content: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  list: {
    marginLeft: METRICS.gutter.xxs,
    fontFamily: FONTS.primary[600],
  },
});

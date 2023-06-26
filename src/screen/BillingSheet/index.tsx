import React, {useEffect} from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CardPatient, Gap, Header, Input} from '../../components';
import {useInfinityBillingSheet} from '../../hooks';
import {BillingSheetProps, COLORS, FONTS, METRICS} from '../../utils';

const BillingSheet = ({navigation}: BillingSheetProps) => {
  const {handleScroll, data, search, setSearch, isLoading, refect} =
    useInfinityBillingSheet();

  return (
    <>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header title="Billing Sheets" />
      <Gap height={METRICS.gutter.s} />
      <View style={styles.page}>
        <Input
          placeholder="Search Billing Sheets"
          search
          value={search}
          onChangeText={setSearch}
        />
        <Gap height={METRICS.gutter.xs} />
        <Text style={styles.allert}>
          (Only billing sheets uploaded through medibill portal are displayed)
        </Text>
        <Gap height={METRICS.gutter.s} />
        <ScrollView
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refect} />
          }>
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
  allert: {
    fontSize: METRICS.gutter.xs + 2,
    fontFamily: FONTS.primary[500],
    color: COLORS.red1,
    textAlign: 'center',
  },
});

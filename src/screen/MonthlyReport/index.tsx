import React, {useMemo} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {DataNull, Gap, Header, InvoiceCard} from '../../components';
import {useGetDoctorsReportQuery} from '../../store/api/apiRequest';
import {COLORS, METRICS, MonthlyReportProps} from '../../utils';
import { useLoadingHandler } from '../../hooks';

const MonthlyReport = ({navigation}: MonthlyReportProps) => {
  const {data, isLoading} = useGetDoctorsReportQuery(undefined);
  useLoadingHandler({isLoading});

  const dataToRender = useMemo(() => {
    if (data?.data !== undefined) return data.data;
    return [];
  }, [data?.data]);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header title="Reports" />
      <View style={styles.page}>
        {dataToRender.length === 0 && <DataNull />}
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataToRender.length > 0 &&
            data?.data?.map(dt => {
              return (
                <View key={dt.id}>
                  <InvoiceCard
                    data={dt}
                    onPress={val => navigation.navigate('ShowReport', dt)}
                  />
                  <Gap height={METRICS.gutter.xs} />
                </View>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default MonthlyReport;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: METRICS.gutter.m,
    position: 'relative',
  },
  Text: {
    fontSize: METRICS.gutter.m,
  },
});

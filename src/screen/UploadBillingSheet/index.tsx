import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DataNull,
  Gap,
  Header,
  Icons,
  Input,
  PatientList,
} from '../../components';
import { useLoadingHandler } from '../../hooks';
import { useGetPatientReferralQuery } from '../../store/api/apiRequest';
import {
  COLORS,
  FONTS,
  METRICS,
  PatientReferraldData,
  UploadBillingSheetProps,
} from '../../utils';

const UploadBillingSheet = ({navigation}: UploadBillingSheetProps) => {
  const {data, isLoading} = useGetPatientReferralQuery(undefined);
  useLoadingHandler({isLoading});
  const [dataToRender, setDataToRender] = useState<PatientReferraldData[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const filterData = useCallback(() => {
    if (data !== undefined) {
      const filteredArray = data.data.filter(obj => {
        const {address, dob, patient_name} = obj;

        if (address === null || patient_name === null || dob === null) {
          return false;
        }

        if (address === '' || dob === '' || patient_name === '') {
          return false;
        }

        return true;
      });
      return filteredArray;
    }
    return [];
  }, [data]);

  useEffect(() => {
    if (searchValue) {
      let filter = data?.data || [];
      filter = filter.filter(item => {
        let valTextToLowercase = searchValue.toLowerCase();
        let patientNameToLowercase =
          item.patient_name !== null ? item.patient_name.toLowerCase() : '';
        return patientNameToLowercase.includes(valTextToLowercase);
      });
      setDataToRender(filter);
    } else {
      setDataToRender(filterData());
    }
  }, [data, searchValue, setDataToRender]);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header title="Upload Billing Sheets" />
      <View style={styles.page}>
        <Input
          placeholder="Search patient name"
          search
          value={searchValue}
          onChangeText={val => setSearchValue(val)}
        />
        <ScrollView>
          {dataToRender.length > 0 ? (
            dataToRender.map(item => (
              <PatientList
                key={item.id}
                data={item}
                onPress={() =>
                  navigation.navigate('DetailPatientReferral', {id: item.id})
                }
              />
            ))
          ) : (
            <DataNull />
          )}
        </ScrollView>
        <ScrollView></ScrollView>
        <View style={{marginTop: 8}}></View>
      </View>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('CompleteBillingSheet', {id: null})}>
        <Icons name="ICPlus" width={24} height={24} fill={COLORS.white} />
      </TouchableOpacity>
    </>
  );
};

export default UploadBillingSheet;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: METRICS.gutter.s,
    justifyContent: 'space-between',
  },
  searchContainer: {
    justifyContent: 'center',
  },
  emptyPatient: {
    fontFamily: FONTS.primary[600],
    fontSize: METRICS.gutter.s + 2,
  },
  plusButton: {
    width: METRICS.gutter.xxl,
    height: METRICS.gutter.xxl,
    backgroundColor: COLORS.greenPrimary,
    bottom: METRICS.gutter.s,
    right: METRICS.gutter.s,
    borderRadius: METRICS.radius.s,
    gap: METRICS.gutter.m,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
});

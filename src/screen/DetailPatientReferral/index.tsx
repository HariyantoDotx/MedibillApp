import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  ListWithLabelAndLine,
  PlusButton,
  TimeService,
} from '../../components';
import {useGetDetailPatientReferralQuery} from '../../store';
import {
  COLORS,
  DetailPatientReferralProps,
  METRICS,
  TImeService,
} from '../../utils';

const DetailPatientReferral = ({
  navigation,
  route,
}: DetailPatientReferralProps) => {
  const {id} = route.params;
  const {isSuccess, isError, data, error} = useGetDetailPatientReferralQuery({
    id: id ?? 0,
  });

  const [dateServices, setDateServices] = useState<TImeService[]>([
    {
      id: 9999,
      date_of_service: 'Date Service',
      time_of_service: 'Time',
      item_number: '',
    },
  ]);

  const onDeletePress = useCallback(
    (id: number) => {
      const index = dateServices.findIndex(dt => dt.id === id);
      if (index > -1) {
        const newData = dateServices.splice(index, 1);
        setDateServices(newData);
      }
    },
    [dateServices, setDateServices],
  );

  const addNewItem = useCallback(() => {
    const newData = {
      id: Date.now(),
      date_of_service: 'Date Service',
      time_of_service: 'Time',
      item_number: '',
    };
    setDateServices([...dateServices, newData]);
  }, [dateServices, setDateServices]);

  const onTimeServiceChange = useCallback(
    (val: TImeService) => {
      const index = dateServices.findIndex(e => e.id === val.id);

      let newArray = [...dateServices];
      newArray[index] = {
        ...newArray[index],
        date_of_service: val.date_of_service,
        time_of_service: val.time_of_service,
        item_number: val.item_number,
      };

      setDateServices(newArray);
    },
    [dateServices, setDateServices],
  );

  const [fileId, setFileId] = useState<number | undefined>();

  const handleSave = useCallback(() => {}, []);

  const responseData = useMemo(() => {
    if (data?.data !== undefined) return data.data;
    else return;
  }, [data]);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header
        title="Upload Billing Sheets"
        withBack
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListWithLabelAndLine
            name={responseData?.patient_name || ''}
            label="Name"
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.referral_date || ''}
            label="Referral Date"
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.details.dob || ''}
            label="DOB"
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.referring_doctor || ''}
            label="Referring Doctor"
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.details.address || ''}
            label="Address"
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.provider_number || ''}
            label="Provider Number"
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.details.referral_period || ''}
            label="Referral Period (months)"
          />

          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.details.medicare_no || ''}
            label="Medicare No."
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.details.health_fund_no || ''}
            label="Health Fund & Membership Number"
          />
          <Gap height={METRICS.gutter.s} />
          <ListWithLabelAndLine
            name={responseData?.details.insurer_no || ''}
            label="WC/Insurer & No"
          />
          <Gap height={METRICS.gutter.s} />

          {dateServices.map(dateService => {
            return (
              <View key={dateService.id}>
                <TimeService
                  data={dateService}
                  onDeletePress={() => onDeletePress(dateService.id)}
                  value={val => onTimeServiceChange(val)}
                />
                <Gap height={METRICS.gutter.s} />
              </View>
            );
          })}

          <Button title="Add New Item" onPress={addNewItem} />
          <Gap height={METRICS.gutter.s} />
          <Button title="Save" type="blue" onPress={handleSave} />
          <Gap height={METRICS.gutter.xxxxl} />
        </ScrollView>
      </View>
      <PlusButton setFileId={val => setFileId(val)} />
    </>
  );
};

export default DetailPatientReferral;

const styles = StyleSheet.create({
  page: {
    padding: METRICS.radius.s,
    backgroundColor: COLORS.white,
  },
});

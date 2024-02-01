import React, {useCallback, useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  Input,
  PlusButton,
  TimeService,
} from '../../components';
import {useLoadingHandler} from '../../hooks';
import useErrorHandler from '../../hooks/useErrorHandler';
import {useUploadBillingMutation} from '../../store';
import {
  COLORS,
  CompleteBillingSheetProps,
  METRICS,
  TImeService,
  UploadBillingForm,
} from '../../utils';

const CompleteBillingSheet = ({
  navigation,
  route,
}: CompleteBillingSheetProps) => {
  const [mutation, {isSuccess, isLoading, isError, error}] =
    useUploadBillingMutation();
  useLoadingHandler({isLoading});
  useErrorHandler({isError, error});

  const {id} = route.params;

  const [fileId, setFileId] = useState<number | undefined>(id ? id : undefined);
  const [name, setName] = useState('');
  const [hospital, setHospital] = useState('')
  const [referral_date, setReferral_date] = useState<string | null>(null);
  const [dob, setDob] = useState<string | null>(null);
  const [referring_doctor, setReferring_doctor] = useState('');
  const [address, setAddress] = useState('');
  const [provider_number, setProvider_number] = useState('');
  const [referral_period, setReferral_period] = useState('');
  const [medicare_no, setMedicare_no] = useState('');
  const [health_fund_no, setHealth_fund_no] = useState('');
  const [insurer_no, setInsurer_no] = useState('');

  const [dateServices, setDateServices] = useState<TImeService[]>([
    {
      id: 9999,
      date_of_service: 'Date Service',
      time_of_service: 'Time',
      item_number: '',
    },
  ]);

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
        date_of_service: val.date_of_service || '',
        time_of_service: val.time_of_service,
        item_number: val.item_number,
      };

      setDateServices(newArray);
    },
    [dateServices, setDateServices],
  );

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

  const handleSave = useCallback(() => {
    const form: UploadBillingForm = {
      name,
      hospital,
      referral_date,
      dob,
      referring_doctor,
      address,
      provider_number,
      referral_period,
      medicare_no,
      health_fund_no,
      insurer_no,
    };

    let newdateServices = [...dateServices];
    dateServices.map((dt, i) => {
      if (dt.time_of_service === 'Time') {
        newdateServices[i] = {
          ...newdateServices[i],
          time_of_service: '',
        };
      }
      if (dt.date_of_service === 'Date Service' && dt.item_number === '') {
        newdateServices.splice(i, 1);
      }
      if (newdateServices[i]?.date_of_service !== undefined)
        newdateServices[i] = {
          ...newdateServices[i],
          date_of_service: newdateServices[i].date_of_service || '',
        };
    });
    mutation({
      data: newdateServices,
      patient: form,
      old: false,
      file_id: fileId,
    });
  }, [
    name,
    referral_date,
    dob,
    referring_doctor,
    address,
    provider_number,
    referral_period,
    medicare_no,
    health_fund_no,
    insurer_no,
    dateServices,
    fileId,
  ]);

  useEffect(() => {
    if (isSuccess) navigation.navigate('BillingSheets');
  }, [isSuccess]);
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
          <Input value={name} onChangeText={setName} label="Name" />
          <Gap height={METRICS.gutter.s} />
          <Input value={hospital} onChangeText={setHospital} label="Hospital" />
          <Gap height={METRICS.gutter.s} />
          <Input
            withDate
            value={referral_date || ''}
            onChangeText={setReferral_date}
            label="Referral Date"
          />
          <Gap height={METRICS.gutter.s} />
          <Input withDate value={dob || ''} onChangeText={setDob} label="DOB" />
          <Gap height={METRICS.gutter.s} />
          <Input
            value={referring_doctor}
            onChangeText={setReferring_doctor}
            label="Referring Doctor"
          />
          <Gap height={METRICS.gutter.s} />
          <Input value={address} onChangeText={setAddress} label="Address" />
          <Gap height={METRICS.gutter.s} />
          <Input
            value={provider_number}
            onChangeText={setProvider_number}
            label="Provider Number"
          />
          <Gap height={METRICS.gutter.s} />
          <Input
            value={referral_period}
            onChangeText={setReferral_period}
            label="Referral Period (months)"
          />
          <Gap height={METRICS.gutter.s} />
          <Input
            value={medicare_no}
            onChangeText={setMedicare_no}
            label="Medicare No."
          />
          <Gap height={METRICS.gutter.s} />
          <Input
            value={health_fund_no}
            onChangeText={setHealth_fund_no}
            label="Health Fund & Membership Number"
          />
          <Gap height={METRICS.gutter.s} />
          <Input
            value={insurer_no}
            onChangeText={setInsurer_no}
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

export default CompleteBillingSheet;

const styles = StyleSheet.create({
  page: {
    padding: METRICS.radius.s,
    backgroundColor: COLORS.white,
  },
});

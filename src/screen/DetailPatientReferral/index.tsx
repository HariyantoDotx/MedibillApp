import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Button, Gap, Header, Input, PlusButton} from '../../components';
import {
  COLORS,
  METRICS,
  UploadBillingForm,
  ddmmyyyyToyyyymmdd,
} from '../../utils';

const DetailPatientReferral = ({navigation}: {navigation: any}) => {
  const [fileId, setFileId] = useState<number | undefined>();
  const [name, setName] = useState('');
  const [referral_date, setReferral_date] = useState('');
  const [dob, setDob] = useState('');
  const [referring_doctor, setReferring_doctor] = useState('');
  const [address, setAddress] = useState('');
  const [provider_number, setProvider_number] = useState('');
  const [referral_period, setReferral_period] = useState('');
  const [medicare_no, setMedicare_no] = useState('');
  const [health_fund_no, setHealth_fund_no] = useState('');
  const [insurer_no, setInsurer_no] = useState('');

  const handleSave = useCallback(() => {
    const form: UploadBillingForm = {
      name,
      referral_date: ddmmyyyyToyyyymmdd(referral_date),
      dob: ddmmyyyyToyyyymmdd(dob),
      referring_doctor,
      address,
      provider_number,
      referral_period,
      medicare_no,
      health_fund_no,
      insurer_no,
    };
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
    fileId,
  ]);

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
          <Input
            withDate
            value={referral_date}
            onChangeText={setReferral_date}
            label="Referal Date"
          />
          <Gap height={METRICS.gutter.s} />
          <Input withDate value={dob} onChangeText={setDob} label="DOB" />
          <Gap height={METRICS.gutter.s} />
          <Input
            value={referring_doctor}
            onChangeText={setReferring_doctor}
            label="Refering Doctor"
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
            label="referral Period (months)"
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

          {/* <Button title="Add New Item" onPress={addNewItem} /> */}
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

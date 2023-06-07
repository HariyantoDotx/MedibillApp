import React, {useCallback, useMemo} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, ListWithLabelAndLine} from '../../components';
import DateOfServiceAndItemNumber from '../../components/moleculs/DateOfServiceAndItemNumber';
import {useAppDispatch, useGetDetailBillingSheetQuery} from '../../store';
import {COLORS, DetaiBillingSheetProps, METRICS, formatDate} from '../../utils';
import {useLoadingHandler} from '../../hooks';
import RNFetchBlob from 'rn-fetch-blob';
import {setAllert} from '../../store/reducer/allert';

const DetailBillingSheet = ({navigation, route}: DetaiBillingSheetProps) => {
  const {id} = route.params;

  const dispatch = useAppDispatch();

  const {data: res, isLoading} = useGetDetailBillingSheetQuery({id});
  useLoadingHandler({isLoading});

  const data = useMemo(() => res?.data, [res]);

  const downloadFile = useCallback(() => {
    if (data === undefined) {
      dispatch(
        setAllert({
          visible: true,
          message: 'pdf undefined',
          type: 'error',
        }),
      );
    } else {
      const {config, fs} = RNFetchBlob;
      let RootDir =
        Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        path: RootDir + data?.file.file_name,
        addAndroidDownloads: {
          description: 'downloading file...',
          notification: true,
          mime: 'application/pdf',
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch('GET', data?.file.url.replace(' ', '%20'))
        .then(res => {
          dispatch(
            setAllert({
              visible: true,
              message: 'pdf undefined',
              type: 'success',
            }),
          );
        });
    }
  }, [data]);

  console.log('data?.file.url', data?.file.url)

  const handleShow = useCallback(() => {
    if (data?.file.url === undefined) {
      dispatch(
        setAllert({
          visible: true,
          message: 'pdf undefined',
          type: 'error',
        }),
      );
    } else {
      navigation.navigate('ShowBilling', data?.file);
    }
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
        title="Detail Billing Sheet"
        withBack
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={8} />
          <ListWithLabelAndLine
            label="Patient Name"
            name={data?.patient_referral.details?.name || ''}
          />
          <ListWithLabelAndLine
            label="Referal Date"
            name={data?.patient_referral.details?.referral_date || ''}
          />
          <ListWithLabelAndLine
            label="DOB"
            name={formatDate(data?.patient_referral.details?.dob || '')}
          />
          <ListWithLabelAndLine
            label="Referring Doctor"
            name={data?.patient_referral.details?.referring_doctor || ''}
          />
          <ListWithLabelAndLine
            label="Address"
            name={data?.patient_referral.details?.address || ''}
          />
          <ListWithLabelAndLine
            label="Provider Number"
            name={data?.patient_referral.details?.provider_number || ''}
          />
          <ListWithLabelAndLine
            label="Medicare No"
            name={data?.patient_referral.details?.medicare_no || ''}
          />
          <ListWithLabelAndLine
            label="Referral Period (months)"
            name={data?.patient_referral.details?.referral_period || ''}
          />
          <ListWithLabelAndLine
            label="Health Fund & membership no:"
            name={data?.patient_referral.details?.health_fund_no || ''}
          />
          <ListWithLabelAndLine
            label="WC/Insurer & no:"
            name={data?.patient_referral.details?.insurer_no || ''}
          />
          {data?.details?.map((dt, i) => {
            return <DateOfServiceAndItemNumber data={dt} key={i} />;
          })}
        </ScrollView>
      </View>
      <Gap height={4} />
      <View style={styles.buttonContainer}>
        <Button size="small" title="Show FIle" onPress={handleShow} />
        <Button size="small" title="Download FIle" onPress={downloadFile} />
      </View>
      <Gap height={4} />
    </>
  );
};

export default DetailBillingSheet;

const styles = StyleSheet.create({
  page: {
    padding: METRICS.gutter.s,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: METRICS.gutter.s,
    paddingBottom: METRICS.gutter.xs,
  },
});

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Button, Gap, Header, Input, TimeService} from '../../components';
import {useLoadingHandler} from '../../hooks';
import useErrorHandler from '../../hooks/useErrorHandler';
import {
  useAppDispatch,
  useGetDetailBillingSheetQuery,
  useLazyExportBillingToPdfQuery,
  useUpdateBillingMutation,
} from '../../store';
import {setAllert} from '../../store/reducer/allert';
import {
  COLORS,
  DetaiBillingSheetProps,
  METRICS,
  TImeService,
  UploadBillingForm,
} from '../../utils';

const DetailBillingSheet = ({navigation, route}: DetaiBillingSheetProps) => {
  const {id} = route.params;
  const dispatch = useAppDispatch();
  const {
    data: res,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetDetailBillingSheetQuery({id});
  const [
    getPdf,
    {
      isSuccess: isGetPdfSuccess,
      data: getPdfData,
      isError: isGetPdfError,
      error: getPdfError,
      isLoading: isGetPdfLoading,
    },
  ] = useLazyExportBillingToPdfQuery();
  const [
    mutate,
    {
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
    },
  ] = useUpdateBillingMutation();
  useLoadingHandler({
    isLoading: isLoading || isUpdateLoading || isGetPdfLoading,
  });
  useErrorHandler({
    isError: isError || isUpdateError || isGetPdfError,
    error: error || updateError || getPdfError,
  });

  const [alreadyDownload, setAlreadyDownload] = useState(false);

  const [name, setName] = useState('');
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

  const data = useMemo(() => res?.data, [res]);

  const form: UploadBillingForm = {
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
  };

  useEffect(() => {
    if (isSuccess && data) {
      const {patient_name, referral_date, details} = data.patient_referral;
      const {
        dob,
        referring_doctor,
        address,
        provider_number,
        medicare_no,
        referral_period,
        health_fund_no,
        insurer_no,
      } = details;
      setName(patient_name || '');
      setReferral_date(referral_date || '');
      setDob(referral_date || '');
      setReferring_doctor(referring_doctor || '');
      setAddress(address || '');
      setProvider_number(provider_number || '');
      setReferral_period(referral_period || '');
      setMedicare_no(medicare_no || '');
      setHealth_fund_no(health_fund_no || '');
      setInsurer_no(insurer_no || '');
      console.log('data.details', data.details)
      const newdateServices: TImeService[] = [];
      data.details.forEach((item, i) => {
        newdateServices.push({...item, id: i});
      });
      setDateServices(newdateServices as TImeService[]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(
        setAllert({
          message: 'Update billing success',
          visible: true,
          type: 'success',
        }),
      );
      refetch();
      navigation.goBack();
    }
  }, [isUpdateSuccess]);

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
          mime: data.file.type,
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch('GET', data?.file.url.replace(' ', '%20'))
        .then(res => {
          dispatch(
            setAllert({
              visible: true,
              message: 'download file success',
              type: 'success',
            }),
          );
        });
    }
  }, [data]);

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
      console.log('val', val);
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

  const handleExportPdf = useCallback(() => {
    setAlreadyDownload(false);
    if (res?.data.id) getPdf({id: res?.data.id});
  }, [res?.data.id]);

  useEffect(() => {
    if (isGetPdfSuccess && getPdfData) {
      const {config, fs} = RNFetchBlob;
      let RootDir =
        Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        path: RootDir + id,
        addAndroidDownloads: {
          description: 'downloading file...',
          notification: true,
          mime: 'application/pdf',
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch('GET', getPdfData?.data.replace(' ', '%20') || '')
        .then(res => {
          setAlreadyDownload(true);
          dispatch(
            setAllert({
              visible: true,
              message: 'pdf undefined',
              type: 'success',
            }),
          );
        });
    }
  }, [isGetPdfSuccess, getPdfData, id, alreadyDownload]);

  const handleUpdate = useCallback(() => {
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
      newdateServices[i] = {
        ...newdateServices[i],
        date_of_service: newdateServices[i].date_of_service || '',
      };
    });
    if (data?.id)
      mutate({id: data?.id, payload: {patient: form, data: newdateServices}});
  }, [form, dateServices]);

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
          <Input value={name} onChangeText={setName} label="Patient Name" />
          <Gap height={12} />
          <Input
            withDate
            value={referral_date || ''}
            onChangeText={setReferral_date}
            label="Referal Date"
          />
          <Gap height={12} />
          <Input withDate value={dob || ''} onChangeText={setDob} label="DOB" />
          <Gap height={12} />
          <Input
            value={referring_doctor}
            onChangeText={setReferring_doctor}
            label="Referring Doctor"
          />
          <Gap height={12} />
          <Input value={address} onChangeText={setAddress} label="Address" />
          <Gap height={12} />
          <Input
            value={provider_number}
            onChangeText={setProvider_number}
            label="Provider Number"
          />
          <Gap height={12} />
          <Input
            value={medicare_no}
            onChangeText={setMedicare_no}
            label="Medicare No"
          />
          <Gap height={12} />
          <Input
            value={referral_period}
            onChangeText={setReferral_period}
            label="Referral Period (months)"
          />
          <Gap height={12} />
          <Input
            value={health_fund_no}
            onChangeText={setHealth_fund_no}
            label="Health Fund & membership no"
          />
          <Gap height={12} />
          <Input
            value={insurer_no}
            onChangeText={setInsurer_no}
            label="WC/Insurer & no"
          />
          <Gap height={24} />
          {dateServices.map(dateService => (
            <View key={dateService.id ?? dateService.item_number}>
              <TimeService
                data={dateService}
                onDeletePress={() => onDeletePress(dateService.id)}
                value={val => onTimeServiceChange(val)}
              />
              <Gap height={METRICS.gutter.s} />
            </View>
          ))}
          <Gap height={24} />
          <Button title="Add New Item" onPress={addNewItem} />
          <Gap height={12} />
          <Button
            title="Update billing Sheet"
            type="blue"
            onPress={handleUpdate}
          />
        </ScrollView>
      </View>
      <Gap height={4} />
      <View style={styles.buttonContainer}>
        <Button size="small" title="Show FIle" onPress={handleShow} />
        <Button size="small" title="Export Pdf" onPress={handleExportPdf} />
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

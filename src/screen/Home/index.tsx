import axios from 'axios';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {ILHome} from '../../assets';
import {Gap, Header, TabItem} from '../../components';
import {useLoadingHandler} from '../../hooks';
import {API, useAppDispatch, useAppSelector} from '../../store';
import {useGetProfileQuery} from '../../store/api/apiRequest';
import {setAllert} from '../../store/reducer/allert';
import {COLORS, FIleResponse, FONTS, HomeProps, METRICS} from '../../utils';

const deviceScreen = METRICS.screen.width;

const Home = ({navigation}: HomeProps) => {
  const {access_token, token_type} = useAppSelector(state => state.users);
  const {isSuccess, data, isLoading} = useGetProfileQuery(undefined);
  const {handleLoading} = useLoadingHandler({isLoading});

  const dispatch = useAppDispatch();

  const name = useMemo(() => {
    if (isSuccess && !!data.data) return data.data.name;
    return '';
  }, [isSuccess, data, isLoading]);

  const uploadPdf = useCallback((myImage: FIleResponse) => {
    const data = new FormData();
    data.append('file', myImage);
    data.append('handle', 'billing_sheet');
    handleLoading(true);
    axios
      .post(`${API.url}/api/v1/pdf`, data, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })
      .then(res => {
        handleLoading(false);
        dispatch(
          setAllert({
            type: 'success',
            message: 'Upload pdf success',
            visible: true,
          }),
        );
      })
      .catch(err => {
        handleLoading(false);
        console.log('err', err);
      });
  }, []);

  const handleOpenFile = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const file = {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
        size: res[0].size,
        fileCopyUri: res[0].fileCopyUri,
      };
      uploadPdf(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        dispatch(
          setAllert({
            visible: true,
            message: `You did not select a file`,
          }),
        );
      } else {
        throw err;
      }
    }
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && <Gap height={METRICS.gutter.m} />}
      <Header title="Home Page" withLogo />
      <View style={styles.page}>
        <View style={styles.innerPage}>
          <View style={styles.opening}>
            <Text style={styles.textHello}>Hello</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileDoctor')}>
              <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
          </View>
          <Gap height={METRICS.gutter.s} backgroundColor="#F7F9FF" />
          <View>
            <View style={styles.menu}>
              <TabItem
                title="Submitted"
                innerText="Billing Sheets"
                onPress={() => navigation.navigate('BillingSheets')}
              />
              <TabItem
                title="Monthly"
                innerText="Reports"
                onPress={() => navigation.navigate('MonthlyReports')}
              />
            </View>
            <View style={styles.menu}>
              <TabItem
                title="Upload"
                innerText="Billing Sheets"
                onPress={() => navigation.navigate('UploadBillingSheet')}
                textstyle={METRICS.gutter.s}
              />
              <TabItem
                title="Upload"
                innerText="PDF"
                onPress={handleOpenFile}
                textstyle={METRICS.gutter.s}
              />
            </View>
          </View>
        </View>
        <View style={styles.instructions}>
          <Image style={styles.image} source={ILHome} />
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7F9FF',
    flex: 1,
    paddingBottom: 0,
    position: 'relative',
    justifyContent: 'space-between',
  },
  innerPage: {
    padding: METRICS.gutter.m,
  },
  opening: {
    alignItems: 'center',
  },
  text: {
    fontSize: METRICS.gutter.m,
    fontFamily: FONTS.primary[600],
    color: COLORS.black1,
  },

  textHello: {
    fontSize: METRICS.gutter.s + 4,
    fontFamily: FONTS.primary[300],
    color: COLORS.black1,
  },
  textLogout: {
    color: COLORS.red1,
    fontSize: METRICS.gutter.s,
    fontFamily: FONTS.primary[500],
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  instructions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textInstructions: {
    fontSize: METRICS.gutter.s,
    maxWidth: METRICS.screen.width / 1.5,
  },
  image: {
    width: deviceScreen - 32,
    height: deviceScreen,
    zIndex: 10,
    resizeMode: 'contain',
  },
});

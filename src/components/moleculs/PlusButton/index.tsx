import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {API, useAppDispatch, useAppSelector} from '../../../store';
import {setAllert} from '../../../store/reducer/allert';
import {COLORS, FIleResponse, METRICS, PickerResponse} from '../../../utils';
import {Icons} from '../../atoms';
import {useLoadingHandler} from '../../../hooks';

let dataImage: PickerResponse = {
  uri: '',
  type: '',
  name: '',
};

let source = {uri: ''};

interface PlusButtonProps {
  setFileId: (T: number) => void;
}

const PlusButton = ({setFileId}: PlusButtonProps) => {
  const {handleLoading} = useLoadingHandler({isLoading: false});
  const dispatch = useAppDispatch();
  const {access_token, token_type} = useAppSelector(state => state.users);

  const [active, setActive] = useState(false);

  const handlePress = useCallback(() => {
    setActive(prev => !prev);
  }, [setActive, active]);

  const uploadImage = useCallback((myImage: PickerResponse | FIleResponse) => {
    const data = new FormData();
    data.append('image', myImage);
    data.append('ocr', 0);
    handleLoading(true);
    axios
      .post(`${API.url}/api/v1/file`, data, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })
      .then(res => {
        setFileId(res.data.data.id);
        setActive(false);
        handleLoading(false);
      })
      .catch(err => {
        handleLoading(false);
        setActive(false);
        console.log('err', err);
      });
  }, []);

  const handleOpenCamera = useCallback(() => {
    launchCamera({quality: 1, mediaType: 'photo'}, async res => {
      if (res.didCancel || res.errorMessage || res.errorCode) {
        dispatch(
          setAllert({
            visible: true,
            message: res.errorMessage || res.errorCode || `Photo not detected`,
          }),
        );
      } else if (res.assets) {
        dataImage = {
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName,
        };
        source = {uri: res.assets[0].uri || ''};
        uploadImage(dataImage);
      }
    });
  }, []);

  const handleOpenGallery = useCallback(() => {
    launchImageLibrary({quality: 1, mediaType: 'photo'}, async res => {
      if (res.didCancel || res.errorMessage || res.errorCode) {
        dispatch(
          setAllert({
            visible: true,
            message: `Image not detected`,
          }),
        );
      } else if (res.assets) {
        dataImage = {
          uri: res.assets[0].uri,
          type: res.assets[0].type,
          name: res.assets[0].fileName,
        };
        source = {uri: res.assets[0].uri || ''};
        uploadImage(dataImage);
      }
    });
  }, []);

  const handleOpenFile = useCallback(async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      const file = {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
        size: res[0].size,
        fileCopyUri: res[0].fileCopyUri,
      };
      uploadImage(file);
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

  if (active)
    return (
      <View
        style={{
          ...styles.container,
          width: METRICS.gutter.xxl * 4,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity style={styles.iconWrapper} onPress={handleOpenCamera}>
          <Icons name="ICCamera" width={24} height={24} fill={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={handleOpenGallery}>
          <Icons name="ICGallery" width={24} height={22} fill={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={handleOpenFile}>
          <Icons name="ICFolder" width={27} height={27} fill={COLORS.white} />
        </TouchableOpacity>
      </View>
    );

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.addFile}>Add File</Text>
      <Icons name="ICPlus" width={18} height={18} fill={COLORS.white} />
    </TouchableOpacity>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  container: {
    width: METRICS.gutter.xxl * 3,
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
  iconWrapper: {
    width: METRICS.gutter.xxl,
    height: METRICS.gutter.xxl,
    backgroundColor: COLORS.greenPrimary,
    borderRadius: METRICS.radius.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFile: {
    fontSize: 16,
    color: COLORS.white,
  },
});

import {Modal, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {Gap} from '../../atoms';
import {COLORS, METRICS} from '../../../utils';
import {useAppDispatch} from '../../../store';
import {resetAlert} from '../../../store/reducer/allert';

interface PopupMessageProps {
  type?: string;
  message: string;
  visible: boolean;
}

const PopupMessage = ({type, message, visible}: PopupMessageProps) => {
  const dispatch = useAppDispatch();
  const modalStyle = useMemo(
    () => ({
      ...styles.modal,
      backgroundColor: type === 'error' ? COLORS.red1 : COLORS.greenPrimary,
    }),
    [type],
  );

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(resetAlert(null));
      }, 2000);
    }
  }, [visible]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={type === 'error' ? COLORS.red1 : COLORS.greenPrimary}
        />
      )}
      <View style={modalStyle}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Modal>
  );
};

export default PopupMessage;

const styles = StyleSheet.create({
  modal: {
    height: METRICS.gutter.xxl,

    justifyContent: 'center',
    paddingHorizontal: METRICS.gutter.s,
  },
  text: {
    fontSize: METRICS.gutter.s,
  },
});

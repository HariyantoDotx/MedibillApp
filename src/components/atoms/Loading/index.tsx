import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../../utils';

const Loading = ({loading}: {loading: boolean}) => {
  return (
    <Modal transparent visible={loading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.greenPrimary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.primary[500],
    marginTop: 12,
    color: COLORS.white,
  },
});

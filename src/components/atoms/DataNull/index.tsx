import React from 'react';
import {StyleSheet, View} from 'react-native';

const DataNull = () => {
  return <View style={styles.wrapper}></View>;
};

export default DataNull;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

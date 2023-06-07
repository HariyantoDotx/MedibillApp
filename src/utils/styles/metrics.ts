import {Dimensions} from 'react-native';

export const METRICS = {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  gutter: {
    navbarHeight: 64,
    xxxs: 2,
    xxs: 4,
    xs: 8,
    s: 16,
    m: 24,
    l: 32,
    xl: 40,
    xxl: 48,
    xxxl: 56,
    xxxxl: 64,
  },
  radius: {
    input: 10,
    button: 10,
    xxxs: 2,
    xxs: 4,
    xs: 8,
    s: 16,
    m: 24,
    l: 32,
    xl: 40,
    xxl: 48,
    xxxl: 56,
    xxxxl: 64,
  },

  getWidtPercent(size: number) {
    return (size / 100) * Dimensions.get('screen').width;
  },
  getHeightPercent(size: number) {
    return (size / 100) * Dimensions.get('screen').height;
  },
};

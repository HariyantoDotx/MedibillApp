import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ILLogo} from '../../../assets';
import {COLORS, FONTS, METRICS} from '../../../utils';
import Icons from '../Icons';

const deviceScreen = METRICS.screen.width;

interface ButtonProps {
  title: string;
  withBack?: boolean;
  onBackPress?: () => void;
  withLogo?: boolean;
  desc?: string;
}

const Header = ({
  title,
  withBack,
  onBackPress,
  withLogo,
  desc,
}: ButtonProps) => {
  const navigation = useNavigation();

  if (withLogo) {
    return (
      <View style={{backgroundColor: '#F7F9FF'}}>
        <View style={styles.withLogoContainer}>
          <Image source={ILLogo} style={styles.logo} />
        </View>
      </View>
    );
  }

  const textWrapperStyle = useMemo(
    () => ({
      ...styles.textWrapper,
      marginRight: withBack ? 24 : 0,
    }),
    [withBack],
  );

  return (
    <View style={{backgroundColor: '#FFF'}}>
      <View style={styles.container}>
        {withBack && (
          <TouchableOpacity onPress={onBackPress}>
            <Icons
              name="ICArrowLeft"
              width={24}
              height={24}
              fill={COLORS.white}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        <View style={textWrapperStyle}>
          <Text style={styles.text}>{title}</Text>
          <View style={{maxWidth: deviceScreen * 0.75}}>
            <Text style={styles.desc}>{desc}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: METRICS.radius.xxxl,
    backgroundColor: COLORS.greenSecondary,
    borderBottomLeftRadius: METRICS.radius.xxl,
    borderBottomRightRadius: METRICS.radius.xxl,
    flexDirection: 'row',
  },
  withLogoContainer: {
    height: METRICS.getHeightPercent(15),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: METRICS.gutter.xxl,
    borderBottomRightRadius: METRICS.gutter.xxl,
  },
  logo: {
    width: METRICS.getWidtPercent(55),
    height: METRICS.getHeightPercent(10),
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: METRICS.gutter.xxs,
    marginLeft: METRICS.gutter.s,
  },
  icon: {
    width: METRICS.gutter.m,
    height: METRICS.gutter.m,
  },
  textHome: {
    fontSize: METRICS.gutter.s - 2,
    color: COLORS.black1,
    fontFamily: FONTS.primary[600],
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: METRICS.gutter.m - 4,
    fontFamily: FONTS.primary[500],
    marginLeft: -METRICS.gutter.s,
    color: COLORS.white,
  },
  desc: {
    fontSize: METRICS.gutter.xs + 2,
    fontFamily: FONTS.primary[500],
    marginLeft: -METRICS.gutter.s,
    color: COLORS.red1,
    textAlign: 'center',
  },
  backIcon: {
    marginTop: METRICS.gutter.s,
    marginLeft: METRICS.gutter.s,
    width: METRICS.gutter.s + 2,
    height: METRICS.gutter.s + 2,
  },
});

import React, {useCallback, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Gap, Header, Input} from '../../components';
import {COLORS, FONTS, ForgotPasswordProps, METRICS} from '../../utils';
import {ILLogo} from '../../assets';

const ForgotPassword = ({navigation}: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');

  const forgotPasswordPress = useCallback(() => {
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.xl}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header
        title="Forgot Password"
        withBack
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.page}>
        <View style={{}}>
          <ScrollView>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={ILLogo} />
              <Gap height={METRICS.gutter.m} />
              <Text style={styles.description}>
                Enter your email address and we'll send you an email with
                instructions to reset your password.
              </Text>
            </View>
            <Gap height={METRICS.gutter.xxxl} />
            <Input
              placeholder="Email Address*"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <Gap height={METRICS.gutter.s} />
            <Button title="Forgot Password" onPress={forgotPasswordPress} />
            <Gap height={METRICS.gutter.xxxl} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: METRICS.gutter.xl,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.black1,
    fontFamily: FONTS.primary[500],
  },
  logo: {
    width: METRICS.window.width - 200,
    height: (METRICS.window.width - 200) / 2.7,
  },
});

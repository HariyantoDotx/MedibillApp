import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ILLogo} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {COLORS, FONTS, METRICS, SignInProps} from '../../utils';
import {API} from '../../store';
import {authApi} from '../../store/api/autApi';
import {useLoadingHandler} from '../../hooks';
import useErrorHandler from '../../hooks/useErrorHandler';

const SignIn = ({navigation}: SignInProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [mutation, {isSuccess, data, isLoading, isError, error}] =
    authApi.useLoginMutation();
  useLoadingHandler({isLoading});
  useErrorHandler({isError, error});

  useEffect(() => {
    if (isSuccess && data) {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainApp', params: {itemId: 1}}],
      });
    }
  }, [isSuccess, data]);

  const signIn = useCallback(async () => {
    const body = {
      username,
      password,
      client_id: API.clientId,
      client_secret: API.clientSecret,
    };
    mutation(body);
  }, [username, password, mutation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.page}>
      <View style={{}}>
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={ILLogo} />
            <Gap height={METRICS.gutter.m} />
            <Text style={styles.Australia}>Australia’s Trusted</Text>
            <Gap height={METRICS.gutter.xxs} />
            <Text style={styles.description}>
              Professional Billing Services
            </Text>
            <Gap height={METRICS.gutter.xxs} />
            <Text style={styles.description}>for Medical Practitioner</Text>
          </View>
          <Gap height={METRICS.gutter.xxxl} />
          <Input
            placeholder="Email Address*"
            value={username}
            onChangeText={value => setUsername(value)}
          />
          <Gap height={METRICS.gutter.s - 3} />
          <Input
            placeholder="Password*"
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
          />
          <Gap height={METRICS.gutter.s} />
          <Button title="Sign In" onPress={signIn} />
          <Gap height={METRICS.gutter.xs} />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Gap height={METRICS.gutter.xxxl} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

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
  Australia: {
    fontSize: 16,
    color: COLORS.grayPrimary,
    letterSpacing: 1.1,
  },
  description: {
    fontSize: 16,
    color: COLORS.textPrimary,
    letterSpacing: 1.1,
    fontFamily: FONTS.primary[500],
  },
  forgotPassword: {
    textAlign: 'center',
    fontFamily: FONTS.primary[500],
    fontSize: 12,
    color: COLORS.black1,
  },
  logo: {
    width: 200,
    height: 75,
  },
});

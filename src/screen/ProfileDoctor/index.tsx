import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, METRICS} from '../../utils';
import {Button, Gap, Header, Input} from '../../components';
import {ILLogo} from '../../assets';
import {
  setProfileReset,
  setUserReset,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {setAllert} from '../../store/reducer/allert';

const ProfileDoctor = ({navigation}: {navigation: any}) => {
  const {profileData} = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [phone, setPhone] = useState(profileData.phone);
  const [password, setPassword] = useState('');

  const update = useCallback(() => {
    dispatch(setAllert({visible: true, message: 'under development fitur'}));
  }, []);

  const logout = useCallback(() => {
    dispatch(setUserReset(true));
    dispatch(setProfileReset(true));
    navigation.navigate('SignIn');
  }, []);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Gap
          height={METRICS.gutter.l}
          backgroundColor={COLORS.greenSecondary}
        />
      )}
      <Header title="Doctor Personal Info" />
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={METRICS.gutter.l} />
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={ILLogo} />
          </View>
          <Gap height={METRICS.gutter.l} />
          <Input label="Name" value={name} onChangeText={setName} />
          <Gap height={METRICS.gutter.m} />
          <Input label="E-mail" value={email} onChangeText={setEmail} />
          <Gap height={METRICS.gutter.m} />
          <Input label="Phone" value={phone} onChangeText={setPhone} />
          <Gap height={METRICS.gutter.m} />

          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Gap height={METRICS.gutter.l} />
          <Button title="Update" onPress={update} />
          <Gap height={METRICS.gutter.s} />
          <Button title="Log Out" type="blue" onPress={logout} />
          <Gap height={METRICS.gutter.m} />
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: METRICS.gutter.m,
  },
  logo: {
    width: METRICS.window.width - 300,
    height: (METRICS.window.width - 300) / 2.6,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: METRICS.gutter.xxl,
    borderBottomRightRadius: METRICS.gutter.xxl,
  },
});

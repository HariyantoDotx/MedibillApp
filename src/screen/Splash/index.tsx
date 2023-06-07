import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {ILLogo} from '../../assets';
import {COLORS, SplashProps} from '../../utils';
import {useAppSelector} from '../../store';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Splash = ({navigation}: SplashProps) => {
  const {isLogin} = useAppSelector(state => state.users);

  const cekAuthData = async () => {
    setTimeout(() => {
      if (isLogin) {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainApp', params: {itemId: 1}}],
        });
      } else {
        navigation.navigate('SignIn');
      }
    }, 3000);
  };

  useEffect(() => {
    cekAuthData();
  }, []);

  return (
    <View style={styles.page}>
      <Image style={styles.image} source={ILLogo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
    resizeMode: 'contain',
  },
});

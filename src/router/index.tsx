import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  BillingSheet,
  CompleteBillingSheet,
  DetailBillingSheet,
  DetailPatientReferral,
  ForgotPassword,
  Home,
  MonthlyReport,
  ProfileDoctor,
  ShowBilling,
  ShowReport,
  SignIn,
  Splash,
  UploadBillingSheet,
} from '../screen';
import Menu from './Menu';
import {RootStackParamList} from '../utils';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={props => <Menu {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Tab.Screen
        name="BillingSheets"
        component={BillingSheet}
        options={{title: 'Billing Sheets'}}
      />
      <Tab.Screen
        name="UploadBillingSheet"
        component={UploadBillingSheet}
        options={{title: 'Upload Billing'}}
      />
      <Tab.Screen
        name="MonthlyReports"
        component={MonthlyReport}
        options={{title: 'Monthly Reports'}}
      />
      <Tab.Screen
        name="ProfileDoctor"
        component={ProfileDoctor}
        options={{title: 'Account'}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen
        name="CompleteBillingSheet"
        component={CompleteBillingSheet}
      />
      <Stack.Screen name="DetailBillingSheet" component={DetailBillingSheet} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ShowReport" component={ShowReport} />
      <Stack.Screen name="ShowBilling" component={ShowBilling} />
      <Stack.Screen
        name="DetailPatientReferral"
        component={DetailPatientReferral}
      />
    </Stack.Navigator>
  );
};

export default Router;

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {icons} from '../assets';
import {
  CompleteBillingSheetParams,
  DetailBillingSheetFile,
  DetailParams,
  ReportData,
} from './interface';

export type RootStackParamList = {
  MainApp: undefined;
  Splash: undefined;
  SignIn: undefined;
  CompleteBillingSheet: CompleteBillingSheetParams;
  DetailBillingSheet: DetailParams;
  ForgotPassword: undefined;
  MonthlyReports: undefined;
  ShowReport: ReportData;
  BillingSheets: undefined;
  ShowBilling: DetailBillingSheetFile;
  UploadBillingSheet: undefined;
  Home: undefined;
  ProfileDoctor: undefined;
  DetailPatientReferral: CompleteBillingSheetParams;
};

export type SplashProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export type ProfileDoctorProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileDoctor'>;
};

export type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export type UploadBillingSheetProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'UploadBillingSheet'
  >;
};

export type SignInProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
};

export type ForgotPasswordProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

export type MonthlyReportProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MonthlyReports'>;
};

export type ShowReportProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ShowReport'>;
  route: {
    params: ReportData;
  };
};

export type ShowBillingProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ShowBilling'>;
  route: {
    params: DetailBillingSheetFile;
  };
};

export type BillingSheetProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BillingSheets'>;
};

export type CompleteBillingSheetProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CompleteBillingSheet'
  >;
  route: {
    params: CompleteBillingSheetParams;
  };
};

export type DetailPatientReferralProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'DetailPatientReferral'
  >;
  route: {
    params: CompleteBillingSheetParams;
  };
};

export type DetaiBillingSheetProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'DetailBillingSheet'
  >;
  route: {
    params: DetailParams;
  };
};

export interface TImeService {
  id: number;
  date_of_service: string;
  time_of_service: string;
  item_number: number | string;
}

export interface UploadBillingForm {
  name: string;
  referral_date: string;
  dob: string;
  referring_doctor: string;
  address: string;
  provider_number: string;
  referral_period: string;
  medicare_no: string;
  health_fund_no: string;
  insurer_no: string;
}

export interface UploadBillingPayload {
  patient: UploadBillingForm;
  data: TImeService[];
  old: boolean;
  file_id?: number;
}

export interface UpdatebillingPayload {
  payload: {
    patient: UploadBillingForm;
    data: TImeService[];
  };
  id: number;
}

export interface UploadFilePayload {
  image: FIleResponse | PickerResponse;
  ocr: number;
}

export interface PickerResponse {
  uri?: string;
  type?: string;
  name?: string;
}

export interface FIleResponse {
  uri: string;
  type: string | null;
  name: string | null;
  size: number | null;
  fileCopyUri: string | null;
}

export type IconType = keyof typeof icons;

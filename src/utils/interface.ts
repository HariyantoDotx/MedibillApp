interface LinksResponse {
  first: string;
  last: string;
  next: string;
  prev: string;
}

interface MetaResponse {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface UserState {
  isLogin: boolean;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface ProfileData {
  code: string;
  created_at: string;
  email: string;
  email_verified_at: string;
  id: number;
  level: string;
  name: string;
  parent_id: null;
  phone: string;
  supervisor_id: null;
  updated_at: string;
}

export interface ProfileState {
  profileData: ProfileData;
}

export interface GetProfileResponse {
  data: ProfileData;
}

export interface BillingData {
  date_of_submissions: string;
  patient_name: string;
  reference_number: string;
}

export interface BillingResponse {
  data: BillingData[];
  links: LinksResponse;
  meta: MetaResponse;
}

export interface ReportData {
  doctor_name: string;
  id: number;
  month: string;
  month_formatted: string;
  pdf_name: string;
  pdf_url: string;
}

export interface ReportResponse {
  data: ReportData[];
  links: LinksResponse;
  meta: MetaResponse;
}

export interface PatientReferraldData {
  address: string | null;
  dob: string | null;
  id: number;
  patient_name: string | null;
}

export interface PatientReferralResponse {
  data: PatientReferraldData[];
}

export interface DetailDetailBillingSheetFile {
  date_of_service: string;
  item_number: string;
  time_of_service: string | null;
}
export interface DetailBillingSheetFile {
  created_at: string;
  expiry_date: string;
  file_name: string;
  handle: string;
  id: number;
  is_archived: number;
  type: string;
  updated_at: string;
  uploaded_by: number;
  url: string;
  user_id: number;
}

export interface CompleteBillingSheetParams {
  id: number | null;
}

interface DetailBillingSheetPatientInvoice {
  amount: number;
  billing_sheet_id: number;
  created_at: string;
  details: Array<DetailDetailBillingSheetFile>;
  doctor_id: number;
  file: any[];
  file_id: number;
  gst: null | string;
  id: number;
  inv_date: null | string;
  invoice_number: string | number;
  pat_num: null | string;
  patient_name: null | string;
  patient_referral_id: number;
  s: null | string;
  serv_date: null | string;
  status: null | string;
  updated_at: string;
}

interface BillingDetail {
  address: null | string;
  dob: null | string;
  health_fund_no: null | string;
  insurer_no: null | string;
  medicare_no: null | string;
  name: string;
  provider_number: null | string;
  referral_date: null | string;
  referral_period: string | null;
  referring_doctor: null | string;
  referring_doctor_id: null | string;
}

interface DetailBillingSheetPatientReferral {
  created_at: string;
  details: BillingDetail;
  doctor_id: number;
  file_id: number;
  formatted_period: string;
  id: number;
  patient_name: string | null;
  period: number;
  provider_number: string | null;
  referral_date: string | null;
  referring_doctor: string | null;
  referring_doctor_id: string | null;
  updated_at: string;
}

export interface DetailBillingSheetResponse {
  data: {
    created_at: string;
    details: Array<DetailDetailBillingSheetFile>;
    doctor_id: number;
    file: DetailBillingSheetFile;
    file_id: number;
    id: number;
    patient_invoice: DetailBillingSheetPatientInvoice;
    patient_referral: DetailBillingSheetPatientReferral;
    patient_referral_id: number;
    processed: 0;
    reference_number: string;
    type: string;
    updated_at: string;
    hospital: string | null
  };

}

export interface DetailParams {
  id: string;
}

export interface DetailPatientReferral {
  data: {
    created_at?: string;
    details: BillingDetail;
    doctor_id?: number;
    file_id?: number;
    formatted_period?: string;
    id: number;
    patient_name?: string;
    period?: number;
    provider_number?: string;
    referral_date?: string;
    referring_doctor?: string;
    referring_doctor_id?: string;
    updated_at?: string;

  };
}

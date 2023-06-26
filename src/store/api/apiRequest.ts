import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {UpdatebillingPayload, UploadBillingPayload} from '../../utils';
import {
  BillingResponse,
  DetailBillingSheetResponse,
  DetailPatientReferral,
  GetProfileResponse,
  PatientReferralResponse,
  ReportResponse,
} from '../../utils';
import {API} from './config';
import {prepareHeaders} from './prepareHeaders';

export const apiRequest = createApi({
  reducerPath: 'apiRequest',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API.url}/api`,
    prepareHeaders: prepareHeaders,
    timeout: 60000,
  }),
  tagTypes: ['USERS', 'BILLING', 'REPORT', 'REFERRAL', 'EXPORT_PDF'],
  endpoints: builder => ({
    getProfile: builder.query<GetProfileResponse, undefined>({
      query: () => '/v1/user',
      providesTags: [{type: 'USERS', id: 'LIST'}],
    }),
    getBillingSheet: builder.query<BillingResponse, {page: number}>({
      query: ({page}) => `/v1/billing-sheet?page=${page}`,
      providesTags: [{type: 'BILLING', id: 'LIST'}],
    }),
    getDetailBillingSheet: builder.query<
      DetailBillingSheetResponse,
      {id: string}
    >({
      query: ({id}) => `/v1/billing-sheet/${id}`,
      providesTags: [{type: 'BILLING', id: 'LIST'}],
    }),
    getDoctorsReport: builder.query<ReportResponse, undefined>({
      query: () => `/v1/doctor-report`,
      providesTags: [{type: 'REPORT', id: 'LIST'}],
    }),
    getPatientReferral: builder.query<PatientReferralResponse, undefined>({
      query: () => `/v1/patient-referral`,
      providesTags: [{type: 'REFERRAL', id: 'LIST'}],
    }),
    uploadBilling: builder.mutation<any, UploadBillingPayload>({
      query: payload => ({
        url: '/v1/billing-sheet',
        method: 'POST',
        body: payload,
      }),
    }),
    updateBilling: builder.mutation<any, UpdatebillingPayload>({
      query: ({id, payload}) => ({
        url: `/v1/billing-sheet/${id}`,
        method: 'PUT',
        body: payload,
      }),
    }),
    getDetailPatientReferral: builder.query<
      DetailPatientReferral,
      {id: number}
    >({
      query: ({id}) => `/v1/patient-referral/${id}`,
      providesTags: [{type: 'REFERRAL', id: 'ITEMS'}],
    }),
    exportBillingToPdf: builder.query<{data: string}, {id: number}>({
      query: ({id}) => `/v1/billing-sheet/manual-export/${id}`,
      providesTags: [{type: 'EXPORT_PDF', id: 'ITEMS'}],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyGetBillingSheetQuery,
  useGetDoctorsReportQuery,
  useGetPatientReferralQuery,
  useGetDetailBillingSheetQuery,
  useUploadBillingMutation,
  useUpdateBillingMutation,
  useGetDetailPatientReferralQuery,
  useLazyExportBillingToPdfQuery,
  useExportBillingToPdfQuery
} = apiRequest;

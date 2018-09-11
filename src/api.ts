import axios, { AxiosError } from 'axios';
import { DatabaseType } from './reducers/database';
import { ReferralType } from './reducers/referral';
import { NotificationType } from './reducers/notification';
import { BaseUserType, UserType } from './reducers/user';

type DatabasesGetResponseType = { email: string, data: DatabaseType[] };
type ReferralsGetResponseType = { payload: ReferralType[] };
type NotificationsGetResponseType = NotificationType[];
type UserGetResponseType = { profile: UserType };
type GetResponseType = DatabasesGetResponseType
  & ReferralsGetResponseType
  & NotificationsGetResponseType
  & UserGetResponseType;

type ReferralGetResponseType = { payload: ReferralType };
type PostResponseType = UserGetResponseType & ReferralGetResponseType;

type PutResponseType = UserGetResponseType;

const apiUrl = 'https://api.lynx.mobi/app';
const httpConfig = {
  headers: {
    // 'Content-type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

const handleError = (error: AxiosError) => {
  console.log('ERROR', error.response.status);

  return Promise.reject(error);
};

const httpGet = (url: string) => axios.get(`${apiUrl}${url}`, httpConfig)
  .then(({ data }): GetResponseType => data)
  .catch(handleError);
const httpPost = (url: string, data?: any) => axios.post(`${apiUrl}${url}`, data, httpConfig)
  .then(({ data }): PostResponseType => data)
  .catch(handleError);
const httpPut = (url: string, data: any) => axios.put(`${apiUrl}${url}`, data, httpConfig)
  .then(({ data }): PutResponseType => data)
  .catch(handleError);
const httpDelete = (url: string) => axios.delete(`${apiUrl}${url}`, httpConfig);

export default {
  getDatabases: (email: string) => httpGet(`/db/${email}`),
  createDatabase: (email: string, db: any) => httpPost(`/db/${email}`, db),
  deleteDatabase: (email: string, dbId: string) => httpDelete(`/db/${email}/${dbId}`),
  getReferrals: (dbId: string) => httpGet(`/ref?did=${dbId}`),
  createReferral: (dbId: string, referral: any) => httpPost(`/ref/${dbId}`, referral),
  getNotifications: (email: string) => httpGet(`/notifications/${email}`),
  getUser: (email: string) => httpGet(`/users/${email}`),
  updateUser: (email: string, user: BaseUserType) => httpPut(`/users/${email}`, user),
};

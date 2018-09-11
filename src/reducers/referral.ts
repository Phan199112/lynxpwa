import { ActionType } from './';
import {
  REFERRALS_SET_SEARCH_TERM,
  REFERRALS_FETCH_SUCCESS,
  // REFERRALS_FETCH_ERROR,
  REFERRAL_CREATE_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';

export type BaseReferralType = {
  name?: string,
  description?: string,
  url?: string,
  target?: string,
  urlParams?: object[],
  substitute?: object[],
};
export type ReferralType = BaseReferralType & { rid: string, did: string, displayURL:string };
export type ReferralStateType = { referrals: ReferralType[], searchTerm: string };

const initialState: ReferralStateType = {
  referrals: [],
  searchTerm: '',
};

export default function logState(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case REFERRALS_SET_SEARCH_TERM:
      return Object.assign({}, state, { searchTerm: payload.searchTerm });

    case REFERRALS_FETCH_SUCCESS:
      return Object.assign({}, state, { referrals: payload.referrals });

    case REFERRAL_CREATE_SUCCESS:
      return Object.assign({}, state, { referrals: state.referrals.concat(payload.referral) });

    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}

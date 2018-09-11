import { Dispatch } from 'redux';
import { ActionType } from '../reducers';
import { BaseReferralType } from '../reducers/referral';
import { ReduxThunkPromiseAction } from './';
import api from '../api';
import * as types from '../constants/actionTypes';

export type SetSearchTermActionType = (searchTerm: string) => ActionType;
export const setSearchTerm: SetSearchTermActionType = searchTerm =>
  ({ type: types.REFERRALS_SET_SEARCH_TERM, payload: { searchTerm } });

export type GetReferralsActionType = (dbId: string) => ReduxThunkPromiseAction;
export const getReferrals: GetReferralsActionType = dbId => (dispatch: Dispatch) => {
  return api.getReferrals(dbId)
    .then(({ payload: referrals }) => dispatch({
      type: types.REFERRALS_FETCH_SUCCESS,
      payload: { referrals },
    }))
    .catch(error => dispatch({ type: types.REFERRALS_FETCH_ERROR, error }));
};

export type CreateReferralActionType = (
  dbId: string,
  referral: BaseReferralType,
) => ReduxThunkPromiseAction;
export const createReferral: CreateReferralActionType = (dbId, referral) => (dispatch: Dispatch) =>
  api.createReferral(dbId, referral)
    .then(({ payload: referral }) => dispatch({
      type: types.REFERRAL_CREATE_SUCCESS, payload: { referral },
    }))
    .catch(error => dispatch({ type: types.REFERRAL_CREATE_ERROR, error }));

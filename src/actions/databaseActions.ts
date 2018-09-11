import { Dispatch } from 'redux';
import { ReduxThunkPromiseAction } from './';
import api from '../api';
import { ActionType } from '../reducers';
import { BaseDatabaseType } from '../reducers/database';
import * as types from '../constants/actionTypes';

export type SelectDatabaseActionType = (databaseId: string) => ActionType;
export const selectDatabase: SelectDatabaseActionType = databaseId =>
  ({ type: types.DATABASE_SELECT, payload: { databaseId } });

export type GetDatabasesActionType = (email: string) => ReduxThunkPromiseAction;
export const getDatabases: GetDatabasesActionType = email => (dispatch: Dispatch) => {
  return api.getDatabases(email)
    .then(databases => dispatch({ type: types.DATABASES_FETCH_SUCCESS, payload: { databases } }))
    .catch(error => dispatch({ type: types.DATABASES_FETCH_ERROR, error }));
};

export type CreateDatabaseActionType = (
  email: string,
  db: BaseDatabaseType,
) => ReduxThunkPromiseAction;
export const createDatabase: CreateDatabaseActionType = (email, db) => (dispatch: Dispatch) =>
  api.createDatabase(email, db)
    .then(database => dispatch({ type: types.DATABASE_CREATE_SUCCESS, payload: { database } }))
    .catch(error => dispatch({ type: types.DATABASE_CREATE_ERROR, error }));

export type DeleteDatabaseActionType = (email: string, dbId: string) => ReduxThunkPromiseAction;
export const deleteDatabase: DeleteDatabaseActionType = (email, dbId) => (dispatch: Dispatch) =>
  api.deleteDatabase(email, dbId)
    .then(() => dispatch({ type: types.DATABASE_DELETE_SUCCESS, payload: { databaseId: dbId } }))
    .catch(error => dispatch({ type: types.DATABASE_DELETE_ERROR, error }));

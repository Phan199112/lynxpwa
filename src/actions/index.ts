import { Dispatch, AnyAction } from 'redux';

export type ReduxThunkPromiseAction = (dispatch: Dispatch) => Promise<AnyAction>;
export type ReduxThunkVoidAction = (dispatch: Dispatch) => void;

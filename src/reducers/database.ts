import { ActionType } from './';
import {
  DATABASES_FETCH_SUCCESS,
  DATABASE_SELECT,
  DATABASE_CREATE_SUCCESS,
  // DATABASES_FETCH_ERROR,
  DATABASE_DELETE_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';

export type BaseDatabaseType = {
  name: string,
  description?: string,
};
export type DatabaseType = { id: string } & BaseDatabaseType;
export type DatabaseStateType = {
  databases: DatabaseType[],
  selectedDatabase: DatabaseType,
  searchTerm: string,
};

const initialState: DatabaseStateType = {
  databases: [],
  selectedDatabase: { id: null, name: '' },
  searchTerm: '',
};

export default function logState(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case DATABASES_FETCH_SUCCESS: {
      const { databases } = payload;
      return Object.assign({}, state, {
        databases,
        selectedDatabase: databases[0] || initialState.selectedDatabase,
      });
    }

    case DATABASE_CREATE_SUCCESS: {
      const databases = state.databases.concat(payload.database);
      const selectedDatabase = databases.length === 1 ? databases[0] : state.selectedDatabase;

      return Object.assign({}, state, { databases, selectedDatabase });
    }

    case DATABASE_SELECT: {
      const selectedDatabase = state.databases.find(({ id }) => id === payload.databaseId);
      return Object.assign({}, state, { selectedDatabase });
    }

    case DATABASE_DELETE_SUCCESS: {
      const databases = state.databases.filter(({ id }) => id !== payload.databaseId);
      const selectedDatabase = payload.databaseId === state.selectedDatabase.id
        ? (databases[0] || initialState.selectedDatabase)
        : state.selectedDatabase;

      return Object.assign({}, state, { databases, selectedDatabase });
    }

    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}

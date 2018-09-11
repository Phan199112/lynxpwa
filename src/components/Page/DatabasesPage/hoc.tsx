import * as React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../../reducers';
import { BaseDatabaseType } from '../../../reducers/database';
import {
  createDatabase,
  CreateDatabaseActionType,
  deleteDatabase,
  DeleteDatabaseActionType,
} from '../../../actions/databaseActions';
import {
  openModal,
  ModalOpenActionType,
  closeModal,
  ModalCloseActionType,
} from '../../../actions/modalActions';
import { default as DatabasesPage } from './component';

type DispatchPropsType = {
  createDatabase: CreateDatabaseActionType,
  deleteDatabase: DeleteDatabaseActionType,
  openModal: ModalOpenActionType,
  closeModal: ModalCloseActionType,
};

type PropsType = DispatchPropsType & StoreStateType;

const DatabasesPageHOC = ({ userState, databaseState, ...props }: PropsType) => {
  const { email } = userState.user;
  const handleCreateClick = () => {
    props.openModal({
      id: 'database',
      actions: {
        onSubmit: (db: BaseDatabaseType) =>
          (props.createDatabase(email, db) as any).then(props.closeModal),
          // (props.createDatabase('sood@digitaldivvy.com', db) as any).then(props.closeModal),
      },
    });
  };

  const handleEditClick = (dbId: string) => {
    console.log('edit', dbId);
  };

  const handleDeleteClick = (dbId: string) => {
    props.deleteDatabase(email, dbId);
    // props.deleteDatabase('sood@digitaldivvy.com', dbId);
  };

  const items = databaseState.databases.filter(({ name }) =>
    (name || '').toLowerCase().indexOf(databaseState.searchTerm.toLowerCase()) > -1);

  return (
    <DatabasesPage
      items={items}
      onCreateClick={handleCreateClick}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
    />
  );
};

export default connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({
    userState: state.userState,
    databaseState: state.databaseState,
  }),
  { createDatabase, deleteDatabase, openModal, closeModal },
)(DatabasesPageHOC);

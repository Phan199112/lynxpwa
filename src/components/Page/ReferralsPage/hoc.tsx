import * as React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../../reducers';
import { BaseReferralType } from '../../../reducers/referral';
import { selectDatabase, SelectDatabaseActionType } from '../../../actions/databaseActions';
import { createReferral, CreateReferralActionType } from '../../../actions/referralActions';
import {
  openModal,
  ModalOpenActionType,
  closeModal,
  ModalCloseActionType,
} from '../../../actions/modalActions';
import { default as ReferralsPage } from './component';

type DispatchPropsType = {
  selectDatabase: SelectDatabaseActionType,
  createReferral: CreateReferralActionType,
  openModal: ModalOpenActionType,
  closeModal: ModalCloseActionType,
};

type PropsType = DispatchPropsType & StoreStateType;

const ReferralsPageHOC = ({ referralState, databaseState, ...props }: PropsType) => {
  const handleCreateClick = () => {
    props.openModal({
      id: 'referral',
      actions: {
        onSubmit: (referral: BaseReferralType) =>
          (props.createReferral(databaseState.selectedDatabase.id, referral) as any)
            .then(props.closeModal),
      },
    });
  };

  // const handleEditClick = (db: ReferralType) => {
  //   console.log('edit', db);
  // };

  // const handleDeleteClick = (db: ReferralType) => {
  //   console.log('delete', db);
  // };

  const { referrals, searchTerm } = referralState;
  const items = referrals.filter(({ name }) =>
    (name || '').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);

  return (
    <ReferralsPage
      items={items}
      databases={databaseState.databases}
      selectedDatabase={databaseState.selectedDatabase}
      onDatabaseSelect={props.selectDatabase}
      onCreateClick={handleCreateClick}
    />
    // onEditClick={handleEditClick}
    // onDeleteClick={handleDeleteClick}
  );
};

export default connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({
    referralState: state.referralState,
    databaseState: state.databaseState,
  }),
  { selectDatabase, createReferral, openModal, closeModal },
)(ReferralsPageHOC);

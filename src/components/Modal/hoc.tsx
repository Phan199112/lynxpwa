import * as React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../reducers';
import { closeModal, ModalCloseActionType } from '../../actions/modalActions';
import DatabaseModal from './DatabaseModal';
import ReferralModal from './ReferralModal';

const modals: any = {
  database: DatabaseModal,
  referral: ReferralModal,
};

type DispatchPropsType = {
  closeModal: ModalCloseActionType,
};

type PropsType = DispatchPropsType & StoreStateType;

const ModalHOC = ({ modalState, ...props }: PropsType) => {
  const { isOpen, id, data, actions } = modalState;

  if (!modals[id]) return null;

  const Modal = modals[id];

  return (
    <Modal
      isOpen={isOpen}
      data={data || {}}
      onClose={props.closeModal}
      {...actions}
    />
  );
};

export default connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({
    modalState: state.modalState,
  }),
  { closeModal },
)(ModalHOC);

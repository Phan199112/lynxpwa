import * as React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../reducers';
import { BaseUserType } from '../../reducers/user';
import { updateUser, UpdateUserActionType } from '../../actions/userActions';
import { default as Profile } from './component';

type DispatchPropsType = {
  updateUser: UpdateUserActionType,
};
type PropsType = StoreStateType & DispatchPropsType;

const ProfileHOC = ({ userState, ...props }: PropsType) => {
  const { email, name, street, city, zip, state, images } = userState.user;
  const profilePicture = images && images.find(({ name }) => name === 'Avatar');

  // const handleFinish = (user: { picture?: File } & UpdateUserType) => {
  const handleFinish = (user: BaseUserType) => {
    const payload = { ...user };

    // if (user.picture) {
    //   delete payload.picture;
    //   payload.images = [{ name: 'Profile', img: user.picture }];
    // }

    props.updateUser(email, payload);
  };

  return (
    <Profile
      isLoading={userState.isLoading}
      name={name}
      avatar=""
      picture={profilePicture && profilePicture.img}
      street={street}
      city={city}
      zip={zip}
      state={state}
      finishButtonClick={handleFinish}
    />
  );
};

export default connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({ userState: state.userState }),
  { updateUser },
)(ProfileHOC);

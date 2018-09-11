import * as React from 'react';
import { GridContainer, GridItem } from '../../Grid';
import Profile from '../../Profile';

const ProfileHOC = () => (
  <GridContainer justify="center">
    <GridItem xs={12} sm={10}>
      <Profile />
    </GridItem>
  </GridContainer>
);

export default ProfileHOC;

import * as React from 'react';
import classnames from 'classnames';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import VerticalNav from '../../VerticalNav';
import { UserType } from '../../../reducers/user';
const avatarPlaceholder = require('../../../../assets/img/default-avatar.png');
import styles from './styles';

const subNavItems = [
  // { name: 'My Profile', mini: 'MP', path: '/profile' },
  { name: 'Logout', mini: 'L', path: '/logout' },
];

type PropsType = {
  bgColor?: string,
  isMiniActive?: boolean,
  user: UserType,
} & WithStyles<typeof styles>;

const SidebarUser = ({ classes, bgColor, user, ...props }: PropsType) => {
  const userWrapperClass = classnames(classes.user, {
    [classes.whiteAfter]: bgColor === 'white',
  });
  const { name, images } = user;
  const userImage = images && images.find(({ name }) => name === 'Avatar');
  const image = userImage ? userImage.img : avatarPlaceholder;
  const items = [{ name: name || 'User Pages', image, subNavItems }];

  return (
    <div className={userWrapperClass}>
      <VerticalNav items={items} {...props} />
    </div>
  );
};

export default withStyles(styles)(SidebarUser);

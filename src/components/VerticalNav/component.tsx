// items example:
// const items = [
//   { name: 'My Profile', icon: DashboardIcon, path: '/profile' },
//   {
//     name: 'Tables',
//     icon: ImageIcon,
//     subNavItems: [
//       { path: '/databases', name: 'Databases', mini: 'DB' },
//     ],
//   },
// ];

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import CollapsibleNav from './CollapsibleNav';
import NavItem from './NavItem';
import { ItemType as VerticalNavItemType } from './';
import styles from './styles';

type PropsType = { items: VerticalNavItemType[] }
  & WithStyles<typeof styles>
  & RouteComponentProps<{ location: Location }>;

const VerticalNav = ({ classes, items, ...props }: PropsType) => (
  <List className={classes.list}>
    {items.map((item: VerticalNavItemType) => (item.subNavItems
      ? <CollapsibleNav {...props} {...item} key={item.path || item.name} />
      : <NavItem {...props} {...item} key={item.path} />
    ))}
  </List>
);

export default withStyles(styles)<PropsType>(VerticalNav);

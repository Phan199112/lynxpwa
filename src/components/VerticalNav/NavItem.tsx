import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { isActiveRoute } from '../../services/HelperService';
import { ColorKeysType } from '../../styles/colors';
import styles from './styles';

export type NavItemType = { path?: string, name: string, icon?: React.ComponentType };
export type PropsType = {
  isMiniActive?: boolean,
  color?: ColorKeysType,
} & NavItemType & WithStyles<typeof styles> & RouteComponentProps<{ location: Location }>;

const VerticalNavItem = ({ classes, path, name, icon: Icon = null, ...props }: PropsType) => {
  const itemTextClassName = classnames(classes.itemText, {
    [classes.itemTextMini]: props.isMiniActive,
  });
  const navLinkClassName = classnames(classes.itemLink, {
    [classes[props.color]]: isActiveRoute(path, props.location),
  });

  return (
    <ListItem className={classes.item}>
      <NavLink to={path} className={navLinkClassName}>
        <ListItemIcon className={classes.itemIcon}>
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={name}
          disableTypography
          className={itemTextClassName}
        />
      </NavLink>
    </ListItem>
  );
};

export default withStyles(styles)(VerticalNavItem);

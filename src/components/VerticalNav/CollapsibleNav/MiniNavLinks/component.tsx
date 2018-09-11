import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { isActiveRoute } from '../../../../services/HelperService';
import { ItemType } from './';
import { ColorKeysType } from '../../../../styles/colors';
import styles from './styles';

export type PropsType = {
  isOpen?: boolean,
  listClassName?: string,
  navLinkClassName?: string,
  color?: ColorKeysType,
  isMiniActive?: boolean,
  items: ItemType[],
} & WithStyles<typeof styles> & RouteComponentProps<{ location: Location }>;

const MiniNavLinks = ({ items, isOpen, classes, location, ...props }: PropsType) => {
  const collapseItemText = classnames(classes.collapseItemText, {
    [classes.collapseItemTextMini]: props.isMiniActive,
  });
  const listClassName = classnames(
    classes.list,
    { [classes.collapseList]: isOpen },
    props.listClassName,
  );

  return (
    <Collapse in={isOpen} unmountOnExit>
      <List className={listClassName}>
        {items.map(({ name, path, mini }: ItemType) => (
          <ListItem className={classes.collapseItem} key={path}>
            <NavLink
              to={path}
              className={classnames(
                classes.itemLink,
                classes.collapseItemLink,
                { [classes[props.color]]: isActiveRoute(path, location) },
                props.navLinkClassName,
              )}
            >
              <span className={classes.collapseItemMini}>{mini}</span>
              <ListItemText
                primary={name}
                disableTypography
                className={collapseItemText}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};

export default withStyles(styles)<PropsType>(MiniNavLinks);

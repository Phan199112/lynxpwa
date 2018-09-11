import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MiniNavLinks, { ItemType } from './MiniNavLinks';
import { isActiveRoute } from '../../../services/HelperService';
import styles from './styles';

type PropsType = {
  isMiniActive?: boolean,
  path?: string,
  name: string,
  subNavItems?: ItemType[],
  image?: string,
  icon?: React.ComponentType,
} & WithStyles<typeof styles> & RouteComponentProps<{ location: Location }>;

type StateType = { isOpen: boolean };

class CollapsibleNav extends React.Component<PropsType, StateType> {
  state = { isOpen: false };

  openToggle = () => this.setState(state => ({ isOpen: !state.isOpen }));

  renderIcon({ icon: Icon, image }: { icon: React.ComponentType, image: string }) {
    const { classes } = this.props;

    if (Icon) {
      return (
        <ListItemIcon className={classes.itemIcon}>
          <Icon />
        </ListItemIcon>
      );
    }

    return (
      <ListItemIcon className={classes.itemIcon}>
        <img src={image} className={classes.avatarImg} alt="..." />
      </ListItemIcon>
    );
  }

  render() {
    const { classes, path, name, subNavItems, image, icon, ...props } = this.props;
    const listItemClassName = classnames(classes.item, {
      [classes.userItem]: image,
    });
    const navLinkClassName = classnames(classes.itemLink, {
      [classes.collapseActive]: isActiveRoute(path, props.location),
      [classes.userCollapseButton]: image,
    });
    const carretClassName = classnames(classes.caret, {
      [classes.caretActive]: this.state.isOpen,
      [classes.userCaret]: image,
    });
    const itemTextClassName = classnames(classes.itemText, {
      [classes.itemTextMini]: props.isMiniActive,
      [classes.userItemText]: image,
    });

    return (
      <ListItem className={listItemClassName}>
        <NavLink
          to="#"
          className={navLinkClassName}
          onClick={this.openToggle}
          onKeyUp={this.openToggle}
        >
          {this.renderIcon({ image, icon })}
          <ListItemText
            primary={<div className={classes.userName}>{name}</div>}
            secondary={<b className={carretClassName} />}
            disableTypography
            className={itemTextClassName}
          />
        </NavLink>
        <MiniNavLinks
          items={subNavItems}
          isOpen={this.state.isOpen}
          {...props}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(CollapsibleNav);

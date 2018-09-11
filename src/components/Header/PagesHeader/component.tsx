import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { default as MonetizationOnIcon } from '@material-ui/icons/MonetizationOn';
import { default as MenuIcon } from '@material-ui/icons/Menu';
import { default as PersonAddIcon } from '@material-ui/icons/PersonAdd';
import { default as FingerprintIcon } from '@material-ui/icons/Fingerprint';
import { default as ExitToAppIcon } from '@material-ui/icons/ExitToApp';
// import { default as GridOnIcon } from '@material-ui/icons/GridOn';
import { default as SwapHorzIcon } from '@material-ui/icons/SwapHoriz';
import Button from '../../Button';
import { isActiveRoute } from '../../../services/HelperService';
const logo  = require('../../../../assets/img/lynx-logo.png');
import styles, { keys } from './styles';

const navItems = [
  { path: '/sign-up', name: 'Sign-up', icon: PersonAddIcon },
  { path: '/home', name: 'Pricing', icon: MonetizationOnIcon },
];
const loggedInNavItems = navItems.concat([
  { path: '/databases', name: 'Redir DB', icon: SwapHorzIcon },
  { path: '/logout', name: 'Logout', icon: ExitToAppIcon },
]);
const loggedOutNavItems = navItems.concat({ path: '/login', name: 'Login', icon: FingerprintIcon });

type NavItemType = { path: string, name: string, icon: React.ComponentType };
type StateType = { pathname: string, open: boolean };
interface PropsType extends WithStyles<typeof styles>, RouteComponentProps<any>  {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  classes: Record<keys, string> & Partial<keys>;
  isLoggedIn?: boolean;
}

class PagesHeader extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = { open: false, pathname: this.props.location.pathname };
  }

  static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType) {
    if (nextProps.location.pathname !== prevState.pathname) {
      return { open: false, pathname: nextProps.location.pathname };
    }

    return null;
  }

  handleDrawerToggle = () => this.setState(state => ({ open: !state.open }));

  renderNavItem = ({ path, name, icon: Icon }: NavItemType) => {
    const { classes, location } = this.props;
    const navLink = classnames(classes.navLink, {
      [classes.navLinkActive]: isActiveRoute(path, location),
    });

    return (
      <ListItem key={path} className={classes.listItem}>
        <NavLink to={path} className={navLink}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={name}
            disableTypography
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    );
  };

  render() {
    const { classes, color, isLoggedIn } = this.props;
    const appBarClasses = classnames({ [classes[color as any]]: !!color });
    const items = isLoggedIn ? loggedInNavItems : loggedOutNavItems;

    const list = (
      <List className={classes.list}>
        {items.map(this.renderNavItem)}
      </List>
    );

    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown implementation="css">
            <div className={classes.flex}>
              <Link to="/" className={classes.logoMini}>
                <img src={logo} alt="logo" className={classes.img} />
              </Link>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Link to="/" className={classes.logoMini}>
                <img src={logo} alt="logo" className={classes.img} />
              </Link>
            </div>
          </Hidden>
          <Hidden smDown implementation="css">
            {list}
          </Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </Button>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor="right"
                open={this.state.open}
                classes={{ paper: classes.drawerPaper }}
                onClose={this.handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PagesHeader);

import * as React from 'react';
import classnames from 'classnames';
import { RouteComponentProps } from 'react-router';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ViewList from '@material-ui/icons/ViewList';
import HeaderLinks from '../HeaderLinks';
import Button from '../../Button';
import { getRouteName } from '../../../services/HelperService';
import styles from './styles';
import { Location } from 'history';

type PropsType = {
  miniActive?: boolean,
  sidebarMinimize: () => void,
  handleDrawerToggle: () => void,
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger',
} & WithStyles<typeof styles> & RouteComponentProps<{ location: Location }>;

const Header = ({ classes, location, color, ...props }: PropsType) => {
  const appBarClasses = classnames({ [classes[color]]: color });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={classes.sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          <Button href="#" className={classes.title} color="transparent">
            {getRouteName(location.pathname)}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp>
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)<PropsType>(Header);

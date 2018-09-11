import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Manager, Target, Popper } from 'react-popper';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// import debounce from 'lodash.debounce';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import { default as ExitToAppIcon } from '@material-ui/icons/ExitToApp';
import { default as NotificationsIcon } from '@material-ui/icons/Notifications';
import { default as MonetizationOnIcon } from '@material-ui/icons/MonetizationOn';
import { default as SearchIcon } from '@material-ui/icons/Search';
import { NotificationType } from '../../../reducers/notification';
import Input from '../../Input';
import Button from '../../Button';
import { isChildOf } from '../../../services/HelperService';
import styles from './styles';

type StateType = { open: boolean, searchTerm: string };

interface PropsType extends WithStyles<typeof styles> {
  searchTerm?: string;
  onSearch: (term: string) => void;
  notifications: NotificationType[];
  onNotificationDismiss: (id: number) => void;
}

const notificationContainerId = 'notificationContainer';

class HeaderLinks extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = { open: false, searchTerm: this.props.searchTerm };
    // this.onSearch = debounce(this.props.onSearch, 1500);
  }

  handleClick = () => this.setState(state => ({ open: !state.open }));

  handleClose = ({ target }: any, notificationId?: number) => {
    if (!isChildOf(target, notificationContainerId)) {
      this.setState({ open: false });
    }

    if (notificationId) {
      this.props.onNotificationDismiss(notificationId);
    }
  };

  handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = target.value;
    this.setState({ searchTerm });
    this.props.onSearch(searchTerm);
    // this.onSearch(searchTerm);
  };

  render() {
    const { classes, notifications } = this.props;
    const { open, searchTerm } = this.state;
    const searchButton = classnames(classes.top, classes.searchButton);

    return (
      <div>
        <Input
          formControlProps={{ className: `${classes.top} ${classes.search}` }}
          inputProps={{
            onChange: this.handleSearch,
            value: searchTerm,
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
              className: classes.searchInput,
            },
          }}
        />
        <Button
          color="white"
          aria-label="edit"
          justIcon
          round
          className={searchButton}
        >
          <SearchIcon className={`${classes.headerLinksSvg} ${classes.searchIcon}`} />
        </Button>
        <Hidden smDown>
          <Button
            color="transparent"
            simple
            aria-label="Home"
            justIcon
            className={classes.buttonLink}
            muiClasses={{ label: '' }}
            component={Link}
            to="/"
          >
            <MonetizationOnIcon
              className={classnames(classes.headerLinksSvg, classes.links)}
            />
          </Button>
        </Hidden>
        <Manager className={classes.managerClasses} id={notificationContainerId}>
          <Target>
            <Button
              color="transparent"
              justIcon
              aria-label="Notifications"
              aria-owns={open ? 'menu-list' : null}
              aria-haspopup
              onClick={this.handleClick}
              className={classes.buttonLink}
              muiClasses={{ label: '' }}
            >
              <NotificationsIcon
                className={classnames(classes.headerLinksSvg, classes.links)}
              />
              <span className={classes.notifications}>{notifications.length}</span>
              <Hidden mdUp>
                <span
                  onClick={this.handleClick}
                  onKeyUp={this.handleClick}
                  className={classes.linkText}
                >
                  {`Notification${notifications.length !== 1 ? 's' : ''}`}
                </span>
              </Hidden>
            </Button>
          </Target>
          {notifications.length ? (
            <Popper
              placement="bottom-start"
              eventsEnabled={open}
              className={classnames(classes.pooperResponsive, { [classes.popperClose]: !open })}
            >
              <ClickAwayListener onClickAway={this.handleClose}>
                <Grow
                  in={open}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Paper className={classes.dropdown} id="menu-list">
                    <MenuList role="menu">
                      {notifications.map(({ id, msg }: NotificationType) => (
                        <MenuItem
                          key={id}
                          onClick={event => this.handleClose(event, id)}
                          className={classes.dropdownItem}
                        >
                          {msg}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Paper>
                </Grow>
              </ClickAwayListener>
            </Popper>
          ) : null
          }
        </Manager>
        <Hidden smDown>
          <Button
            color="transparent"
            aria-label="ExitToApp"
            justIcon
            className={classes.buttonLink}
            muiClasses={{ label: 'logout' }}
            simple
            component={Link}
            to="/logout"
          >
            <ExitToAppIcon
              className={classnames(classes.headerLinksSvg, classes.links)}
            />
          </Button>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HeaderLinks);

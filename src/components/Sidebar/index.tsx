import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { HeaderLinks } from '../Header';
import Scrollbar from '../Scrollbar';
import SidebarLinks from './SidebarLinks';
import SidebarUser from './SidebarUser';
const image = require('../../../assets/img/sidebar-2.jpg');
const logo  = require('../../../assets/img/lynx-logo.png');
import { appTitle } from '../../constants';
import styles, { bgKeysType } from './styles';

type PropsType = {
  bgColor?: 'white' | 'black' | 'blue',
  color?: 'white' | 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'rose',
  handleDrawerToggle: () => void,
  miniActive?: boolean,
  open?: boolean,
} & WithStyles<typeof styles>;
type StateType = { miniActive: boolean };

class Sidebar extends React.Component<PropsType, StateType> {
  state = { miniActive: true };

  renderDrawerContent() {
    const { classes, miniActive, color, bgColor = 'blue' } = this.props;
    const logoNormal = classnames(classes.logoNormal, {
      [classes.logoNormalSidebarMini]: miniActive && this.state.miniActive,
    });
    const logoClasses = classnames(classes.logo, {
      [classes.whiteAfter]: bgColor === 'white',
    });
    const className = classnames(classes.sidebarWrapper, {
      [classes.drawerPaperMini]: miniActive && this.state.miniActive,
    });

    return (
      <React.Fragment>
        <div className={logoClasses}>
          <Link to="/" className={classes.logoMini}>
            <img src={logo} alt="logo" className={classes.img} />
          </Link>
          <Link to="/" className={logoNormal}>{appTitle}</Link>
        </div>
        <Scrollbar className={className}>
          <SidebarUser isMiniActive={miniActive && this.state.miniActive} />
          <Hidden mdUp>
            <HeaderLinks />
          </Hidden>
          <SidebarLinks
            isMiniActive={miniActive && this.state.miniActive}
            color={color}
          />
        </Scrollbar>
        {typeof image === 'undefined'
          ? null
          : (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          )}
      </React.Fragment>
    );
  }

  render() {
    const { classes, bgColor, miniActive } = this.props;
    const drawerPaperClassName = classnames(
      classes.drawerPaper,
      classes[`${bgColor}Background` as bgKeysType],
      { [classes.drawerPaperMini]: miniActive && this.state.miniActive },
    );

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{ paper: drawerPaperClassName }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {this.renderDrawerContent()}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onFocus={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            onBlur={() => this.setState({ miniActive: true })}
            anchor="left"
            variant="permanent"
            open
            classes={{ paper: drawerPaperClassName }}
          >
            {this.renderDrawerContent()}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);

import * as React from 'react';
import classnames from 'classnames';
import { Location } from 'history';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Scrollbar from '../../Scrollbar';
import Sidebar from '../../Sidebar';
import Modal from '../../Modal';
import { Header } from '../../Header';
import Footer from '../../Footer';
import styles from './styles';

type PropsType = { component: React.ComponentType, location: Location }
  & WithStyles<typeof styles>;

type StateType = { miniActive: boolean, pathname: string, mobileOpen: boolean };

class PrivatePage extends React.Component<PropsType, StateType> {
  scrollbar: React.ComponentType;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      mobileOpen: false,
      miniActive: false,
      pathname: this.props.location.pathname,
    };
  }

  componentDidUpdate(nextProps: PropsType, { miniActive }: StateType) {
    if (miniActive !== this.state.miniActive) {
      (this.scrollbar as any).update();
    }
  }

  static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType) {
    if (nextProps.location.pathname !== prevState.pathname) {
      return { mobileOpen: false, pathname: nextProps.location.pathname };
    }

    return null;
  }

  sidebarMinimize = () => this.setState(state => ({ miniActive: !state.miniActive }));

  handleDrawerToggle = () => this.setState(state => ({ mobileOpen: !state.mobileOpen }));

  render() {
    const { classes, component: Component, ...props } = this.props;
    const mainPanelClassName = classnames(classes.mainPanel, {
      [classes.mainPanelSidebarMini]: this.state.miniActive,
    });

    return (
      <div className={classes.wrapper}>
        <Modal />
        <Sidebar
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          miniActive={this.state.miniActive}
          color="orange"
          bgColor="black"
        />
        <Scrollbar
          className={mainPanelClassName}
          scrollbarRef={(el) => { this.scrollbar = el; }}
        >
          <Header
            sidebarMinimize={this.sidebarMinimize}
            miniActive={this.state.miniActive}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              <Component {...props} />
            </div>
          </div>
          <Footer fluid />
        </Scrollbar>
      </div>
    );
  }
}

export default withStyles(styles)(PrivatePage);

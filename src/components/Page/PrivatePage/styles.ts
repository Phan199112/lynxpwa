import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';
import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid,
} from '../../../styles/global';

type StyleKeysType = 'wrapper'
  | 'mainPanel'
  | 'content'
  | 'container'
  | 'mainPanelSidebarMini';

const styles: StyleRulesCallback<StyleKeysType> = (theme: Theme) => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "',
    },
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
  container: { ...containerFluid },
  mainPanelSidebarMini: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerMiniWidth}px)`,
    },
  },
});

export default styles;

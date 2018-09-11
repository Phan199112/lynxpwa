import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';
import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  boxShadow,
  defaultFont,
} from '../../styles/global';

export type bgKeysType = 'blackBackground' | 'blueBackground' | 'whiteBackground';
type StyleKeysType = 'drawerPaper'
  | 'whiteAfter'
  | 'drawerPaperMini'
  | 'whiteAfter'
  | 'logo'
  | 'logoMini'
  | 'logoNormal'
  | 'logoNormalSidebarMini'
  | 'img'
  | 'background'
  | 'sidebarWrapper'
  | bgKeysType;

const styles: StyleRulesCallback<StyleKeysType> = (theme: Theme) => ({
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: 1032,
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    // overflow: 'auto',
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      ...boxShadow,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: 1032,
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: 3,
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      top: '0',
    },
  },
  blackBackground: {
    color: '#FFFFFF',
    '&:after': {
      background: '#000',
      opacity: .8,
    },
  },
  blueBackground: {
    color: '#FFFFFF',
    '&:after': {
      background: '#00acc1',
      opacity: .93,
    },
  },
  whiteBackground: {
    color: '#3C4858',
    '&:after': {
      background: '#FFFFFF',
      opacity: .93,
    },
  },
  whiteAfter: {
    '&:after': {
      backgroundColor: 'hsla(0,0%,71%,.3) !important',
    },
  },
  drawerPaperMini: {
    width: `${drawerMiniWidth}px !important`,
  },
  logo: {
    padding: '15px 0px',
    margin: '0',
    display: 'block',
    position: 'relative',
    zIndex: 4,
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'hsla(0,0%,100%,.3)',
    },
  },
  logoMini: {
    transition: 'all 300ms linear',
    opacity: 1,
    float: 'left',
    textAlign: 'center',
    width: '30px',
    display: 'inline-block',
    maxHeight: '30px',
    marginLeft: '22px',
    marginRight: '18px',
    marginTop: '7px',
    color: 'inherit',
  },
  logoNormal: {
    ...defaultFont,
    transition: 'all 300ms linear',
    display: 'block',
    opacity: 1,
    transform: 'translate3d(0px, 0, 0)',
    textTransform: 'uppercase',
    padding: '5px 0px',
    fontSize: '18px',
    whiteSpace: 'nowrap',
    fontWeight: 400,
    lineHeight: '30px',
    overflow: 'hidden',
    '&,&:hover,&:focus': {
      color: 'inherit',
    },
  },
  logoNormalSidebarMini: {
    opacity: 0,
    transform: 'translate3d(-25px, 0, 0)',
  },
  img: {
    width: '35px',
    verticalAlign: 'middle',
    border: '0',
  },
  background: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    transition: 'all 300ms linear',
  },
  sidebarWrapper: {
    position: 'relative',
    height: 'calc(100vh - 75px)',
    overflow: 'auto',
    width: '260px',
    zIndex: 4,
    overflowScrolling: 'touch',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    color: 'inherit',
    paddingBottom: '30px',
  },
});

export default styles;

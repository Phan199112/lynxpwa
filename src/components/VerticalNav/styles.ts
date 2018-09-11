import { StyleRules } from '@material-ui/core/styles/withStyles';
import { defaultFont } from '../../styles/global';
import colors, { ColorKeysType } from '../../styles/colors';
import list from '../../styles/list';

export type NavStyleKeysType = 'list'
  | 'item'
  | 'itemIcon'
  | 'itemText'
  | 'itemTextMini'
  | 'itemLink'
  | ColorKeysType;

const styles: StyleRules<NavStyleKeysType> = {
  list,
  item: {
    color: 'inherit',
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    margin: '0',
    padding: '0',
  },
  itemIcon: {
    color: 'inherit',
    width: '30px',
    height: '24px',
    float: 'left',
    position: 'inherit',
    top: '3px',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    opacity: .8,
  },
  itemText: {
    color: 'inherit',
    ...defaultFont,
    margin: '0',
    lineHeight: '30px',
    fontSize: '14px',
    transform: 'translate3d(0px, 0, 0)',
    opacity: 1,
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    position: 'relative',
    display: 'block',
    height: 'auto',
    whiteSpace: 'nowrap',
  },
  itemTextMini: {
    transform: 'translate3d(-25px, 0, 0)',
    opacity: 0,
  },
  itemLink: {
    paddingLeft: '10px',
    paddingRight: '10px',
    transition: 'all 300ms linear',
    margin: '10px 15px 0',
    borderRadius: '3px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    backgroundColor: 'transparent',
    ...defaultFont,
    width: 'auto',
    '&:hover': {
      outline: 'none',
      backgroundColor: 'rgba(200, 200, 200, 0.2)',
      boxShadow: 'none',
    },
    '&,&:hover,&:focus': {
      color: 'inherit',
    },
  },
  ...colors,
};

export default styles;

import { StyleRules } from '@material-ui/core/styles/withStyles';
import { defaultFont } from '../../../../styles/global';
import { default as navStyles, NavStyleKeysType } from '../../styles';

export type StyleKeysType = 'list'
  | 'collapseList'
  | 'collapseItem'
  | 'collapseItemLink'
  | 'collapseItemMini'
  | 'collapseItemText'
  | 'collapseItemTextMini';

const styles: StyleRules<StyleKeysType | NavStyleKeysType> = {
  ...navStyles,
  collapseList: {
    marginTop: '0',
  },
  collapseItem: {
    position: 'relative' as 'relative',
    display: 'block',
    textDecoration: 'none',
    margin: '10px 0 0 0',
    padding: '0',
  },
  collapseItemLink: {
    transition: 'all 300ms linear',
    margin: '0 15px',
    borderRadius: '3px',
    position: 'relative' as 'relative',
    display: 'block',
    padding: '10px',
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
  collapseItemMini: {
    color: 'inherit',
    ...defaultFont,
    textTransform: 'uppercase',
    width: '30px',
    marginRight: '15px',
    textAlign: 'center',
    letterSpacing: '1px',
    position: 'relative' as 'relative',
    float: 'left',
    display: 'inherit',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    fontSize: '14px',
  },
  collapseItemText: {
    color: 'inherit',
    ...defaultFont,
    margin: 0,
    position: 'relative' as 'relative',
    transform: 'translateX(0px)',
    opacity: 1,
    whiteSpace: 'nowrap',
    display: 'block',
    transition: 'transform 300ms ease 0s, opacity 300ms ease 0s',
    fontSize: '14px',
  },
  collapseItemTextMini: {
    transform: 'translate3d(-25px, 0, 0)',
    opacity: 0,
  },
};

export default styles;

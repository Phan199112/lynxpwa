import { StyleRules } from '@material-ui/core/styles/withStyles';
import { boxShadow } from '../../../styles/global';
import { default as navStyles, NavStyleKeysType } from '../styles';

export type StyleKeysType = 'userItem'
  | 'userItemText'
  | 'userName'
  | 'collapseActive'
  | 'caret'
  | 'userCaret'
  | 'caretActive'
  | 'avatarImg'
  | 'userCollapseButton';

const styles: StyleRules<StyleKeysType | NavStyleKeysType> = {
  ...navStyles,
  userItem: {
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  userItemText: {
    lineHeight: '22px',
    whiteSpace: 'normal',
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginRight: '13px',
  },
  collapseActive: {
    outline: 'none',
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    boxShadow: 'none',
  },
  caret: {
    marginTop: '13px',
    position: 'absolute',
    right: '18px',
    transition: 'all 150ms ease-in',
    display: 'inline-block',
    width: '0',
    height: '0',
    marginLeft: '2px',
    verticalAlign: 'middle',
    borderTop: '4px solid',
    borderRight: '4px solid transparent',
    borderLeft: '4px solid transparent',
  },
  userCaret: {
    marginTop: '1px !important',
  },
  caretActive: {
    transform: 'rotate(180deg)',
  },
  avatarImg: {
    transition: 'all 300ms linear',
    width: '34px',
    height: '34px',
    overflow: 'hidden',
    border: '0',
    borderRadius: '50%',
    marginLeft: '10px',
    marginRight: '-5px',
    top: 0,
    ...boxShadow,
  },
  userCollapseButton: {
    margin: '0',
    padding: '6px 15px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: 'none',
    },
  },
};

export default styles;

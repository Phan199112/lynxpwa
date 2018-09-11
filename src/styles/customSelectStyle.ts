import { orangeColor, orangeBoxShadow } from './global';
import {
  TextTransformProperty,
  BoxSizingProperty,
  TextAlignProperty,
  ClearProperty,
  WhiteSpaceProperty,
} from 'csstype';

export type SelectKeysType = 'select'
  | 'selectFormControl'
  | 'selectLabel'
  | 'selectMenu'
  | 'selectMenuItem'
  | 'selectMenuItemSelected'
  | 'selectPaper';

const customSelectStyle = {
  select: {
    padding: '12px 25px 7px 0',
    fontSize: '.75rem',
    fontWeight: 400,
    lineHeight: 1.42857,
    textDecoration: 'none',
    textTransform: 'uppercase' as TextTransformProperty,
    color: '#3C4858',
    letterSpacing: 0,
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&[aria-owns] + input + svg': {
      transform: 'rotate(180deg)',
    },
    '& + input + svg': {
      transition: 'all 300ms linear',
    },
  },
  selectFormControl: {
    margin: '7px 1px 10px 0px !important',
    '& > div': {
      '&:before': {
        borderColor: '#D2D2D2 !important',
        borderWidth: '1px !important',
      },
      '&:after': {
        borderColor: orangeColor,
      },
    },
  },
  selectLabel: {
    fontSize: '12px',
    textTransform: 'uppercase' as TextTransformProperty,
    color: '#3C4858 !important',
    top: '8px',
  },
  selectMenu: {
    '& > div > ul': {
      border: '0',
      padding: '5px 0',
      margin: '0',
      boxShadow: 'none',
      minWidth: '100%',
      borderRadius: '4px',
      boxSizing: 'border-box' as BoxSizingProperty,
      display: 'block',
      fontSize: '14px',
      textAlign: 'left' as TextAlignProperty,
      listStyle: 'none',
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
    },
    '& > div + div': {
      maxHeight: '266px !important',
    },
  },
  selectMenuItem: {
    fontSize: '13px',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '2px',
    transition: 'all 150ms linear',
    display: 'block',
    clear: 'both' as ClearProperty,
    fontWeight: 400,
    lineHeight: 2,
    whiteSpace: 'nowrap' as WhiteSpaceProperty,
    color: '#333',
    '&:hover': {
      backgroundColor: orangeColor,
      color: '#FFFFFF',
      ...orangeBoxShadow,
    },
  },
  selectMenuItemSelected: {
    backgroundColor: `${orangeColor} !important`,
    color: '#FFFFFF',
  },
  selectPaper: {
    boxSizing: 'borderBox' as BoxSizingProperty,
    borderRadius: '4px',
    padding: '0',
    minWidth: '100%',
    display: 'block',
    border: '0',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    backgroundClip: 'padding-box',
    margin: '2px 0 0',
    fontSize: '14px',
    textAlign: 'left' as TextAlignProperty,
    listStyle: 'none',
    backgroundColor: 'transparent',
    maxHeight: '266px',
  },
};

export default customSelectStyle;

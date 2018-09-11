import { ClearProperty } from 'csstype';

export default {
  marginTop: '15px',
  paddingLeft: '0',
  paddingTop: '0',
  paddingBottom: '0',
  marginBottom: '0',
  listStyle: 'none',
  color: 'inherit',
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both' as ClearProperty,
  },
};

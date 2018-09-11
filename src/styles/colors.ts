import {
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
} from './global';

export type ColorKeysType = 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'white' | 'rose';

export default {
  purple: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: primaryColor,
      ...primaryBoxShadow,
    },
  },
  blue: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: infoColor,
      boxShadow: `0 12px 20px -10px rgba(0,188,212,.28),
        0 4px 20px 0 rgba(0,0,0,.12),
        0 7px 8px -5px rgba(0,188,212,.2)`,
    },
  },
  green: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: successColor,
      boxShadow: `0 12px 20px -10px rgba(76,175,80,.28),
        0 4px 20px 0 rgba(0,0,0,.12),
        0 7px 8px -5px rgba(76,175,80,.2)`,
    },
  },
  orange: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: warningColor,
      boxShadow: `0 12px 20px -10px rgba(255,152,0,.28),
        0 4px 20px 0 rgba(0,0,0,.12),
        0 7px 8px -5px rgba(255,152,0,.2)`,
    },
  },
  red: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: dangerColor,
      boxShadow: `0 12px 20px -10px rgba(244,67,54,.28),
        0 4px 20px 0 rgba(0,0,0,.12),
        0 7px 8px -5px rgba(244,67,54,.2)`,
    },
  },
  white: {
    '&,&:hover,&:focus': {
      color: '#3C4858',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(60,72,88,.4)',
    },
  },
  rose: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF',
      backgroundColor: roseColor,
      boxShadow: '0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(233,30,99,.4)',
    },
  },
};

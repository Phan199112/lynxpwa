import { StyleRules } from '@material-ui/core/styles/withStyles';

type StyleKeysType = 'whiteAfter' | 'user';

const styles: StyleRules<StyleKeysType> = {
  whiteAfter: {
    '&:after': {
      backgroundColor: 'hsla(0,0%,71%,.3) !important',
    },
  },
  user: {
    paddingBottom: '7px',
    margin: '5px auto 0',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      right: '15px',
      height: '1px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'hsla(0,0%,100%,.3)',
    },
  },
};

export default styles;

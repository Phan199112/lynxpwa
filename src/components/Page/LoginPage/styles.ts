import { StyleRules } from '@material-ui/core/styles/withStyles';
import { container, cardTitle } from '../../../styles/global';

type StyleKeysType = 'container'
  | 'cardTitle'
  | 'textCenter'
  | 'content'
  | 'justifyContentCenter'
  | 'customButtonClass'
  | 'inputAdornment'
  | 'inputAdornmentIcon'
  | 'cardHidden'
  | 'cardHeader'
  | 'socialLine';

const styles: StyleRules<StyleKeysType> = {
  container,
  cardTitle: {
    ...cardTitle,
    color: '#FFFFFF',
  },
  textCenter: {
    textAlign: 'center',
  },
  content: {
    paddingTop: '18vh',
    minHeight: 'calc(100vh - 80px)',
    position: 'relative',
    zIndex: 4,
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: '#FFFFFF',
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    // marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  cardHidden: {
    opacity: 0,
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
};

export default styles;

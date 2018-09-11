import { StyleRules } from '@material-ui/core/styles/withStyles';
import {
  container,
  defaultFont,
  cardTitle,
  roseColor,
} from '../../../styles/global';

type StyleKeysType = 'content'
  | 'container'
  | 'title'
  | 'description'
  | 'cardTitle'
  | 'cardTitleWhite'
  | 'cardDescription'
  | 'cardCategory'
  | 'cardCategoryWhite'
  | 'icon'
  | 'iconWhite'
  | 'iconRose'
  | 'marginTop30';

const styles: StyleRules<StyleKeysType> = {
  content: {
    minHeight: 'calc(100vh - 80px)',
    position: 'relative',
    zIndex: 4,
  },
  container: {
    ...container,
  },
  title: {
    ...defaultFont,
    color: '#FFFFFF',
    marginTop: '13vh',
    marginBottom: '30px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardTitle: {},
  cardTitleWhite: {
    ...cardTitle,
    color: '#FFFFFF !important',
  },
  cardDescription: {},
  cardCategory: {
    color: '#999999',
    marginTop: '10px',
  },
  cardCategoryWhite: {
    color: '#FFFFFF',
    marginTop: '10px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.76)',
    margin: '10px auto 0',
    width: '130px',
    height: '130px',
    border: '1px solid #E5E5E5',
    borderRadius: '50%',
    lineHeight: '174px',
    '& svg': {
      width: '55px',
      height: '55px',
    },
  },
  iconWhite: {
    color: '#FFFFFF',
  },
  iconRose: {
    color: roseColor,
  },
  marginTop30: {
    marginTop: '30px',
  },
};

export default styles;

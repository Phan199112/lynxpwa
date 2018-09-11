import { StyleRules } from '@material-ui/core/styles/withStyles';
import {
  ColorsType,
  grayColor,
  colors,
} from '../../styles/global';

export type StyleKeysType = 'infoArea'
  | 'iconWrapper'
  | 'icon'
  | 'description'
  | 'descriptionWrapper'
  | 'title';

const styles: StyleRules<StyleKeysType | ColorsType> = {
  infoArea: {
    maxWidth: '360px',
    margin: '0 auto',
    padding: '0px',
  },
  iconWrapper: {
    float: 'left',
    marginTop: '24px',
    marginRight: '10px',
  },
  icon: {
    width: '36px',
    height: '36px',
  },
  descriptionWrapper: {
    color: grayColor,
    overflow: 'hidden',
  },
  title: {
    color: '#3C4858',
    margin: '30px 0 15px',
    textDecoration: 'none',
    fontSize: '18px',
  },
  description: {
    color: grayColor,
    overflow: 'hidden',
    marginTop: '0px',
    fontSize: '14px',
  },
  ...colors,
};

export default styles;

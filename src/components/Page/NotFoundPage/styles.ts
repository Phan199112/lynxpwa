import { StyleRules } from '@material-ui/core/styles/withStyles';
import { orangeColor } from '../../../styles/global';

type StyleKeysType = 'number' | 'mainMessage';

const styles: StyleRules<StyleKeysType> = {
  number: {
    color: orangeColor,
    fontSize: '150px',
    fontWeight: 500,
    lineHeight: 1,
  },
  mainMessage: {
    fontSize: '2rem',
    fontWeight: 500,
    marginBottom: '60px',
  },
};

export default styles;

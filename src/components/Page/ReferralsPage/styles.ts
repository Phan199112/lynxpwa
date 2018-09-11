import { StyleRules } from '@material-ui/core/styles/withStyles';
import {
  default as customSelectStyle,
  SelectKeysType,
} from '../../../styles/customSelectStyle';

type StyleKeysType = 'header' | 'dbSelect' | 'dbSelectLabel';

const styles: StyleRules<StyleKeysType | SelectKeysType> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  dbSelect: {
  },
  dbSelectLabel: {
    whiteSpace: 'nowrap',
  },
  ...customSelectStyle,
};

export default styles;

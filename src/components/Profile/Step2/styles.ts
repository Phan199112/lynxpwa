import { StyleRules } from '@material-ui/core/styles/withStyles';
import {
  default as customSelectStyle,
  SelectKeysType,
} from '../../../styles/customSelectStyle';
import {
  default as customCheckboxRadioSwitch,
  CheckboxRadioSwitchStyleKeysType,
} from '../../../styles/customCheckboxRadioSwitch';

export type StyleKeysType = 'infoText' | 'inputAdornmentIcon' | 'choiche';

const styles: StyleRules<StyleKeysType | SelectKeysType | CheckboxRadioSwitchStyleKeysType> = {
  infoText: {
    fontWeight: 300,
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  choiche: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px',
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

export default styles;

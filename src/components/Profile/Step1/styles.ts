import { StyleRules } from '@material-ui/core/styles/withStyles';
import {
  default as customCheckboxRadioSwitch,
  CheckboxRadioSwitchStyleKeysType,
} from '../../../styles/customCheckboxRadioSwitch';

export type StyleKeysType = 'infoText'
  | 'inputAdornmentIcon'
  | 'inputAdornment'
  | 'avatarsContainer'
  | 'avatars'
  | 'avatarCheckbox';

const styles: StyleRules<StyleKeysType | CheckboxRadioSwitchStyleKeysType> = {
  infoText: {
    fontWeight: 300,
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  inputAdornment: {
    position: 'relative',
  },
  avatarsContainer: {
    textAlign: 'center',
  },
  avatars: {
    display: 'flex',
    margin: '20px',
    justifyContent: 'space-evenly',
  },
  avatarCheckbox: {
    height: '80px !important',
    width: '80px !important',
    '& > span:first-child': {
      height: '100%',
    },
  },
  ...customCheckboxRadioSwitch,
};

export default styles;

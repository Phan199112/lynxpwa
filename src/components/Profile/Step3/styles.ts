import { StyleRules } from '@material-ui/core/styles/withStyles';

export type StyleKeysType = 'infoText';

const styles: StyleRules<StyleKeysType> = {
  infoText: {
    fontWeight: 300,
    margin: '10px 0 30px',
    textAlign: 'center',
  },
};

export default styles;

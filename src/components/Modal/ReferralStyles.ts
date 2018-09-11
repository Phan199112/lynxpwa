import { StyleRules } from '@material-ui/core/styles/withStyles';

type StyleKeysType = 'inputGroup' | 'inputGroupName' | 'inputRow' | 'input';

const styles: StyleRules<StyleKeysType> = {
  inputGroup: {
    margin: '30px 0',
  },
  inputGroupName: {
    marginBottom: '20px',
    fontSize: '16px',
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  input: {
    flexBasis: '47%',
  },
};

export default styles;

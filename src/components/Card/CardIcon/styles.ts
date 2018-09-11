import { StyleRules } from '@material-ui/core/styles/withStyles';
import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  orangeCardHeader,
} from '../../../styles/global';

const type = [
  '&$warningCardHeader',
  '&$successCardHeader',
  '&$dangerCardHeader',
  '&$infoCardHeader',
  '&$primaryCardHeader',
  '&$roseCardHeader',
  '&$orangeCardHeader',
].join(',');
const cardIconStyle = {
  cardIcon: {
    [type]: {
      borderRadius: '3px',
      backgroundColor: '#999',
      padding: '15px',
      marginTop: '-20px',
      marginRight: '15px',
      float: 'left',
    },
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  orangeCardHeader,
};

export default cardIconStyle as StyleRules;

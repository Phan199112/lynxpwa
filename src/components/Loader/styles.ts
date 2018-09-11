import { StyleRules } from '@material-ui/core/styles/withStyles';
import { orangeColor } from '../../styles/global';

const styles = {
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    textAlign: 'center',
    display: 'none',
    zIndex: 500,
  },
  fullHeight: {
    height: '100%',
    alignItems: 'center',
  },
  visible: {
    display: 'flex',
    justifyContent: 'center',
  },
  spinner: {
    color: orangeColor,
    width: '44px',
    height: '44px',
  },
};

export default styles as StyleRules;

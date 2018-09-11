import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';

interface PropsType {
  classes: MapInterface<string>;
  isVisible?: boolean;
  isFullHeight?: boolean;
  containerClassName?: string;
  spinnerClassName?: string;
}

const Loader = (props: PropsType) => {
  const { classes, isFullHeight, isVisible, containerClassName, spinnerClassName } = props;
  const containerClassNames = [classes.container, containerClassName];
  if (isFullHeight) containerClassNames.push(classes.fullHeight);
  if (isVisible) containerClassNames.push(classes.visible);

  const spinnerClassNames = [classes.spinner, spinnerClassName];
  if (isFullHeight) spinnerClassNames.push(classes.fullHeight);

  return (
    <div className={containerClassNames.join(' ')}>
      <CircularProgress className={spinnerClassNames.join(' ')} size={50} />
    </div>
  );
};

export default withStyles(styles)(Loader);

import * as React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

interface TypographyInterface {
  children: JSX.Element | string;
  classes: MapInterface<string>;
  type: string;
}

const Typography = ({ classes, type, children }: TypographyInterface) => (
  <div className={classnames(classes.defaultFontStyle, classes[`${type}Text`])}>
    {children}
  </div>
);

export default withStyles(styles)(Typography);

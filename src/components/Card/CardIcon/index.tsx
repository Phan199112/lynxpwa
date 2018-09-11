import * as React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

interface CardIconInterface {
  children: JSX.Element;
  classes: MapInterface<string>;
  className?: string;
  color?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose' | 'orange';
}

const CardIcon = (props: CardIconInterface) => {
  const { classes, className, children, color, ...rest } = props;
  const cardIconClasses = classnames({
    [classes.cardIcon]: true,
    [classes[`${color}CardHeader`]]: color,
    [className]: className !== undefined,
  });

  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(styles)(CardIcon);

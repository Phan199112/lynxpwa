import * as React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

interface CardTextInterface {
  children: JSX.Element;
  classes: MapInterface<string>;
  className?: string;
  color?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
}

const CardText = (props: CardTextInterface) => {
  const { classes, className, children, color, ...rest } = props;
  const cardTextClasses = classnames({
    [classes.cardText]: true,
    [classes[`${color}CardHeader`]]: color,
    [className]: className !== undefined,
  });

  return (
    <div className={cardTextClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(styles)(CardText);

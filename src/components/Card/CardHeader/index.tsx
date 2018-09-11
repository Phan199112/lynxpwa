import * as React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

interface CardHeaderInterface {
  children: JSX.Element | JSX.Element[];
  classes: MapInterface<string>;
  className?: string;
  color?: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose' | 'orange';
  plain?: boolean;
  image?: boolean;
  contact?: boolean;
  signup?: boolean;
  stats?: boolean;
  icon?: boolean;
  text?: boolean;
}

const CardHeader = (props: CardHeaderInterface) => {
  const {
    classes,
    className,
    children,
    color,
    plain,
    image,
    contact,
    signup,
    stats,
    icon,
    text,
    ...rest
  } = props;
  const cardHeaderClasses = classnames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderImage]: image,
    [classes.cardHeaderContact]: contact,
    [classes.cardHeaderSignup]: signup,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [classes.cardHeaderText]: text,
    [className]: className !== undefined,
  });

  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(styles)(CardHeader);

import * as React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import { default as MuiButton } from '@material-ui/core/Button';
import styles from './styles';

interface ButtonInterface {
  classes: MapInterface<string>;
  children: JSX.Element | string | (string | JSX.Element)[];
  color?: 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'orange'
    | 'white'
    | 'twitter'
    | 'facebook'
    | 'google'
    | 'linkedin'
    | 'pinterest'
    | 'youtube'
    | 'tumblr'
    | 'github'
    | 'behance'
    | 'dribbble'
    | 'reddit'
    | 'transparent';
  size?: 'sm' | 'lg';
  type?: string;
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  className?: string;
  muiClasses?: {};
  onClick?: (event: React.SyntheticEvent) => void;
  href?: string;
  to?: string;
  component?: React.ComponentType;
}

const Button = (props: ButtonInterface) => {
  const {
    classes,
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classnames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });

  return (
    <MuiButton {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </MuiButton>
  );
};

export default withStyles(styles)(Button);

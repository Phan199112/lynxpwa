import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import styles from './styles';

interface CardInterface {
  classes: MapInterface<string>;
  children: JSX.Element | JSX.Element[];
  className?: string;
  plain?: boolean;
  profile?: boolean;
  blog?: boolean;
  raised?: boolean;
  background?: boolean;
  pricing?: boolean;
  testimonial?: boolean;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'rose';
  product?: boolean;
  chart?: boolean;
  login?: boolean;
}

const Card = (props: CardInterface) => {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color,
    product,
    testimonial,
    chart,
    login,
    ...rest
  } = props;
  const cardClasses = classnames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color]]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
    [className]: className !== undefined,
  });

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

export default withStyles(styles)(Card);

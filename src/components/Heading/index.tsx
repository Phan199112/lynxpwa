import * as React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

interface HeadingInterface {
  classes: MapInterface<string>;
  title?: JSX.Element | string;
  category?: JSX.Element | string;
  textAlign: 'right' | 'left' | 'center';
}

const Heading = ({ textAlign, category, title, classes }: HeadingInterface) => {
  const heading = classnames(classes.heading, {
    [classes[`${textAlign}TextAlign`]]: textAlign,
  });

  if (title || category) {
    return (
      <div className={heading}>
        {title ? <h3 className={classes.title}>{title}</h3> : null}
        {category ? <p className={classes.category}>{category}</p> : null}
      </div>
    );
  }

  return null;
};

export default withStyles(styles)(Heading);

import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid, { GridProps } from '@material-ui/core/Grid';

interface GridContainerInterface {
  classes: MapInterface<string>;
  children: JSX.Element | JSX.Element[];
  className?: string;
  fullscreen?: boolean;
  justify?: string;
  alignItems?: string;
  direction?: string;
}

const style = {
  grid: {
    margin: '0 -15px',
    width: 'calc(100% + 30px)',
  },
  fullscreen: { height: '100vh' },
};

const GridContainer = (props: GridContainerInterface) => {
  const { classes, children, fullscreen, className, ...rest } = props;

  return (
    <Grid
      container
      {...rest as GridProps}
      className={`${classes.grid} ${className} ${fullscreen ? classes.fullscreen : ''}`}
    >
      {children}
    </Grid>
  );
};

export default withStyles(style)(GridContainer);

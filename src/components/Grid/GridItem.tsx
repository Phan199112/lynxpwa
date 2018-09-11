import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

type SizeType = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface GridItemInterface {
  classes: MapInterface<string>;
  className?: string;
  children: JSX.Element | JSX.Element[];
  xs?: SizeType;
  sm?: SizeType;
  md?: SizeType;
  lg?: SizeType;
}

const style = {
  grid: { padding: '0 15px !important' },
};

const GridItem = (props: GridItemInterface) => {
  const { classes, children, className, ...rest } = props;

  return (
    <Grid item {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  );
};

export default withStyles(style)(GridItem);

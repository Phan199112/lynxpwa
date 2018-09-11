import * as React from 'react';
import { Link } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '../../Button';
import { GridContainer, GridItem } from '../../Grid';
import styles from './styles';

const NotFoundPage = ({ classes }: WithStyles<typeof styles>) => (
  <GridContainer justify="center" alignItems="center" fullscreen>
    <GridItem xs={11} sm={8} md={6}>
      <div className={classes.number}>404</div>
      <div className={classes.mainMessage}>Page Not Found...</div>
      <Button color="orange" simple component={Link} to="/">Go to Home Page</Button>
    </GridItem>
  </GridContainer>
);

export default withStyles(styles)(NotFoundPage);

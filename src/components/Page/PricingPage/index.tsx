import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Weekend from '@material-ui/icons/Weekend';
import Home from '@material-ui/icons/Home';
import Business from '@material-ui/icons/Business';
import AccountBalance from '@material-ui/icons/AccountBalance';
import { GridContainer, GridItem } from '../../Grid';
import Button from '../../Button';
import { Card, CardBody } from '../../Card';
import styles from './styles';

type PropsType = WithStyles<typeof styles>;

const PricingPage = ({ classes }: PropsType) => (
  <div className={classes.content}>
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <h2 className={classes.title}>Pick the best plan for you</h2>
          <h5 className={classes.description}>
            If you have any questions please contact us.
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={3}>
          <Card pricing plain>
            <CardBody pricing plain>
              <h6 className={classes.cardCategory}>Free Trial</h6>
              <div className={classes.icon}>
                <Weekend className={classes.iconWhite} />
              </div>
              <h3
                className={`${classes.cardTitleWhite} ${classes.marginTop30}`}
              >
                FREE TRIAL
              </h3>
              <p className={classes.cardCategory}>
                The free tier is limited to all the features for one week with SILVER throttles.
              </p>
              <Button round color="white">
                Choose plan
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card pricing raised>
            <CardBody pricing>
              <h6 className={classes.cardCategory}>SILVER</h6>
              <div className={classes.icon}>
                <Home className={classes.iconRose} />
              </div>
              <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                $69
              </h3>
              <p className={classes.cardDescription}>
                1 Database 10 lynx. 100 redirects daily.
              </p>
              <Button round color="rose">
                Choose plan
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card pricing plain>
            <CardBody pricing plain>
              <h6 className={classes.cardCategory}>GOLD</h6>
              <div className={classes.icon}>
                <Business className={classes.iconWhite} />
              </div>
              <h3
                className={`${classes.cardTitleWhite} ${
                  classes.marginTop30
                }`}
              >
                $99
              </h3>
              <p className={classes.cardCategory}>
              5 Database 50 lynx per database. 1000 redirects daily.
              </p>
              <Button round color="white">
                Choose plan
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Card pricing plain>
            <CardBody pricing plain>
              <h6 className={classes.cardCategory}>PLATINUM</h6>
              <div className={classes.icon}>
                <AccountBalance className={classes.iconWhite} />
              </div>
              <h3
                className={`${classes.cardTitleWhite} ${
                  classes.marginTop30
                }`}
              >
                $159
              </h3>
              <p className={classes.cardCategory}>
              50 Database 500 lynx per database. 10000 redirects daily. Team share.
              </p>
              <Button round color="white">
                Choose plan
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  </div>
);

export default withStyles(styles)(PricingPage);

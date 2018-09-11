import * as React from 'react';
import { Route } from 'react-router-dom';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { NotFoundPage } from '../../Page';
import { PagesHeader } from '../../Header';
import Footer from '../../Footer';
const bgImage = require('../../../../assets/img/register.jpeg');
import '../../../styles/material-dashboard-pro-react.css';
import styles from './styles';

type PublicRoutePropsType = { path?: string, component: React.ComponentType };
type PublicComponentPropsType = { component: React.ComponentType<any> } & WithStyles<typeof styles>;

const PublicComponent = withStyles(styles)((props: PublicComponentPropsType) => {
  const { classes, theme, component: Component, ...restProps } = props;

  return (
    <div>
      <PagesHeader />
      <div className={classes.wrapper}>
        <div className={classes.fullPage}>
          <Component {...restProps} />
          <Footer white />
          <div
            className={classes.fullPageBackground}
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        </div>
      </div>
    </div>
  );
});

const getPublicComponent = (component: React.ComponentType) => (props: any) => (
  <PublicComponent component={component} {...props} />
);

const PublicRoute = ({ path, component }: PublicRoutePropsType) => {
  if (!path) return <Route component={NotFoundPage} />;

  return <Route path={path} render={getPublicComponent(component)} />;
};

export default PublicRoute;

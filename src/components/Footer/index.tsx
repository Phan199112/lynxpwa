import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { appTitle } from '../../constants';
import styles from './styles';

interface FooterInterface {
  classes: MapInterface<string>;
  fluid?: boolean;
  white?: boolean;
}

const Footer = ({ classes, fluid, white }: FooterInterface) => {
  const container = classnames({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  const anchor = classnames(classes.a, { [classes.whiteColor]: white });
  const block = classnames(classes.block, {
    [classes.whiteColor]: white,
  });

  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
        {/*
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/databases" className={block}>Databases</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/#" className={block}>Some external url</a>
            </ListItem>
          </List>
        */}
        </div>
        <p className={classes.right}>
          &copy; {`${new Date().getFullYear()} `}
          <Link to="/" className={anchor}>
            {appTitle}
          </Link>
          , owned and operated by Digital Divvy LLC.
        </p>
      </div>
    </footer>
  );
};

export default withStyles(styles)(Footer);

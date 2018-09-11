import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import styles from './styles';

type PropsType = {
  icon: React.ComponentType<any>,
  title: string,
  description: string,
  iconColor?: 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose' | 'gray',
};

const InfoArea = (props: PropsType & WithStyles<typeof styles>) => {
  const { classes, icon: Icon, title, description, iconColor = 'gray' } = props;

  return (
    <div className={classes.infoArea}>
      <div className={`${classes.iconWrapper} ${classes[iconColor]}`}>
        <Icon className={classes.icon} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
};

export default withStyles(styles)(InfoArea);

import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Assignment from '@material-ui/icons/Assignment';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import { GridContainer, GridItem } from '../Grid';
import { Card, CardHeader, CardBody, CardIcon } from '../Card';
import Button from '../Button';
import Table from './Table';
import styles from './styles';

type PropsType = {
  title: string,
  tableHead: string[],
  tableData: any[],
  onEditClick?: (item: any) => void,
  onDeleteClick?: (item: any) => void,
} & WithStyles<typeof styles>;

const ExtendedTables = ({ classes, title, tableHead, tableData, ...props }: PropsType) => {
  const btns = [
    { color: 'success', Icon: Edit, action: props.onEditClick },
    { color: 'danger', Icon: Close, action: props.onDeleteClick },
  ];
  const renderActionBtns = (id: string) => (
    <>
      {btns.map(({ color, action, Icon }, index) => (
        <Button
          key={index}
          onClick={() => action(id)}
          simple
          color={color as any}
          className={classes.actionButton}
        >
          <Icon className={classes.icon} />
        </Button>
      ))}
    </>
  );

  const tHead = [...tableHead];
  let tData = [...tableData];

  if (props.onEditClick || props.onDeleteClick) {
    tHead.push('Actions');
    tData = tData.map(({ id, data }) => ({ id, data: data.concat(renderActionBtns(id)) }));
  }

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="orange" icon>
            <CardIcon color="orange">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>{title}</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={tHead}
              tableData={tData}
              customCellClasses={[classes.center, classes.right, classes.right]}
              customClassesForCells={[0, 4, 5]}
              customHeadCellClasses={[classes.center, classes.right, classes.right]}
              customHeadClassesForCells={[0, 4, 5]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default withStyles(styles)(ExtendedTables);

import * as React from 'react';
// import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '../../Button';
import Table from '../../Table';
import { DatabaseType } from '../../../reducers/database';
// import styles from './styles';

type PropsType = {
  items: DatabaseType[],
  onCreateClick: () => void,
  onEditClick: (dbId: string) => void,
  onDeleteClick: (dbId: string) => void,
};
// } & WithStyles<typeof styles>;

const DatabasesPage = ({ items, ...props }: PropsType) => {
  const tableData = items.map(({ id, name, description }, index) => ({
    id, data: [index + 1, name, description],
  }));

  return (
    <div>
      <Button onClick={props.onCreateClick}>Create Database</Button>
      <Table
        title="Databases"
        tableHead={['#', 'Name', 'Description']}
        tableData={tableData}
        onEditClick={props.onEditClick}
        onDeleteClick={props.onDeleteClick}
      />
    </div>
  );
};

// export default withStyles(styles)(DatabasesPage);
export default DatabasesPage;

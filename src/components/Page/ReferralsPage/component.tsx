import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '../../Table';
import Button from '../../Button';
import { ReferralType } from '../../../reducers/referral';
import { DatabaseType } from '../../../reducers/database';
import styles from './styles';

type PropsType = {
  items: ReferralType[],
  databases: DatabaseType[],
  selectedDatabase: DatabaseType,
  onDatabaseSelect: (dbId: string) => void,
  onCreateClick: () => void,
  // onEditClick: (db: DatabaseType) => void,
  // onDeleteClick: (db: DatabaseType) => void,
} & WithStyles<typeof styles>;

const ReferralsPage = ({ classes, items, databases, ...props }: PropsType) => {
  const handleDbSelect = ({ target }: any) => props.onDatabaseSelect(target.value);

  const tableData = items.map(({ name, target, url, displayURL, rid }, index) => ({
    id: rid, data: [index + 1, name, url, displayURL, target],
  }));

  if (!props.selectedDatabase.id) return null;

  return (
    <div>
      <div className={classes.header}>
        <FormControl className={classes.dbSelect}>
          <InputLabel shrink htmlFor="db-select" classes={{ formControl: classes.dbSelectLabel }}>
            Select Database
          </InputLabel>
          <Select
            MenuProps={{ className: classes.selectMenu }}
            classes={{ select: classes.select }}
            value={props.selectedDatabase.id}
            onChange={handleDbSelect}
            inputProps={{ name: 'dbSelect', id: 'db-select' }}
          >
            {databases.map(({ id, name }) => (
              <MenuItem
                key={id}
                value={id}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={props.onCreateClick}>Create Referral</Button>
      </div>
      <Table
        title="Referrals"
        tableHead={['#', 'Name', 'Url', 'Lynx', 'Target']}
        tableData={tableData}
      />
    </div>
  );
};

export default withStyles(styles)(ReferralsPage);

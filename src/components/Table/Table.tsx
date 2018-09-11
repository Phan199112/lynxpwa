import * as React from 'react';
import classnames from 'classnames';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ColorsType } from '../../styles/global';
import TableStyles from './TableStyles';

type PropsType = {
  tableHeaderColor?: ColorsType,
  tableHead: string[],
  tableData: any[],
  hover?: boolean,
  striped?: boolean,
  tableShopping?: boolean,
  coloredColls?: number[],
  colorsColls?: any[],
  customCellClasses?: string[],
  customClassesForCells?: number[],
  customHeadCellClasses?: string[],
  customHeadClassesForCells?: number[],
} & WithStyles<typeof TableStyles>;

const CustomTable = (props: PropsType) => {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor = 'gray',
    hover = false,
    striped = false,
    colorsColls = [],
    coloredColls = [],
    customCellClasses = [],
    customClassesForCells = [],
    tableShopping,
    customHeadCellClasses = [],
    customHeadClassesForCells = [],
  } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow className={classes.tableRow}>
              {tableHead.map((prop, key) => {
                const tableCellClasses =
                  classnames(classes.tableHeadCell, classes.tableCell, {
                    [customHeadCellClasses[customHeadClassesForCells.indexOf(key)]]:
                      customHeadClassesForCells.indexOf(key) !== -1,
                    [classes.tableShoppingHead]: tableShopping,
                    [classes.tableHeadFontSize]: !tableShopping,
                  });

                return (
                  <TableCell className={tableCellClasses} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map(({ id, data }, index) => {
            const tableRowClasses = classnames({
              [classes.tableRowHover]: hover,
              [classes.tableStripedRow]: striped && index % 2 === 0,
            });

            return (
              <TableRow
                key={id}
                hover={hover}
                className={`${classes.tableRow} ${tableRowClasses}`}
              >
                {data.map((prop: any, key: any) => {
                  const tableCellClasses = classnames(classes.tableCell, {
                    [(classes as any)[colorsColls[coloredColls.indexOf(key)]]]:
                      coloredColls.indexOf(key) !== -1,
                    [customCellClasses[customClassesForCells.indexOf(key)]]:
                      customClassesForCells.indexOf(key) !== -1,
                  });

                  return (
                    <TableCell className={tableCellClasses} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(TableStyles)(CustomTable);

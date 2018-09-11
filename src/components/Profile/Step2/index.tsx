import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { GridContainer, GridItem } from '../../Grid';
import styles from './styles';

type StateType = MapInterface<string>;

class Step2 extends React.Component<WithStyles<typeof styles>, StateType> {
  state: StateType = { simpleSelect: '' };

  sendState = () => this.state;

  handleSimple = ({ target }: any) => this.setState({ [target.name]: target.value });

  handleChange = (name: string) =>
    ({ target }: any) => this.setState({ [name]: target.checked });

  isValidated = () => true;

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h4 className={classes.infoText}>What are you doing? (checkboxes)</h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={4}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange('design')}
                    checkedIcon={<i className={`fas fa-pencil-alt ${classes.iconCheckboxIcon}`} />}
                    icon={<i className={`fas fa-pencil-alt ${classes.iconCheckboxIcon}`} />}
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Design</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange('code')}
                    checkedIcon={<i className={`fas fa-terminal ${classes.iconCheckboxIcon}`} />}
                    icon={<i className={`fas fa-terminal ${classes.iconCheckboxIcon}`} />}
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Code</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange('develop')}
                    checkedIcon={<i className={`fas fa-laptop ${classes.iconCheckboxIcon}`} />}
                    icon={<i className={`fas fa-laptop ${classes.iconCheckboxIcon}`} />}
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Develop</h6>
                </div>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    Choose City
                  </InputLabel>
                  <Select
                    MenuProps={{ className: classes.selectMenu }}
                    classes={{ select: classes.select }}
                    value={this.state.simpleSelect}
                    onChange={this.handleSimple}
                    inputProps={{ name: 'simpleSelect', id: 'simple-select' }}
                  >
                    <MenuItem
                      disabled
                      classes={{ root: classes.selectMenuItem }}
                    >
                      Choose City
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value="2"
                    >
                      Paris
                    </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value="3"
                    >
                      Bucharest
                    </MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Step2);

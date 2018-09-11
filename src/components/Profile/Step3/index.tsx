import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Input from '../../Input';
import { GridContainer, GridItem } from '../../Grid';
import styles from './styles';

type PropsType = {
  street?: string,
  city?: string,
  zip?: string,
  state?: string,
} & WithStyles<typeof styles>;

type StateType = { street?: string, city?: string, zip?: string, state?: string };

class Step3 extends React.Component<PropsType, StateType> {
  state: StateType = { street: null, city: null, zip: null, state: null };

  static getDerivedStateFromProps({ street, city, zip, state }: PropsType, prevState: StateType) {
    const nextState: StateType = {};

    if (prevState.street === null && street && street !== prevState.street) {
      nextState.street = street;
    }

    if (prevState.city === null && city && city !== prevState.city) {
      nextState.city = city;
    }

    if (prevState.zip === null && zip && zip !== prevState.zip) {
      nextState.zip = zip;
    }

    if (prevState.state === null && state && state !== prevState.state) {
      nextState.state = state;
    }

    if (Object.keys(nextState).length) return nextState;

    return null;
  }

  sendState = () => {
    const state: StateType = {};
    Object.keys(this.state).forEach((key: keyof StateType) => {
      if (this.state[key] !== null) state[key] = this.state[key];
    });

    return state;
  };

  isValidated = () => true;

  render() {
    const { classes } = this.props;
    const { street, city, zip, state } = this.state;

    return (
      <GridContainer justify="center">
        <GridItem xs={11} sm={10}>
          <GridContainer justify="center">
            <GridItem xs={12}>
              <h4 className={classes.infoText}>Tell us where you live</h4>
            </GridItem>
            <GridItem xs={12}>
              <Input
                labelText="Street"
                id="street"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: ({ target }: any) => this.setState({ street: target.value }),
                  value: street || '',
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <Input
                labelText="City"
                id="city"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: ({ target }: any) => this.setState({ city: target.value }),
                  value: city || '',
                }}
              />
            </GridItem>
            <GridItem xs={6} sm={4}>
              <Input
                labelText="Zip code"
                id="zip"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: ({ target }: any) => this.setState({ zip: target.value }),
                  value: zip || '',
                }}
              />
            </GridItem>
            <GridItem xs={6} sm={2}>
              <Input
                labelText="State"
                id="state"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: ({ target }: any) => this.setState({ state: target.value }),
                  value: state || '',
                }}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Step3);

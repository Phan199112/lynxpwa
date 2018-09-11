import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { default as EmailIcon } from '@material-ui/icons/Email';
import { default as LockOutlineIcon } from '@material-ui/icons/LockOutline';
import { GridContainer, GridItem } from '../../Grid';
import Input from '../../Input';
import Button from '../../Button';
import Loader from '../../Loader';
import { Card, CardBody, CardHeader, CardFooter } from '../../Card';
import { getEmailError, getPasswordError } from '../../../services/HelperService';
import styles from './styles';

type PropsType = {
  isLoading?: boolean,
  error: string,
  onErrorClear: () => void,
  onSubmit: (data: {}) => void,
} & WithStyles<typeof styles>;

type StateType = { cardAnimation: string, error: { email?: string, password?: string } };

class LoginPage extends React.Component<PropsType, StateType> {
  form: { email?: HTMLInputElement, password?: HTMLInputElement };

  constructor(props: PropsType) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = { cardAnimation: 'cardHidden', error: {} };
    this.form = {};
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(() => this.setState({ cardAnimation: null }), 700);
  }

  componentDidUpdate(prevProps: PropsType) {
    const { error } = this.props;

    if (error && prevProps.error !== error) {
      this.setState({ error: { email: error, password: error } });
      this.props.onErrorClear();
    }
  }

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { email, password } = this.form;
    const emailError = getEmailError(email.value);
    const passwordError = getPasswordError(password.value);

    if (emailError) {
      return this.setState({ error: { email: emailError } });
    }

    if (passwordError) {
      return this.setState({ error: { password: passwordError } });
    }

    this.setState({ error: {} });
    this.props.onSubmit({
      identifier: email.value,
      password: password.value,
    });
  };

  handleFocus = () => this.setState({ error: {} });

  render() {
    const { classes, isLoading } = this.props;
    const { cardAnimation, error } = this.state;
    const cardClassName = cardAnimation ? classes[cardAnimation as 'cardHidden'] : '';

    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center" direction="column" alignItems="center">
            <GridItem xs={12} sm={8} md={6}>
              <form onSubmit={this.handleSubmit}>
                <Loader isVisible={isLoading} isFullHeight />
                <Card login className={cardClassName}>
                  <CardHeader
                    className={`${classes.cardHeader} ${classes.textCenter}`}
                    color="orange"
                  >
                    <h4 className={classes.cardTitle}>Log in</h4>
                  </CardHeader>
                  <CardBody>
                    <Input
                      labelText={error.email || 'Email'}
                      id="email"
                      error={!!error.email}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        inputRef: (input: HTMLInputElement) => { this.form.email = input; },
                        type: 'email',
                        onFocus: this.handleFocus,
                        endAdornment: !this.state.error.email && (
                          <InputAdornment position="end">
                            <EmailIcon className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Input
                      labelText={error.email || 'Password'}
                      id="password"
                      error={!!error.password}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        inputRef: (input: HTMLInputElement) => { this.form.password = input; },
                        type: 'password',
                        onFocus: this.handleFocus,
                        endAdornment: !this.state.error.password && (
                          <InputAdornment position="end">
                            <LockOutlineIcon
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <Button
                      type="submit"
                      color="orange"
                      size="lg"
                      simple
                      block
                      disabled={isLoading}
                      onClick={this.handleSubmit}
                    >
                      {'Let\'s Go'}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);

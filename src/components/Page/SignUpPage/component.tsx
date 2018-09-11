import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { default as FaceIcon } from '@material-ui/icons/Face';
import { default as EmailIcon } from '@material-ui/icons/Email';
import { default as TimelineIcon } from '@material-ui/icons/Timeline';
import { default as CodeIcon } from '@material-ui/icons/Code';
import { default as GroupIcon } from '@material-ui/icons/Group';
import { default as LockOutlineIcon } from '@material-ui/icons/LockOutline';
import { default as VpnKeyIcon } from '@material-ui/icons/VpnKey';
import { GridContainer, GridItem } from '../../Grid';
import { Card, CardBody, CardFooter } from '../../Card';
import InfoArea from '../../InfoArea';
import Button from '../../Button';
import Input from '../../Input';
import Loader from '../../Loader';
import Captcha from '../../Captcha';
import Typography from '../../Typography';
import {
  generateCaptchaCode,
  getEmailError,
  getPasswordError,
} from '../../../services/HelperService';
import styles from './styles';

type PropsType = {
  isLoading?: boolean,
  error: string,
  onErrorClear: () => void,
  email?: string,
  isConfirmation?: boolean,
  onSubmit: (data: {}) => void,
  onConfirmSubmit: (data: {}) => void,
} & WithStyles<typeof styles>;

type StateType = {
  isConfirmation: boolean,
  error: {
    name?: string,
    email?: string,
    password?: string,
    captcha?: string,
    code?: string,
  },
};

class SignUpPage extends React.Component<PropsType, StateType> {
  captcha: string;
  form: {
    email?: HTMLInputElement,
    name?: HTMLInputElement,
    password?: HTMLInputElement,
    captcha?: HTMLInputElement,
    code?: HTMLInputElement,
  };

  constructor(props: PropsType) {
    super(props);

    this.captcha = generateCaptchaCode();
    this.form = {};
    this.state = { error: {}, isConfirmation: this.props.isConfirmation };
  }

  static getDerivedStateFromProps(nextProps: PropsType, prevState: StateType) {
    if (nextProps.isConfirmation && !prevState.isConfirmation) {
      return { isConfirmation: nextProps.isConfirmation };
    }

    return null;
  }

  componentDidUpdate(prevProps: PropsType) {
    const { error } = this.props;

    if (error && prevProps.error !== error) {
      this.setState({ error: { email: error, code: error } });
      this.props.onErrorClear();
    }
  }

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { email, name, password, captcha } = this.form;
    const emailError = getEmailError(email.value);
    const passwordError = getPasswordError(password.value);

    if (!name.value) {
      return this.setState({ error: { name: 'Name is required' } });
    }

    if (emailError) {
      return this.setState({ error: { email: emailError } });
    }

    if (passwordError) {
      return this.setState({ error: { password: passwordError } });
    }

    if (captcha.value !== this.captcha) {
      return this.setState({ error: { captcha: 'Incorrect captcha code!' } });
    }

    this.setState({ error: {} });
    this.props.onSubmit({
      name: name.value,
      email: email.value,
      password: password.value,
    });
  };

  handleConfirmSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { email, code } = this.form;
    const emailError = getEmailError(email.value);

    if (!code.value) {
      return this.setState({ error: { code: 'Code is required' } });
    }

    if (emailError) {
      return this.setState({ error: { email: emailError } });
    }

    this.setState({ error: {} });
    this.props.onConfirmSubmit({
      email: this.form.email.value,
      code: this.form.code.value,
    });
  };

  handleFocus = () => this.setState({ error: {} });

  // to render success input we would need to have controlled input (value+onChange)
  // and a success={isValidEmail(this.state.form.email)}
  renderSignUpFields() {
    const { classes } = this.props;

    return (
      <CardBody>
        <Input
          key="name"
          labelText={this.state.error.name || 'Name'}
          id="name"
          error={!!this.state.error.name}
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
          }}
          inputProps={{
            onFocus: this.handleFocus,
            inputRef: (input: HTMLInputElement) => { this.form.name = input; },
            endAdornment: !this.state.error.name && (
              <InputAdornment
                position="end"
                className={classes.inputAdornment}
              >
                <FaceIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <Input
          key="email"
          labelText={this.state.error.email || 'Email'}
          id="email"
          error={!!this.state.error.email}
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
          }}
          inputProps={{
            onFocus: this.handleFocus,
            inputRef: (input: HTMLInputElement) => { this.form.email = input; },
            type: 'email',
            endAdornment: !this.state.error.email && (
              <InputAdornment
                position="end"
                className={classes.inputAdornment}
              >
                <EmailIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <Input
          key="password"
          labelText={this.state.error.password || 'Password (min. 8 letters)'}
          id="password"
          error={!!this.state.error.password}
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
          }}
          inputProps={{
            onFocus: this.handleFocus,
            inputRef: (input: HTMLInputElement) => { this.form.password = input; },
            type: 'password',
            endAdornment: !this.state.error.password && (
              <InputAdornment
                position="end"
                className={classes.inputAdornment}
              >
                <LockOutlineIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <Input
          key="captcha"
          labelText={this.state.error.captcha || 'Type the code displayed'}
          id="captcha"
          error={!!this.state.error.captcha}
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
          }}
          inputProps={{
            onFocus: this.handleFocus,
            inputRef: (input: HTMLInputElement) => { this.form.captcha = input; },
            type: 'text',
            endAdornment: !this.state.error.captcha && (
              <InputAdornment
                position="end"
                className={classes.inputAdornment}
              >
                <VpnKeyIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.captcha}>
          <Captcha code={this.captcha} />
        </div>
      </CardBody>
    );
  }

  renderConfirmSignUpFields() {
    const { classes, email } = this.props;

    return (
      <CardBody>
        <Input
          key="email"
          labelText={this.state.error.email || 'Email'}
          id="email"
          error={!!this.state.error.email}
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
          }}
          inputProps={{
            onFocus: this.handleFocus,
            defaultValue: email,
            inputRef: (input: HTMLInputElement) => { this.form.email = input; },
            type: 'email',
            endAdornment: !this.state.error.email && (
              <InputAdornment
                position="end"
                className={classes.inputAdornment}
              >
                <EmailIcon className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <Input
          key="code"
          labelText={this.state.error.code || 'Confirmation code'}
          id="code"
          error={!!this.state.error.code}
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses,
          }}
          inputProps={{
            onFocus: this.handleFocus,
            inputRef: (input: HTMLInputElement) => { this.form.code = input; },
            type: 'number',
            endAdornment: !this.state.error.code && (
              <InputAdornment
                position="end"
                className={classes.inputAdornment}
              >
                <LockOutlineIcon
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
          }}
        />
      </CardBody>
    );
  }

  renderConfirmationToggle() {
    const { isConfirmation } = this.state;

    return (
      <div className={this.props.classes.confirmation}>
        <Typography type="muted">
          {isConfirmation ? 'Not yet signed up?' : 'Already signed up?'}
        </Typography>
        <Button
          color="orange"
          simple
          onClick={() => this.setState({ isConfirmation: !isConfirmation })}
        >
          {isConfirmation ? 'Sign up' : 'Confirm your registration'}
        </Button>
      </div>
    );
  }

  render() {
    const { classes, isLoading } = this.props;
    const { isConfirmation } = this.state;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Sign up</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Analytics"
                      description={`Click insights.(Coming Soon)`
                      }
                      icon={TimelineIcon}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Campaigns"
                      description={`Isolate Databases with Referrals`
                      }
                      icon={CodeIcon}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Collaboration"
                      description={`Fully Customizable
                       with Team Share`
                      }
                      icon={GroupIcon}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <form
                      className={classes.form}
                      onSubmit={isConfirmation ? this.handleConfirmSubmit : this.handleSubmit}
                    >
                      <Loader isVisible={isLoading} isFullHeight />
                      {isConfirmation
                        ? this.renderConfirmSignUpFields()
                        : this.renderSignUpFields()
                      }
                      <CardFooter className={classes.actionBtnsContainer}>
                        <Button
                          round
                          type="submit"
                          color="orange"
                          disabled={isLoading}
                          onClick={isConfirmation ? this.handleConfirmSubmit : this.handleSubmit}
                        >
                          Get started
                        </Button>
                        {this.renderConfirmationToggle()}
                      </CardFooter>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpPage);

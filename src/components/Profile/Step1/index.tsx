import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { default as FaceIcon } from '@material-ui/icons/Face';
import { default as RecordVoiceOverIcon } from '@material-ui/icons/RecordVoiceOver';
import { GridContainer, GridItem } from '../../Grid';
import Input from '../../Input';
import { imagesUrl } from '../../../constants';
// import { PictureUpload } from '../../FileUpload';
import styles from './styles';

const avatarUrls = [
  'avatar-female-80.png',
  'avatar-male-80.png',
].map(img => `${imagesUrl}/avatars/${img}`);

type InputStateType = 'success' | 'error';

type PropsType = {
  name: string,
  picture: string,
  avatar?: string,
} & WithStyles<typeof styles>;

type StateType = {
  name?: string,
  firstName?: string,
  lastName?: string,
  firstNameState?: InputStateType,
  lastNameState?: InputStateType,
  picture?: File,
  avatar?: string,
};

class Step1 extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      name: null,
      firstName: null,
      lastName: null,
      firstNameState: null,
      lastNameState: null,
      avatar: null,
    };
  }

  static getDerivedStateFromProps({ name, avatar }: PropsType, prevState: StateType) {
    let nextState = {};

    if (prevState.name === null && name && name !== prevState.name) {
      const names = name.split(' ');
      nextState = {
        ...nextState,
        avatar,
        name,
        firstName: names[0],
        lastName: names.slice(1).join(' '),
      };
    }

    if (Object.keys(nextState).length) return nextState;

    return null;
  }

  sendState = () => {
    const state: StateType = {};
    const { firstName, lastName, picture, avatar } = this.state;

    if (firstName !== null || lastName !== null) state.name = '';
    if (firstName !== null) state.name = firstName;
    if (lastName !== null) state.name = `${state.name} ${lastName}`;
    if (avatar || (this.props.avatar && !avatar)) state.avatar = avatar || '';
    // if (picture) state.picture = picture;

    return state;
  };

  change = (value: string, stateName: string, type: string, minLength: number) => {
    if (type === 'length') {
      this.setState({
        [`${stateName}State`]: value.length >= minLength ? 'success' : 'error',
      });
    }

    this.setState({ [stateName]: value });
  };

  onAvatarSelect = (avatar: string) => {
    if (avatar === this.state.avatar) return this.setState({ avatar: null });

    this.setState({ avatar });
  };

  isValidated = () => {
    const { firstNameState, lastNameState } = this.state;

    if (firstNameState !== 'error' && lastNameState !== 'error') {
      return true;
    }

    if (firstNameState !== 'success') this.setState({ firstNameState: 'error' });

    if (lastNameState !== 'success') this.setState({ lastNameState: 'error' });

    return false;
  };

  render() {
    const { classes, picture } = this.props;
    const { firstName, firstNameState, lastName, lastNameState, avatar } = this.state;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            {'Let\'s start with the basic information'}
          </h4>
        </GridItem>
        {/*
        <GridItem xs={12} sm={4}>
          <PictureUpload
          picture={picture}
          onPictureSelect={picture => this.setState({ picture })}
          />
        </GridItem>
        */}
        <GridItem xs={12} sm={8}>
          <Input
            success={firstNameState === 'success'}
            error={firstNameState === 'error'}
            labelText={<span>First Name <small>(required)</small></span>}
            id="firstname"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: ({ target }: any) => this.change(target.value, 'firstName', 'length', 2),
              value: firstName || '',
              endAdornment: (
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
            success={lastNameState === 'success'}
            error={lastNameState === 'error'}
            labelText={<span>Last Name <small>(required)</small></span>}
            id="lastname"
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: ({ target }: any) => this.change(target.value, 'lastName', 'length', 2),
              value: lastName || '',
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOverIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={8} className={classes.avatarsContainer}>
          <h6>Choose your avatar</h6>
          <div className={classes.avatars}>
            {avatarUrls.map(url => (
              <Checkbox
                key={url}
                tabIndex={-1}
                checked={avatar === url}
                onClick={() => this.onAvatarSelect(url)}
                icon={<Avatar alt="Avatar" src={url} />}
                checkedIcon={<Avatar alt="Avatar" src={url} />}
                className={classes.avatarCheckbox}
                classes={{
                  checked: classes.iconCheckboxChecked,
                  root: classes.iconCheckbox,
                }}
              />
            ))}
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Step1);

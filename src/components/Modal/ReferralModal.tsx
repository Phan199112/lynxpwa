import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { default as AddIcon } from '@material-ui/icons/Add';
import { BaseReferralType } from '../../reducers/referral';
import Button from '../Button';
import { default as styles } from './ReferralStyles';

type PropsType = {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (referral: BaseReferralType) => void,
  data?: BaseReferralType,
} & WithStyles<typeof styles>;

type StateType = {
  [x: string]: NameValue[],
  substitutes: NameValue[],
  urlParameters: NameValue[],
};

type NameValue = { key: number, name: string, value: string };

const getNameValueArray = (array: NameValue[]) =>
array.filter(({ name, value }) => name && value)
.map(({ name, value }: NameValue) => ({ [name]: value }));

class ReferralModal extends React.Component<PropsType, StateType> {
  nameRef: HTMLInputElement;
  descRef: HTMLInputElement;
  urlRef: HTMLInputElement;
  targetRef: HTMLInputElement;
  urlParametersLastKey: number;
  substitutesLastKey: number;

  constructor(props: PropsType) {
    super(props);

    const { substitute = [], urlParams = [] } = this.props.data;
    this.urlParametersLastKey = 0;
    this.substitutesLastKey = 0;
    const urlParameters = urlParams.length ?
      urlParams.map((urlParam: any, index: number) => ({
        key: index,
        name: Object.keys(urlParam)[0],
        value: urlParam,
      }))
      : [{ key: 0, name: '', value: '' }];
    const substitutes = substitute.length ?
      substitute.map((substitute: any, index: number) => ({
        key: index,
        name: Object.keys(substitute)[0],
        value: substitute,
      }))
      : [{ key: 0, name: '', value: '' }];

    this.state = { substitutes, urlParameters };
  }

  handleSubmit = () => {
    const { substitutes, urlParameters } = this.state;

    this.props.onSubmit({
      name: this.nameRef.value,
      description: this.descRef.value,
      url: this.urlRef.value,
      target: this.targetRef.value,
      substitute: getNameValueArray(substitutes),
      urlParams: getNameValueArray(urlParameters),
    });
  };

  handleInputChange = (type: string, prop: string, index: number, value: string) => {
    const items = this.state[type].slice(0);
    items[index][prop as 'name' | 'value'] = value;
    this.setState({ [type]: items });
  };

  handleAddUrlParamField = () => {
    this.urlParametersLastKey += 1;
    const emptyItem = { key: this.urlParametersLastKey, name: '', value: '' };
    this.setState((state: StateType) => ({
      urlParameters: state.urlParameters.concat(emptyItem),
    }));
  };

  handleAddSubstituteField = () => {
    this.substitutesLastKey += 1;
    const emptyItem = { key: this.substitutesLastKey, name: '', value: '' };
    this.setState((state: StateType) => ({
      substitutes: state.substitutes.concat(emptyItem),
    }));
  };

  renderInputs(array: NameValue[], type: string) {
    const { classes } = this.props;

    return array.map(({ key, name, value }) => (
      <div key={key} className={classes.inputRow}>
        <TextField
          key="name"
          value={name}
          onChange={({ target }) => this.handleInputChange(type, 'name', key, target.value)}
          margin="dense"
          type="text"
          className={classes.input}
        />
        <TextField
          key="value"
          value={value}
          onChange={({ target }) => this.handleInputChange(type, 'value', key, target.value)}
          margin="dense"
          type="text"
          className={classes.input}
        />
      </div>
    ));
  }

  render() {
    const { isOpen, onClose, data, classes } = this.props;
    const { substitutes, urlParameters } = this.state;

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Referral</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputRef={(input) => { this.nameRef = input; }}
            defaultValue={data.name}
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            inputRef={(input) => { this.descRef = input; }}
            defaultValue={data.description}
            margin="dense"
            multiline
            rows="4"
            id="description"
            label="Description"
            type="text"
            fullWidth
          />
          <TextField
            inputRef={(input) => { this.urlRef = input; }}
            defaultValue={data.url}
            margin="dense"
            id="url"
            label="Url"
            type="text"
            fullWidth
          />
          <TextField
            inputRef={(input) => { this.targetRef = input; }}
            defaultValue={data.target}
            margin="dense"
            id="target"
            label="Target"
            type="text"
            fullWidth
          />
          <div className={classes.inputGroup}>
            <div className={classes.inputGroupName}>Url parameters</div>
            {this.renderInputs(urlParameters, 'urlParameters')}
            <Button
              color="primary"
              justIcon
              round
              onClick={this.handleAddUrlParamField}
            >
              <AddIcon />
            </Button>
          </div>
          <div className={classes.inputGroup}>
            <div className={classes.inputGroupName}>Substitutes</div>
            {this.renderInputs(substitutes, 'substitutes')}
            <Button color="primary" justIcon round onClick={this.handleAddSubstituteField}>
              <AddIcon />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">Create Referral</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ReferralModal);

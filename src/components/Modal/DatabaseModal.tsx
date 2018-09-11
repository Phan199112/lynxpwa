import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BaseDatabaseType } from '../../reducers/database';

type PropsType = {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (db: BaseDatabaseType) => void,
  data?: BaseDatabaseType,
};

let nameRef: HTMLInputElement;
let descRef: HTMLInputElement;

const DatabaseModal = ({ isOpen, onClose, onSubmit, data }: PropsType) => {
  const handleSubmit = () => onSubmit({ name: nameRef.value, description: descRef.value });

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Database</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          inputRef={(input) => { nameRef = input; }}
          defaultValue={data.name}
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
        />
        <TextField
          inputRef={(input) => { descRef = input; }}
          defaultValue={data.description}
          margin="dense"
          multiline
          rows="4"
          id="description"
          label="Description"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create Database</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DatabaseModal;

import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { default as MuiInput } from '@material-ui/core/Input';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import classnames from 'classnames';
import styles from './styles';

interface PropsType {
  classes: MapInterface<string>;
  labelText?: React.ReactNode;
  labelProps?: object;
  id?: string;
  inputProps?: {
    type?: string,
    endAdornment?: React.ReactNode,
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    onFocus?: () => void,
    value?: string,
    defaultValue?: string,
    placeholder?: string,
    inputProps?: {},
    inputRef?: (el: HTMLInputElement) => void,
  };
  formControlProps?: { className?: string, fullWidth?: boolean };
  inputRootCustomClasses?: string;
  error?: boolean;
  success?: boolean;
  white?: boolean;
}

const Input = (props: PropsType) => {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
  } = props;
  const labelClasses = classnames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classnames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = classnames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = classnames({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  let formControlClasses;

  if (formControlProps !== undefined) {
    formControlClasses = classnames(
      formControlProps.className,
      classes.formControl,
    );
  } else {
    formControlClasses = classes.formControl;
  }

  let feedbackClasses = classes.feedback;

  if (inputProps !== undefined) {
    if (inputProps.endAdornment !== undefined) {
      feedbackClasses = `${feedbackClasses} ${classes.feedbackRight}`;
    }
  }

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={`${classes.labelRoot} ${labelClasses}`}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <MuiInput
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {error
        ? <Clear className={`${feedbackClasses} ${classes.labelRootError}`} />
        : null
      }
      {success
        ? <Check className={`${feedbackClasses} ${classes.labelRootSuccess}`} />
        : null
      }
    </FormControl>
  );
};

export default withStyles(styles)(Input);

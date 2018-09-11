import * as React from 'react';
import Button from '../Button';
const defaultImage = require('../../../assets/img/image_placeholder.jpg');
const defaultAvatar = require('../../../assets/img/placeholder.jpg');

interface PropsType {
  avatar?: boolean;
  addButtonProps?: object;
  changeButtonProps?: object;
  removeButtonProps?: object;
}

interface StateType {
  imagePreviewUrl: string;
  file: File;
}

class ImageUpload extends React.Component<PropsType, StateType> {
  fileInput: HTMLInputElement = null;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
    };
  }

  handleImageChange = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const target = event.target as HTMLInputElement;
    const reader = new FileReader();
    const file = target.files[0];

    reader.onloadend = () => {
      this.setState({ file, imagePreviewUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  };

  handleClick = () => this.fileInput.click();

  handleRemove = () => {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
    });

    this.fileInput.value = null;
  };

  render() {
    const { avatar, addButtonProps, changeButtonProps, removeButtonProps } = this.props;

    return (
      <div className="fileinput text-center">
        <input
          type="file"
          onChange={this.handleImageChange}
          ref={(input) => { this.fileInput = input; }}
        />
        <div className={`thumbnail ${avatar ? 'img-circle' : ''}`}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={this.handleClick}>
              {avatar ? 'Add Photo' : 'Select image'}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={this.handleClick}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={this.handleRemove}
              >
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ImageUpload;

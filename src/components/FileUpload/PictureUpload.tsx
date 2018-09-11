import * as React from 'react';
const defaultImage = require('../../../assets/img/default-avatar.png');

type PropsType = { picture?: string, onPictureSelect: (img: File) => void };

type StateType = { imagePreviewUrl: string, file: File };

class PictureUpload extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = { file: null, imagePreviewUrl: props.picture || defaultImage };
  }

  handleImageChange = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const target = event.target as HTMLInputElement;
    const reader = new FileReader();
    const file = target.files[0];

    reader.onloadend = () => {
      this.setState({ file, imagePreviewUrl: reader.result as string });
      this.props.onPictureSelect(file);
    };

    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div className="picture-container">
        <div className="picture">
          <img
            src={this.state.imagePreviewUrl}
            className="picture-src"
            alt="..."
          />
          <input type="file" onChange={this.handleImageChange} />
        </div>
        <h6 className="description">Choose Picture</h6>
      </div>
    );
  }
}

export default PictureUpload;

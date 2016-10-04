import React, { Component, PropTypes } from 'react';

class PhotoViewer extends Component {
  static propTypes = {
    onClosePreview: PropTypes.func,
    updatePhoto: PropTypes.func,
    selectedPhoto: PropTypes.shape({
      albumId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
      thumbnailUrl: PropTypes.string,
      description: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      editDescription: null
    };
  }


  onEditDescription() {
    this.setState({
      editDescription: this.props.selectedPhoto.description || ''
    });
  }

  onChangeDescription(value) {
    this.setState({
      editDescription: value
    });
  }

  onSaveDescription() {
    const { updatePhoto, selectedPhoto } = this.props;
    const { editDescription } = this.state;
    const updatedPhoto = {
      ...selectedPhoto,
      description: editDescription
    };
    updatePhoto(updatedPhoto).then(() => {
      this.resetDescription();
    });
  }

  resetDescription() {
    this.setState({
      editDescription: null
    });
  }

  onCancelDescription() {
    this.resetDescription();
  }

  renderDescription(description) {
    return (
      <figcaption>
        {description}
        <button className="btn" onClick={() => {this.onEditDescription()}}>
          <i className="fa fa-pencil-square-o margin-right-small"></i>
          { description ? 'Edit caption' : 'Add a caption'}
        </button>
      </figcaption>
    );
  }

  renderEditingDescription(description) {
    return (
      <div>
        <input value={description} onChange={event => this.onChangeDescription(event.target.value)} />
        <button className="btn" onClick={() => this.onSaveDescription()}>Save</button>
        <button className="btn" onClick={() => this.onCancelDescription()}>Cancel</button>
      </div>
    );
  }

  render() {
    const { selectedPhoto, onClosePreview } = this.props;
    const { editDescription } = this.state;

    if (!selectedPhoto) {
      return null;
    }

    const isEditingDescription = this.state.editDescription !== null;

    return (
        <div className="photo-viewer">
          <button className="btn close" onClick={onClosePreview} title="Close">
            <i className="fa fa-times"></i>
          </button>
          <div className="center">
            <h1>{selectedPhoto.title}</h1>
            <figure>
              <img className="photo" src={selectedPhoto.url}></img>

              { !isEditingDescription && this.renderDescription(selectedPhoto.description) }
              { isEditingDescription && this.renderEditingDescription(editDescription) }
            </figure>
          </div>
        </div>

    );
  }
}


export default PhotoViewer;

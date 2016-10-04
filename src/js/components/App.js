import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { fetchPhotosIfNecessary, updatePhoto } from 'actions/appActions';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.shape({
      albumId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
      thumbnailUrl: PropTypes.string,
      description: PropTypes.string
    }))
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: null,
      editDescription: null
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPhotosIfNecessary());
  }

  onSelect(photo) {
    this.setState({
      selectedPhoto: photo
    });
  }

  onClosePreview() {
    this.setState({
      selectedPhoto: null,
      editDescription: null
    });
  }

  onEditDescription() {
    this.setState({
      editDescription: this.state.selectedPhoto.description || ''
    });
  }

  onChangeDescription(value) {
    this.setState({
      editDescription: value
    });
  }

  onSaveDescription() {
    const { dispatch } = this.props;
    const { selectedPhoto, editDescription } = this.state;
    const updatedPhoto = {
      ...selectedPhoto,
      description: editDescription
    };
    dispatch(updatePhoto(updatedPhoto)).then(() => {
      this.setState({
        editDescription: null,
        selectedPhoto: updatedPhoto
      });
    });
  }

  onCancelDescription() {
    this.setState({
      editDescription: null
    });
  }

  render() {
    const { photos } = this.props;
    const { selectedPhoto } = this.state;
    return (
      <div className={classNames({ 'has-modal': selectedPhoto })}>
        <div id="content-wrapper">
          <h1>Photo Gallery</h1>
          <div className="photo-gallery">


          {
            photos && photos.map((photo) => <div key={photo.id}><img className="tbn" onClick={() => this.onSelect(photo)} src={photo.thumbnailUrl}></img></div>)
          }
          </div>
          {
            selectedPhoto && (
              <div className="photo-preview">
                <button className="btn close" onClick={() => this.onClosePreview()} title="Close"><i className="fa fa-times"></i></button>
                <div className="center">
                  <h1>{selectedPhoto.title}</h1>
                  <figure>
                    <img className="photo" src={selectedPhoto.url}></img>

                    { this.state.editDescription === null &&
                      <figcaption>
                        {selectedPhoto.description}
                        <button className="btn" onClick={() => {this.onEditDescription()}}>
                          <i className="fa fa-pencil-square-o margin-right-small"></i>
                          {selectedPhoto.description ? 'Edit caption' : 'Add a caption'}
                        </button>

                      </figcaption>
                    }
                    { this.state.editDescription !== null &&

                        <div>
                          <input value={this.state.editDescription} onChange={event => this.onChangeDescription(event.target.value)} />
                          <button className="btn" onClick={() => this.onSaveDescription()}>Save</button>
                          <button className="btn" onClick={() => this.onCancelDescription()}>Cancel</button>
                        </div>

                    }
                  </figure>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.app.isFetching,
    photos: state.app.photos
  };
}

export default connect(
  mapStateToProps
)(App);

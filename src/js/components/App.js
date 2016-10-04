import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Thumbnail from './Thumbnail';
import PhotoViewer from './PhotoViewer';

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

    this.updatePhoto = this.updatePhoto.bind(this);
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


  updatePhoto(updatedPhoto) {
    const { dispatch } = this.props;
    return dispatch(updatePhoto(updatedPhoto)).then(() => {
      this.setState({
        selectedPhoto: updatedPhoto
      });
    });
  }


  render() {
    const { photos } = this.props;
    const { selectedPhoto } = this.state;

    return (
      <div className={classNames({ 'has-modal': selectedPhoto })}>
        <div id="content-wrapper">
          <h1 className="center">Photo Gallery</h1>
          <div className="photo-gallery">
          {/* If this request took longer, it would be a good idea to have an indicator here
            !photos && this.props.isFetching && <div>Just a second... <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
          */}

            {
              photos && photos.map(photo => <Thumbnail key={photo.id} onSelect={() => this.onSelect(photo)} photo={photo} />)
            }
          </div>
          <PhotoViewer selectedPhoto={selectedPhoto} updatePhoto={this.updatePhoto} onClosePreview={() => this.onClosePreview()} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.app.isFetchingPhotos,
    photos: state.app.photos
  };
}

export default connect(
  mapStateToProps
)(App);

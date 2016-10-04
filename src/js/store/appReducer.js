import { AppActions } from 'actions/appActions';
import { Status } from 'actions/statusActions';

const initialState = {
  isFetchingPhotos: false,
  photos: null
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case AppActions.FETCH_PHOTOS: {
      return {
        ...state,
        isFetchingPhotos: action.status === Status.NONE,
        photos: action.photos
      };
    }
    case AppActions.UPDATE_PHOTO: {
      const { photos } = state;
      const updatedPhoto = action.photo;

      return {
        ...state,
        photos: photos.map(photo => {
          if (photo.id !== updatedPhoto.id) {
            return photo;
          }
          return updatedPhoto;
        })
      };

    }
    default:
      return state;
  }
}

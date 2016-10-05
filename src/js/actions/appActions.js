import { Status } from './statusActions';

const PHOTO_API_URL = 'https://jsonplaceholder.typicode.com/photos';
const NAMESPACE = 'photo_viewer__';

export const AppActions = {
  FETCH_PHOTOS: 'FETCH_PHOTOS',
  UPDATE_PHOTO: 'UPDATE_PHOTO'
};

function fetchPhotosAction(status, photos) {
  return {
    type: AppActions.FETCH_PHOTOS,
    status,
    photos
  };
}

export function fetchPhotosIfNecessary() {
  return (dispatch) => {
    dispatch(fetchPhotosAction(Status.NONE));

    return fetch(PHOTO_API_URL)
      .then(response => response.json())
      .then(data => data.slice(0, 25))
      .then(data => data.map(photo => { return {...photo, thumbnailUrl: photo.url.replace(/\/\d+\//, '/150/') }})) // Fix thumbnail color
      .then(data => {
        // add in description
        return data.map(photo => {
          const storedPhoto = getPhotoById(photo.id);
          if (!storedPhoto) {
            return photo;
          }
          return {
            ...photo,
            description: storedPhoto.description
          };
        });
      })
      .then(data => {
        dispatch(fetchPhotosAction(Status.SUCCESS, data));
        return data;
      })
      .catch(error => {
        dispatch(fetchPhotosAction(Status.ERROR));
      });

  }
}

function storageAvailable(type) {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return false;
  }
}

const LOCAL_STORAGE_AVAILABLE = storageAvailable('localStorage');

function getStorageKey(id) {
  return `${NAMESPACE}${id}`;
}

function getPhotoById(id) {
  const key = getStorageKey(id);
  if (!LOCAL_STORAGE_AVAILABLE || !localStorage[key]) {
    return null
  }
  try {
    return JSON.parse(localStorage[key]);
  } catch (e) {
    localStorage[key] = null;
  }
  return null;
}



export function updatePhoto(photo) {
  // this is actually sync, but let's use thunk to emulate how an ajax api would behave
  return (dispatch) => {
    // return a promise so we can ensure api succeeded before updating component
    return Promise.resolve().then(() => {
      if (!LOCAL_STORAGE_AVAILABLE) {
        alert("Sorry, you're browser doesn't support saving to local storage.");
        return Promise.reject();
      }
      const key = getStorageKey(photo.id);
      localStorage[key] = JSON.stringify(photo);
      dispatch({
        type: AppActions.UPDATE_PHOTO,
        photo: photo
      });

      return true;
    })
  }


}

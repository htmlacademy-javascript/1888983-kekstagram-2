import {createThumbnails} from './thumbnails.js';
import {openBigPicture} from './big-picture.js';
import {thumbnailListElement} from './utils.js';

const initGallery = (photos) => {
  thumbnailListElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      const currentPicture = photos.find((photo) => photo.id === +evt.target.dataset.id);
      openBigPicture(currentPicture);
    }
  });
  createThumbnails(photos, thumbnailListElement);
};

export {initGallery};

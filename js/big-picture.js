import {renderComments} from './comments.js';
import {isEscapeKey, toggleModalOpen} from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigImageElement = bigPictureElement.querySelector('.big-picture__img');

const renderBigPicture = ({url, likes, description, comments}) => {
  bigImageElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  renderComments(comments);
};

const openBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  toggleModalOpen();
  renderBigPicture(picture);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  toggleModalOpen();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

bigPictureCloseButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture};

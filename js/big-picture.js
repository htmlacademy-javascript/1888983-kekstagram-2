import {renderComments} from './comments.js';
import {isEscapeKey} from './utils.js';
import {renderMoreComments} from './comments.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigImageElement = bigPictureElement.querySelector('.big-picture__img');
const commentCountShownElement = document.querySelector('.social__comment-shown-count');

const commentsLoaderElement = document.querySelector('.comments-loader');

const renderBigPicture = ({url, likes, description, comments}) => {
  bigImageElement.querySelector('img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  renderComments(comments);
};

const openBigPicture = (рicture) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  renderBigPicture(рicture);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', renderMoreComments);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentCountShownElement.textContent = '';
  commentsLoaderElement.removeEventListener('click', renderMoreComments);
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

import {getPhotos} from './data.js';
import {createThumbnails} from './thumbnails.js';
import {isEscapeKey} from './utils.js';

const COMMENT_COUNT = 5;

const thumbnailListElement = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigImage = bigPicture.querySelector('.big-picture__img');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const photos = getPhotos();

createThumbnails(photos, thumbnailListElement);

const commentsCount = (comments) => {
  if (comments.length < 5) {
    return comments.length;
  }
  return COMMENT_COUNT;
}

const renderBigPicture = ({url, likes, description, comments}) => {
  bigImage.querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-shown-count').textContent = commentsCount(comments);
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

thumbnailListElement.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    openBigPicture();
    document.addEventListener('keydown', onDocumentKeydown);
  }
  const currentPicture = photos.find((photo) => photo.id === +evt.target.dataset.id);
  renderBigPicture(currentPicture);
});

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
  document.removeEventListener('keydown', onDocumentKeydown);
});

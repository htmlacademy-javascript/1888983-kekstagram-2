import {getPhotos} from './data.js';

const THUMBNAIL_COUNT = 25;

const thumbnailListElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photos = getPhotos(THUMBNAIL_COUNT);

const thumbnailsFragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsFragment.append(thumbnailElement);
});

thumbnailListElement.append(thumbnailsFragment);

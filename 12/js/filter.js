import {createThumbnails} from './thumbnails.js';
import {debounce} from './utils.js';
import {thumbnailListElement} from './utils.js';

const RENDER_DELAY = 500;
const MAX_RANDOM_PHOTOS = 10;

const filtersListElement = document.querySelector('.img-filters');

const getFilteredPhotos = (filterId, photos) => {
  switch (filterId) {
    case 'filter-default':
      return photos;
    case 'filter-random':
      return [...photos].sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_PHOTOS);
    case 'filter-discussed':
      return [...photos].sort((photoA , photoB) => photoB.comments.length - photoA.comments.length);
    default:
      return photos;
  }
};

const renderFilteredPhotos = (id, photos) => {
  const FilteredPhotos = getFilteredPhotos(id, photos);
  const pictures = thumbnailListElement.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
  createThumbnails(FilteredPhotos, thumbnailListElement);
};

const debouncedRenderFilteredPhotos = debounce((filterId, photos) => renderFilteredPhotos(filterId, photos), RENDER_DELAY);

const setFilters = (photos) => {
  filtersListElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      const activeFilterButtonElement = filtersListElement.querySelector('.img-filters__button--active');
      activeFilterButtonElement.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debouncedRenderFilteredPhotos(evt.target.id, photos);
    }
  });
};

const initFilters = (photos) => {
  filtersListElement.classList.remove('img-filters--inactive');
  setFilters(photos);
};

export {initFilters};

import {createThumbnails} from './thumbnails.js';
import {debounce} from './utils.js';
import {thumbnailListElement} from './utils.js';

const filtersListElement = document.querySelector('.img-filters');
const filterButtonElement = filtersListElement.querySelectorAll('.img-filters__button');

const getFilteredPhotos = (filterId, photos) => {
  const filteredPhotos = photos.slice();
  switch (filterId) {
    case 'filter-default':
      return filteredPhotos;
    case 'filter-random':
      return filteredPhotos.sort(() => Math.random() - 0.5).slice(0, 10);
    case 'filter-discussed':
      return filteredPhotos.sort((photoA , photoB) => photoB.comments.length - photoA.comments.length);
    default:
      return filteredPhotos;
  }
};

const addFilteredPhotos = (id, photos) => {
  const newGallery = getFilteredPhotos(id, photos);
  const pictures = thumbnailListElement.querySelectorAll('.picture');
  for(let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }
  createThumbnails(newGallery, thumbnailListElement);
};

const setFilters = (photos) => {
  filtersListElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      for(let i = 0; i < filterButtonElement.length; i++) {
        filterButtonElement[i].classList.remove('img-filters__button--active');
      }
      evt.target.classList.add('img-filters__button--active');
      debounce(() => addFilteredPhotos(evt.target.id, photos))();
    }
  });
};

const initFilters = (photos) => {
  filtersListElement.classList.remove('img-filters--inactive');
  setFilters(photos);
};

export {initFilters};

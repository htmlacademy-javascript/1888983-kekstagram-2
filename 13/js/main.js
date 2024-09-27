import {initGallery} from './gallery.js';
import {getData} from './api.js';
import {showDataErrorMessage} from './messages.js';
import {setFormSubmit} from './form.js';
import {initFilters} from './filter.js';

getData()
  .then((photos) => {
    initFilters(photos);
    initGallery(photos);
  })
  .catch(showDataErrorMessage);

setFormSubmit();

import {initGallery} from './gallery.js';
import {getData} from './api.js';
import {showDataErrorMessage} from './messages.js';
import {setFormSubmit} from './form.js';

getData()
  .then((photos) => {
    initGallery(photos);
  })
  .catch(showDataErrorMessage);

setFormSubmit();

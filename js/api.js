import {initGallery} from './gallery.js';
import {bodyElement} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const errorElement = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = () => {
  bodyElement.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => initGallery(photos))
  .catch(showAlert);

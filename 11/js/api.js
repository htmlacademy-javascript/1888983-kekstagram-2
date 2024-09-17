import {initGallery} from './gallery.js';
import {isEscapeKey, bodyElement} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const errorElement = document.querySelector('#data-error').content.querySelector('.data-error');
const sendSuccessElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = sendSuccessElement.querySelector('.success__button');
const sendErrorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = sendErrorElement.querySelector('.error__button');

const showDataError = () => {
  bodyElement.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const closeAlert = () => {
  bodyElement.lastChild.remove();
};

const showAlert = (alert) => {
  bodyElement.append(alert);
  document.addEventListener('keydown', onDocumentKeydown);
  alert.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      closeAlert();
    }
  });
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeAlert();
  }
}

successButtonElement.addEventListener('click', closeAlert);
errorButtonElement.addEventListener('click', closeAlert);

// тут есть утечка обработчиков, то есть они плодятся при каждом открытии окна. Как их сбросить, я пока не придумал

const getData = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось получить данные');
    })
    .then((photos) => initGallery(photos))
    .catch(showDataError);
};

const sendData = (data, onSuccess, onEnd) => {
  fetch(
    'https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showAlert(sendSuccessElement);
        return response.json();
      } else {
        throw new Error('Не удалось отправить данные');
      }
    })
    .catch(() => showAlert(sendErrorElement))
    .finally(onEnd);
};

export {getData, sendData};

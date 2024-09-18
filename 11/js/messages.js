import {isEscapeKey, bodyElement} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const showDataErrorMessage = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  bodyElement.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

const closeAlert = () => {
  bodyElement.lastChild.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeAlert();
  }
}

const onOverflowClick = (evt) => {
  if (evt.target.matches('.message')) {
    closeAlert();
  }
};

const showMessage = (outcome) => {
  let element = '';
  let button = '';
  if (outcome === 'success') {
    element = sendSuccessTemplate;
    button = element.querySelector('.success__button');
  } else {
    element = sendErrorTemplate;
    button = element.querySelector('.error__button');
  }
  bodyElement.append(element);
  element.addEventListener('click', onOverflowClick);
  document.addEventListener('keydown', onDocumentKeydown);
  button.addEventListener('click', closeAlert);
};

// Изящнее проверка не получилась

export {showDataErrorMessage, showMessage};

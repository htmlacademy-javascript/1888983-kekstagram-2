import {isEscapeKey, bodyElement} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const messageTypeToTemplate = {
  success: successTemplate,
  error: errorTemplate,
};

const showDataErrorMessage = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  bodyElement.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

const closeMessage = () => {
  bodyElement.querySelector('.message').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const onMessageClick = (evt) => {
  if (evt.target.matches('.message')) {
    closeMessage();
  }
};

const showMessage = (type) => {
  const messageElement = messageTypeToTemplate[type].cloneNode(true);
  const buttonElement = messageElement.querySelector(`.${type}__button`);
  bodyElement.append(messageElement);
  messageElement.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onDocumentKeydown);
  buttonElement.addEventListener('click', () => {
    closeMessage();
  });
};

export {showDataErrorMessage, showMessage};

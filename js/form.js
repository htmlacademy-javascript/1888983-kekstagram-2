import {validateForm, resetValidation} from './form-validation.js';
import {isEscapeKey, toggleModalOpen, disableEscEvt, formElement, hastagTextElement} from './utils.js';
import {resetScale} from './scale.js';
import {hideSlider, resetFilter} from './effects.js';
import {sendData} from './api.js';
import {showMessage} from './messages.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Идет публикация...'
};

const formOverlayElement = formElement.querySelector('.img-upload__overlay');
const uploadControlElement = formElement.querySelector('.img-upload__input');
const formCloseElement = formElement.querySelector('.img-upload__cancel');
const descriptionTextElement = formElement.querySelector('.text__description');
const submitButton = formElement.querySelector('.img-upload__submit');

const openForm = () => {
  formOverlayElement.classList.remove('hidden');
  toggleModalOpen();
  document.addEventListener('keydown', onDocumentKeydown);
  hideSlider();
};

const closeForm = () => {
  formOverlayElement.classList.add('hidden');
  toggleModalOpen();
  document.removeEventListener('keydown', onDocumentKeydown);
  formElement.reset();
  resetValidation();
  resetScale();
  resetFilter();
  uploadControlElement.value = '';
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !document.querySelector('.error')) {
    evt.preventDefault();
    closeForm();
  }
}

disableEscEvt(hastagTextElement);
disableEscEvt(descriptionTextElement);

uploadControlElement.addEventListener('change', () => {
  openForm();
});
formCloseElement.addEventListener('click', () => {
  closeForm();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const setFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          closeForm();
          showMessage('success');
        })
        .catch(() => {
          showMessage('error');
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {setFormSubmit};

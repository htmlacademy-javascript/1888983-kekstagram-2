import {validateForm, resetValidation} from './form-validation.js';
import {isEscapeKey, toggleModalOpen, disableEscEvt, formElement, hastagTextElement} from './utils.js';
import {resetStyles} from './pictureEdit.js';

const formOverlayElement = formElement.querySelector('.img-upload__overlay');
const uploadControlElement = formElement.querySelector('.img-upload__input');
const formCloseElement = formElement.querySelector('.img-upload__cancel');
const descriptionTextElement = formElement.querySelector('.text__description');

const openForm = () => {
  formOverlayElement.classList.remove('hidden');
  toggleModalOpen();
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  formOverlayElement.classList.add('hidden');
  toggleModalOpen();
  document.removeEventListener('keydown', onDocumentKeydown);
  resetValidation();
  resetStyles();
  uploadControlElement.value = '';
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

disableEscEvt(hastagTextElement);
disableEscEvt(descriptionTextElement);

uploadControlElement.addEventListener('change', openForm);
formCloseElement.addEventListener('click', closeForm);

formElement.addEventListener('submit', (evt) => {
  const isValid = validateForm();
  if (!isValid) {
    evt.preventDefault();
  }
});

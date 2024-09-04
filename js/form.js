import './form-validation.js';
import {isEscapeKey, toggleModalOpen, disableEscEvt} from './utils.js';

const formElement = document.querySelector('.img-upload__form');
const formOverlayElement = formElement.querySelector('.img-upload__overlay');
const uploadControlElement = formElement.querySelector('.img-upload__input');
const formCloseElement = formElement.querySelector('.img-upload__cancel');
const hastagTextElement = formElement.querySelector('.text__hashtags');
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

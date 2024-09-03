import {isEscapeKey, toggleModalOpen} from './utils.js';


const formElement = document.querySelector('.img-upload');
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
  if (hastagTextElement === document.activeElement || descriptionTextElement === document.activeElement) {
    return evt;
    // подглядел в интернетах и понимаю, что делает (ничего). Но как это сделать через предложенный метод stopPropagation()?
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

uploadControlElement.addEventListener('change', openForm);
formCloseElement.addEventListener('click', closeForm);

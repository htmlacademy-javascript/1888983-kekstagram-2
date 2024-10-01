import {validateForm, resetValidation} from './form-validation.js';
import {isEscapeKey, toggleModalOpen, disableEscEvt, formElement, hashtagTextElement, previewImageElement} from './utils.js';
import {resetScale} from './scale.js';
import {hideSlider, resetFilter} from './effects.js';
import {sendData} from './api.js';
import {showMessage} from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Идет публикация...'
};

const formOverlayElement = formElement.querySelector('.img-upload__overlay');
const uploadControlElement = formElement.querySelector('.img-upload__input');
const formCloseElement = formElement.querySelector('.img-upload__cancel');
const descriptionTextElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const previewEffectElements = formElement.querySelectorAll('.effects__preview');

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
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !document.querySelector('.error')) {
    evt.preventDefault();
    closeForm();
  }
}

disableEscEvt(hashtagTextElement);
disableEscEvt(descriptionTextElement);

uploadControlElement.addEventListener('change', () => {
  const file = uploadControlElement.files[0];
  const matches = FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it));
  const pictureURL = URL.createObjectURL(file);
  if (matches) {
    previewImageElement.src = pictureURL;
    previewEffectElements.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url(${pictureURL})`;
    });
    openForm();
  }
});

formCloseElement.addEventListener('click', () => {
  closeForm();
});

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
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

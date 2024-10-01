const RENDER_DELAY = 500;

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const hashtagTextElement = formElement.querySelector('.text__hashtags');
const previewImageElement = formElement.querySelector('.img-upload__preview img');
const thumbnailListElement = document.querySelector('.pictures');

const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleModalOpen = () => bodyElement.classList.toggle('modal-open');

const disableEscEvt = (element) => {
  element.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

function debounce (callback, timeoutDelay = RENDER_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, toggleModalOpen, disableEscEvt, formElement, hashtagTextElement, previewImageElement, bodyElement, debounce, thumbnailListElement};

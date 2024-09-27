const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const hastagTextElement = formElement.querySelector('.text__hashtags');
const previewImageElement = formElement.querySelector('.img-upload__preview img');
const thumbnailListElement = document.querySelector('.pictures');

const getId = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleModalOpen = () => bodyElement.classList.toggle('modal-open');

const disableEscEvt = (element) => {
  element.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getId, getRandomInteger, getRandomArrayElement, isEscapeKey, toggleModalOpen, disableEscEvt, formElement, hastagTextElement, previewImageElement, bodyElement, debounce, thumbnailListElement};

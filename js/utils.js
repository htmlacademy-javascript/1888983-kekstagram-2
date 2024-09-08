const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const hastagTextElement = formElement.querySelector('.text__hashtags');
const imageElement = formElement.querySelector('img');

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

export {getId, getRandomInteger, getRandomArrayElement, isEscapeKey, toggleModalOpen, disableEscEvt, formElement, hastagTextElement, imageElement};

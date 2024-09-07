import {formElement, imagePreviewElement} from './utils.js';

const SCALE_STEP = 25;

const Scale = {
  MIN: 25,
  MAX: 100
};

const scaleValueElement = formElement.querySelector('.scale__control--value');
const scaleSmallerElement = formElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = formElement.querySelector('.scale__control--bigger');

const resetScale = () => {
  imagePreviewElement.style.transform = '';
  scaleValueElement.value = `${Scale.MAX}%`;
};

const changeScale = (scale) => {
  scaleValueElement.value = `${scale}%`;
  const newDecimalScale = scale / 100;
  imagePreviewElement.style.transform = `scale(${newDecimalScale})`;
};

const scaleDown = () => {
  const newScale = parseInt(scaleValueElement.value, 10) - SCALE_STEP;
  if (newScale >= Scale.MIN) {
    changeScale(newScale);
  }
};

const scaleUp = () => {
  const newScale = parseInt(scaleValueElement.value, 10) + SCALE_STEP;
  if (newScale <= Scale.MAX) {
    changeScale(newScale);
  }
};

scaleSmallerElement.addEventListener('click', scaleDown);
scaleBiggerElement.addEventListener('click', scaleUp);

export {resetScale};

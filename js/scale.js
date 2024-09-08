import {formElement, imagePreviewElement} from './utils.js';

const Scale = {
  SCALE_STEP: 25,
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
  imagePreviewElement.style.transform = `scale(${scale / 100})`;
};

const onSmallerButtonClick = () => {
  const newScale = parseInt(scaleValueElement.value, 10) - Scale.SCALE_STEP;
  if (newScale >= Scale.MIN) {
    changeScale(newScale);
  }
};

const onBiggerButtonClick = () => {
  const newScale = parseInt(scaleValueElement.value, 10) + Scale.SCALE_STEP;
  if (newScale <= Scale.MAX) {
    changeScale(newScale);
  }
};

scaleSmallerElement.addEventListener('click', onSmallerButtonClick);
scaleBiggerElement.addEventListener('click', onBiggerButtonClick);

export {resetScale};

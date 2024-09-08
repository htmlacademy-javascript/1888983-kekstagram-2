import {formElement, imagePreviewElement} from './utils.js';

const effectsConfig = {
  none: {
    filter: 'none',
    range: [0, 1],
    step: 0.1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    range: [0, 1],
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    range: [0, 1],
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    range: [0, 100],
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    range: [0, 3],
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: [1, 3],
    step: 0.1,
    unit: '',
  },
};

const sliderContainerElement = formElement.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const sliderValueElement = sliderContainerElement.querySelector('.effect-level__value');
const imageElement = imagePreviewElement.querySelector('img');
const effectsListElement = formElement.querySelector('.effects__list');

let currentFilter = 'none';

const resetFilter = () => {
  imageElement.style.filter = 'none';
};

const hideSlider = () => {
  sliderContainerElement.style.display = 'none';
};

const updateSlider = ({range, step}) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: range[0],
      max: range[1]
    },
    step: step,
    start: range[1]
  });
};

const applyEffect = ({filter, unit}) => {
  imageElement.style.filter = `${filter}(${sliderValueElement.value}${unit})`;
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 100,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return parseInt(value, 10);
      }
      return parseFloat(value.toFixed(1));
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  applyEffect(effectsConfig[currentFilter]);
});

effectsListElement.addEventListener('click', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentFilter = evt.target.value;
    if (currentFilter === 'none') {
      hideSlider();
      resetFilter();
    } else {
      sliderContainerElement.style.display = 'block';
    }
    updateSlider(effectsConfig[currentFilter]);
  }
});

export {hideSlider, resetFilter};

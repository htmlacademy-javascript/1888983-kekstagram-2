import {formElement, hastagTextElement} from './utils.js';

const MAX_HASTAGS = 5;

const regex = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(formElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  },
  true);

const getHastagsArray = () => hastagTextElement.value.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');

const validateLength = () => getHastagsArray().length <= MAX_HASTAGS;

const validateFormat = () => {
  const hastags = getHastagsArray();
  return hastags.every((hastag) => regex.test(hastag)) || hastags[0] === '';
};

const validateDuplicates = () => {
  const hastags = getHastagsArray();
  const set = new Set(hastags);
  return set.size === hastags.length;
};

pristine.addValidator(hastagTextElement, validateLength, `Не более ${MAX_HASTAGS} хэштегов`);
pristine.addValidator(hastagTextElement, validateFormat, 'Каждый хэштег: должен начинаться с #, от 2 до 20 символов, только буквы и числа');
pristine.addValidator(hastagTextElement, validateDuplicates, 'Хэштеги не должны повторяться');

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

export {validateForm, resetValidation};

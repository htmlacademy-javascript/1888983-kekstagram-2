import {formElement, hashtagTextElement} from './utils.js';

const MAX_HASHTAGS = 5;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(formElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error'
  },
  true);

const getHashtags = () => hashtagTextElement.value.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');

const validateLength = () => getHashtags().length <= MAX_HASHTAGS;

const validateFormat = () => {
  const hashtags = getHashtags();
  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag)) || hashtags[0] === '';
};

const validateDuplicates = () => {
  const hashtags = getHashtags();
  const set = new Set(hashtags);
  return set.size === hashtags.length;
};

pristine.addValidator(hashtagTextElement, validateLength, `Не более ${MAX_HASHTAGS} хэштегов`);
pristine.addValidator(hashtagTextElement, validateFormat, 'Каждый хэштег: должен начинаться с #, от 2 до 20 символов, только буквы и числа');
pristine.addValidator(hashtagTextElement, validateDuplicates, 'Хэштеги не должны повторяться');

const validateForm = () => pristine.validate();

const resetValidation = () => pristine.reset();

export {validateForm, resetValidation};

const formElement = document.querySelector('.img-upload__form');
const hastagTextElement = formElement.querySelector('.text__hashtags');

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

const getHastagsArray = () => {
  const hastags = hastagTextElement.value.split(' ');
  return hastags;
};

const validateLength = () => {
  const hastags = getHastagsArray();
  return hastags.length <= MAX_HASTAGS;
};

const validateFormat = () => {
  const hastags = getHastagsArray();
  return hastags.every((hastag) => regex.test(hastag));
};

const validateDuplicates = () => {
  const hastags = getHastagsArray();
  const set = new Set;
  hastags.forEach((hastag) => {
    set.add(hastag);
  });
  return set.size === hastags.length;
  // const newArray = []; // альтернатива
  // for (let i = 0; i < hastags.length; i++) {
  //   if (newArray.includes(hastags[i])) {
  //     return false;
  //   }
  //   newArray.push(hastags[i]);
  // }
  // return true;
};

const validateHastags = () => {
  pristine.addValidator(hastagTextElement, validateLength, 'Не более 5 хэштегов');
  pristine.addValidator(hastagTextElement, validateFormat, 'Каждый хэштег: должен начинаться с #, от 2 до 20 символов, только буквы и числа');
  pristine.addValidator(hastagTextElement, validateDuplicates, 'Хэштеги не должны повторяться');
};

const validateComments = (form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

validateHastags();
validateComments(formElement);

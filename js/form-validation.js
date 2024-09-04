const formElement = document.querySelector('.img-upload__form');

const pristine = new Pristine(formElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  },
  true);

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

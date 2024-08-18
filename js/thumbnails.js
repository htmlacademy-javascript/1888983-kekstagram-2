const thumbnailListElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach(({url, description, likes, comments}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const thumbnailImage = thumbnailElement.querySelector('.picture__img');
    thumbnailImage.src = url;
    thumbnailImage.alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(thumbnailElement);
  });
  return thumbnailListElement.append(fragment);
};

export {createThumbnails};


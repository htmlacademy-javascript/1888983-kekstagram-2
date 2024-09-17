const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnails = (photos, containerElement) => {
  const fragment = document.createDocumentFragment();
  photos.forEach(({id, url, description, likes, comments}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const thumbnailImageElement = thumbnailElement.querySelector('.picture__img');
    thumbnailImageElement.dataset.id = id;
    thumbnailImageElement.src = url;
    thumbnailImageElement.alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(thumbnailElement);
  });
  return containerElement.append(fragment);
};

export {createThumbnails};


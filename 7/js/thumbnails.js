const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnails = (photos, element) => {
  const fragment = document.createDocumentFragment();
  photos.forEach(({id, url, description, likes, comments}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    const thumbnailImage = thumbnailElement.querySelector('.picture__img');
    thumbnailImage.dataset.id = id;
    thumbnailImage.src = url;
    thumbnailImage.alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(thumbnailElement);
  });
  return element.append(fragment);
};

export {createThumbnails};


const COMMENT_COUNT = 5;

const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');

// Проверка на случай, если комментариев меньше 5.

const checkCommentsCount = (comments) => {
  if (comments.length < 5) {
    return comments.length;
  }
  return COMMENT_COUNT;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImage = commentElement.querySelector('.social__picture');
    commentImage.src = avatar;
    commentImage.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    fragment.append(commentElement);
  });
  commentsList.innerHTML = '';
  commentsList.append(fragment);
};

export {checkCommentsCount, renderComments};

const COMMENT_COUNT = 5;

const commentsListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const commentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

// Проверка на случай, если комментариев меньше 5.

const checkCommentsCount = (comments) => {
  if (comments.length < 5) {
    return comments.length;
  }
  return COMMENT_COUNT;
};

const getComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImageElement = commentElement.querySelector('.social__picture');
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const changeCommentCount = (comments) => {
  commentCountElement.querySelector('.social__comment-shown-count').textContent = checkCommentsCount(comments);
  commentCountElement.querySelector('.social__comment-total-count').textContent = comments.length;
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  changeCommentCount(comments);
  comments.forEach((comment) => {
    fragment.append(getComment(comment));
  });
  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
};

export {renderComments};

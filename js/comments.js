const COMMENT_COUNT = 5;

const commentsListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const commentCountElement = document.querySelector('.social__comment-count');
const commentCountShownElement = commentCountElement.querySelector('.social__comment-shown-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

let bigPictureComments = [];

// Проверка на случай, если комментариев меньше 5.

const checkCommentsCount = (comments) => {
  if (comments.length < 5) {
    return comments.length;
  }
  return COMMENT_COUNT;
};

// Проверка обновлённого счётчика.

const checkNewCommentsCount = (currentCount, comments) => {
  const newCount = currentCount += COMMENT_COUNT;
  if (newCount > comments.length) {
    return comments.length;
  }
  return newCount;
};

const getComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImageElement = commentElement.querySelector('.social__picture');
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const renderCommentCount = (comments) => {
  commentCountShownElement.textContent = checkCommentsCount(comments);
  commentCountElement.querySelector('.social__comment-total-count').textContent = comments.length;
};

const renderMoreComments = () => {
  const fragment = document.createDocumentFragment();
  for (let i = commentCountShownElement.textContent; i < checkNewCommentsCount(+commentCountShownElement.textContent, bigPictureComments); i++) {
    const currentComment = bigPictureComments[i];
    fragment.append(getComment(currentComment));
  }
  commentsListElement.append(fragment); // рисует и прибавляет 5 комментариев
  commentCountShownElement.textContent = checkNewCommentsCount(+commentCountShownElement.textContent, bigPictureComments); // обновляет счётчик
  if (+commentCountShownElement.textContent === bigPictureComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } // скрывает кнопку, когда максимум по счётчику
};

const renderComments = (comments) => {
  bigPictureComments = comments;
  const fragment = document.createDocumentFragment();
  renderCommentCount(comments);
  for (let i = 0; i < checkCommentsCount(comments); i++) {
    const currentComment = comments[i];
    fragment.append(getComment(currentComment));
  }
  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
  commentsLoaderElement.classList.remove('hidden');
  if (+commentCountShownElement.textContent === comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

export {renderComments, renderMoreComments};

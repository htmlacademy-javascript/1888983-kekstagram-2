const COMMENT_COUNT = 5;

const commentsListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const commentCountElement = document.querySelector('.social__comment-count');
const commentCountShownElement = commentCountElement.querySelector('.social__comment-shown-count');
const commentCountTotalElement = commentCountElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

let comments;
let shownComments = 0;

const getComment = ({avatar, message, name}) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImageElement = commentElement.querySelector('.social__picture');
  commentImageElement.src = avatar;
  commentImageElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const renderComments = (initialComments) => {
  if (initialComments) {
    comments = initialComments;
    shownComments = 0;
    commentsListElement.innerHTML = '';
    commentsLoaderElement.classList.remove('hidden');
    commentCountTotalElement.textContent = initialComments.length;
  }

  const newCommentsCount = Math.min(comments.length, shownComments + COMMENT_COUNT);

  const fragment = document.createDocumentFragment();
  for (let i = shownComments; i < newCommentsCount; i++) {
    fragment.append(getComment(comments[i]));
  }
  commentsListElement.append(fragment);

  shownComments = newCommentsCount;
  commentCountShownElement.textContent = shownComments;

  if (shownComments === comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

commentsLoaderElement.addEventListener('click', () => {
  renderComments();
});

export {renderComments};

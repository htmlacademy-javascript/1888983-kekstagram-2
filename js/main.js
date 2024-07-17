const PHOTO_COUNT = 25;

const rangeValues = {
  ZERO: 0,
  ONE: 1,
  AVATARMAX: 6,
  LIKESMIN: 15,
  LIKESMAX: 200,
  COMMENTMAX: 30,
};

const DESCRIPTIONS = [
  'Это кот',
  'Мегаваза',
  'Закат',
  'Рассвет',
  'Абстракция',
  'Депрессия',
  'Фоткаю то, не знаю что',
  'Красотища',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Василий',
  'Артём',
  'Саша',
  'Маша',
  'Катя',
  'Валерия',
  'Надежда',
  'Декстер',
];

const getId = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getPhotoId = getId();
const generateCommentId = getId();
const getRandomArrayElement = (items) => items[getRandomInteger(rangeValues.ZERO, items.length - 1)];
const getMessage = (items) => {
  const firstMessage = getRandomArrayElement(items);
  const secondMessage = getRandomArrayElement(items);
  if (firstMessage === secondMessage) {
    return `${firstMessage}`;
  } else {
    return `${firstMessage} ${secondMessage}`;
  }
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(rangeValues.ONE, rangeValues.AVATARMAX)}.svg`,
  message: getMessage(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => {
  const photoId = getPhotoId();
  return ({
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(rangeValues.LIKESMIN, rangeValues.LIKESMAX),
    comments: Array.from({length: getRandomInteger(rangeValues.ZERO, rangeValues.COMMENTMAX)}, createComment),
  });
};

const getPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

getPhotos();

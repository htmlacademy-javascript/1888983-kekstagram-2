const PHOTO_DATA_COUNT = 25;

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

const getID = () => {
  let lastGeneratedID = 0;
  return function () {
    lastGeneratedID += 1;
    return lastGeneratedID;
  };
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generatePhotoID = getID();
const generatePhotoURL = getID();
const generateCommentID = getID();
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];
const getMessage = (array) => {
  const firstMessage = getRandomArrayElement(array);
  const secondMessage = getRandomArrayElement(array);
  if (firstMessage === secondMessage) {
    return `${firstMessage}`;
  } else {
    return `${firstMessage} ${secondMessage}`;
  }
};

const createCommentData = () => ({
  id: generateCommentID(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getMessage(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoData = () => ({
  id: generatePhotoID(),
  url: `photos/${generatePhotoURL()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createCommentData),
});

const photoData = Array.from({length: PHOTO_DATA_COUNT}, createPhotoData);

const getPhotoData = () => photoData;

getPhotoData();

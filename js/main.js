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
const generatePhotoNumber = getID();
const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const createPhotoData = () => ({
  id: generatePhotoID(),
  url: 'photos/' + generatePhotoNumber() + '.jpg',
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: {
    id: ,
    avatar: ,
   message: ,
   name: ,
  };
});

const photoData = Array.from({length: PHOTO_DATA_COUNT}, createPhotoData);

console.log(photoData);

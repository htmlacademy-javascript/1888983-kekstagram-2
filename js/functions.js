function checkMaxLegth (string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let backwardString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    backwardString += normalizedString[i];
  }
  return backwardString === normalizedString;
}

function getNumbers (string) {
  string = string.toString().replaceAll(' ', '');
  let numbers = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(string[i] * 10)) {
      numbers += parseInt(string[i], 10);
    }
  }

  return numbers.length ? numbers : NaN;
}

checkMaxLegth('проверяемая строка', 15);
checkPalindrome('Лёша на полке клопа нашёл');
getNumbers('33 коровы и 38 попугаев');

// Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

// Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

// Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

const convertToMin = (hours) => {
  const times = hours.split(':');
  const minutes = (times[0] * 60) + +times[1];
  return minutes;
};

const checkMeetingLength = (dayStart, dayEnd, meetingStart, meetingLength) => {
  const dayStartMin = convertToMin(dayStart);
  const dayEndMin = convertToMin(dayEnd);
  const meetingStartMin = convertToMin(meetingStart);
  const meetingActual = dayEndMin - meetingStartMin;
  if (dayStartMin > meetingStartMin) {
    return false;
  }
  return meetingActual >= meetingLength;
};

checkMeetingLength('5:00', '20:30', '05:00', 200);

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

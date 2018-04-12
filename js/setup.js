'use strict';

var generateRandomValue = function (itemList) {
  return itemList[Math.floor(Math.random() * itemList.length)];
};

var generateRandomWizard = function (firstNameList, lastNameList, coalColorList, eyesColorList) {

  var randomWizard = {};

  randomWizard.wizardName = generateRandomValue(firstNameList) + ' ' + generateRandomValue(lastNameList);
  randomWizard.wizardCoatColor = generateRandomValue(coalColorList);
  randomWizard.wizardEyesColor = generateRandomValue(eyesColorList);

  return randomWizard;
};

var FIRST_NAME_LIST = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var LAST_NAME_LIST = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLOR_LIST = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLOR_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR_LIST = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardList = [];

for (var i = 0; i < 4; i++) {
  wizardList[i] = generateRandomWizard(FIRST_NAME_LIST, LAST_NAME_LIST, COAT_COLOR_LIST, EYES_COLOR_LIST);
}

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.wizardName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.wizardCoatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.wizardEyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < wizardList.length; i++) {
  fragment.appendChild(renderWizard(wizardList[i]));
}

similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');


// Работа с обработчиком событий
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardEyesBlock = setup.querySelector('.wizard-eyes');
var wizardFireballBlock = setup.querySelector('.setup-fireball-wrap');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setWizardEyesColor = function () {
  var randomColor = generateRandomValue(EYES_COLOR_LIST);
  wizardEyesBlock.style.fill = randomColor;
  setup.querySelector('.setup-wizard-eyes').value = randomColor;
};

var setWizardFireballColor = function () {
  var randomColor = generateRandomValue(FIREBALL_COLOR_LIST);
  wizardFireballBlock.style.backgroundColor = randomColor;
  setup.querySelector('.setup-fireball-color').value = randomColor;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardEyesBlock.addEventListener('click', setWizardEyesColor);
  wizardFireballBlock.addEventListener('click', setWizardFireballColor);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardEyesBlock.removeEventListener('click', setWizardEyesColor);
  wizardFireballBlock.removeEventListener('click', setWizardFireballColor);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = document.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Пара символов... маловато');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('В бой без имени?');
  } else {
    userNameInput.setCustomValidity('');
  }
});

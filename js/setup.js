'use strict';

document.querySelector('.setup').classList.remove('hidden');

var genRandValue = function (itemList) {
  return itemList[Math.floor(Math.random() * itemList.length)];
};

var genRandomWizzard = function (firstNameList, lastNameList, coalColorList, eyesColorList) {

  var randomWizard = {};

  randomWizard.wizardName = genRandValue(firstNameList) + ' ' + genRandValue(lastNameList);
  randomWizard.wizardCoatColor = genRandValue(coalColorList);
  randomWizard.wizardEyesColor = genRandValue(eyesColorList);

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

var wizardList = [];

for (var i = 0; i < 4; i++) {
  wizardList[i] = genRandomWizzard(FIRST_NAME_LIST, LAST_NAME_LIST, COAT_COLOR_LIST, EYES_COLOR_LIST);
}

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizzardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizzardTemplate.cloneNode(true);

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

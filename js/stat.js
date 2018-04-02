'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var FONT_GAP = 30;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var YOUR_BAR_COLOR = 'rgba(255, 0, 0, 1)';

var getRandColor = function () {
  return 'hsl(' + Math.floor(Math.random() * 360) + ', ' + Math.floor(Math.random() * 100) +
		'%, ' + Math.floor(Math.random() * 100) + '%)';
};

var drawCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var drawBar = function (ctx, color, i, heightInPx) {
  ctx.fillStyle = color;
  ctx.fillRect(CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - 40 - heightInPx, BAR_WIDTH, heightInPx);
};

var drawBarText = function (ctx, text, i, verticalOffset) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_Y + verticalOffset);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {

  drawCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  drawBarText(ctx, 'Ура вы победили!', 0, FONT_GAP);
  drawBarText(ctx, 'Список результатов:', 0, 1.5 * FONT_GAP);

  var maxBarHeight = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    var barItemHeight = (times[i] * BAR_HEIGHT) / maxBarHeight;

    if (names[i] === 'Вы') {
      drawBar(ctx, YOUR_BAR_COLOR, i, barItemHeight);
    } else {
      drawBar(ctx, getRandColor(), i, barItemHeight);
    }

    drawBarText(ctx, Math.round(times[i]), i, CLOUD_HEIGHT - 50 - barItemHeight);
    drawBarText(ctx, names[i], i, CLOUD_HEIGHT - 20);
  }

};

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

var drawCloud = function(ctx, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  
  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {

	drawCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
	drawCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

	ctx.fillStyle = '#000';
	ctx.font = '16px PT Mono';
	ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
	ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + 1.5 * FONT_GAP);

	var maxBarHeight = getMaxElement(times);

	for(var i = 0; i < names.length; i++) {

		var barItemHeight = (times[i] * BAR_HEIGHT) / maxBarHeight;

		names[i] == 'Вы' ? ctx.fillStyle = YOUR_BAR_COLOR : 
			ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';

		ctx.fillRect(CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - 40 - barItemHeight, 
			BAR_WIDTH, barItemHeight);

		ctx.fillStyle = '#000';
		ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), 
			CLOUD_Y + CLOUD_HEIGHT - 50 - barItemHeight);
		ctx.fillText(names[i], CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - 20);
	};

}
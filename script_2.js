const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

const personalities = ['split', 'steal', 'police'];

var trees = 100 * personalities.length;
var creatures = trees * 2;

const graphDims = [window.innerWidth - 40, window.innerHeight/2 - 60]; 
var graph = [[], [], [], creatures];
const gHund = 100;
const gZero = graphDims[1];

const statsGraphDims = [graphDims[0], graphDims[1]]
var statsGraph = [[], [], creatures];
const sHund = 100;
const sZero = statsGraphDims[1] + window.innerHeight/2;


function update() {
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, cvs.width, cvs.height);
	ctx.fillStyle = 'white';
	ctx.font = '20px Arial';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'bottom';
	ctx.fillText('Split or Steal', 10, 25);
	ctx.strokeStyle = 'white';
	ctx.strokeRect(20, 40, graphDims[0], graphDims[1]);
	ctx.strokeRect(20, 40 + window.innerHeight/2, statsGraphDims[0], statsGraphDims[1]);
	ctx.moveTo(60, 80);
	ctx.lineTo(60, graphDims[1]);
	ctx.lineTo(graphDims[0]-20, graphDims[1]);
	ctx.moveTo(60, 80 + window.innerHeight/2);
	ctx.lineTo(60, statsGraphDims[1] + window.innerHeight/2);
	ctx.lineTo(statsGraphDims[0]-20, statsGraphDims[1] + window.innerHeight/2);
	ctx.stroke();
	ctx.textAlign = 'right';
	ctx.textBaseline = 'middle';
	ctx.fillText('0', 55, graphDims[1]);
	ctx.fillText('100', 55, 100);
	ctx.fillText('50', 55, (graphDims[1]+100)/2);
	ctx.fillText('75', 55, (graphDims[1]+100*3)/4);
	ctx.fillText('25', 55, (graphDims[1]*3+100)/4);
	ctx.fillText('0', 55, statsGraphDims[1] + window.innerHeight/2);
	ctx.fillText('100', 55, 100 + window.innerHeight/2);
	ctx.fillText('50', 55, (statsGraphDims[1]+100)/2 + window.innerHeight/2);
	ctx.fillText('75', 55, (statsGraphDims[1]+100*3)/4 + window.innerHeight/2);
	ctx.fillText('25', 55, (statsGraphDims[1]*3+100)/4 + window.innerHeight/2);


	drawGraph();
}
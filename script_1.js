/*
Simulation One.

Simulating a simple civilisation with a few rules.
*/

const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

class Creature {
	constructor(personality) {
		this.prs = personality;
		this.age = 0;
		this.descendants = 0;
		this.chosenTree = null;
	}
}

const personalities = ['split', 'steal', 'police'];

var trees = 100 * personalities.length;
var creatures = trees * 2;


var population = [];
for (let i = 0; i < creatures; i++) {
	population.push(new Creature(personalities[i % personalities.length]));
}

const graphDims = [window.innerWidth - 40, window.innerHeight/2 - 60]; 
var graph = [[], [], [], creatures];
const gHund = 100;
const gZero = graphDims[1];

const statsGraphDims = [graphDims[0], graphDims[1]]
var statsGraph = [[], [], creatures];
const sHund = 100;
const sZero = statsGraphDims[1] + window.innerHeight/2;

function drawStatsGraph() {
	if (statsGraph[0].length > 0 && statsGraph[1].length > 0) {
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(0, 153, 255)';
		ctx.moveTo(60, sZero - statsGraph[0][0]*(sZero-sHund)/100);
		for (let i = 0; i < statsGraph[0].length; i++) {
			ctx.lineTo(60 + 10 * i, sZero - statsGraph[0][i] * ( sZero - sHund ) / 100);
		}
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(255, 153, 0)';
		ctx.moveTo(60, sZero - statsGraph[1][0]*(sZero-sHund)/100);
		for (let i = 0; i < statsGraph[1].length; i++) {
			ctx.lineTo(60 + 10 * i, sZero - (statsGraph[1][i] + statsGraph[0][i]) * ( sZero - sHund ) / 100);
		}
		ctx.stroke();
	}
}

function drawGraph() {
	drawStatsGraph();
	if (graph[0].length > 0 && graph[1].length > 0) {
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(0, 0, 255)';
		ctx.moveTo(60, gZero - graph[0][0]*(gZero-gHund)/100);
		for (let i = 0; i < graph[0].length; i++) {
			ctx.lineTo(60 + 10 * i, gZero - graph[0][i] * ( gZero - gHund ) / 100);
		}
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(255, 0, 0)';
		ctx.moveTo(60, gZero - graph[1][0]*(gZero-gHund)/100);
		for (let i = 0; i < graph[1].length; i++) {
			ctx.lineTo(60 + 10 * i, gZero - (graph[1][i] + graph[0][i]) * ( gZero - gHund ) / 100);
		}
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(0, 255, 0)';
		ctx.moveTo(60, gZero - graph[2][0]*(gZero-gHund)/100);
		for (let i = 0; i < graph[2].length; i++) {
			ctx.lineTo(60 + 10 * i, gZero - (graph[2][i] + graph[1][i] + graph[0][i]) * ( gZero - gHund ) / 100);
		}
		ctx.stroke();

		// making them stacked
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(0, 0, 255)';
		ctx.moveTo(60, gZero - graph[0][0]*(gZero-gHund)/100);
		for (let i = 0; i < graph[0].length; i++) {
			ctx.lineTo(60 + 10 * i, gZero - graph[0][i] * ( gZero - gHund ) / 100);
		}
		ctx.lineTo(60 + 10 * (graph[0].length - 1), gZero);
		ctx.lineTo(60, gZero);
		ctx.fillStyle = 'rgba(0, 0, 255, 0.25)';
		ctx.fill();
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(255, 0, 0)';
		ctx.moveTo(60, gZero - graph[1][0]*(gZero-gHund)/100);
		for (let i = 0; i < graph[1].length; i++) {
			ctx.lineTo(60 + 10 * i, gZero - (graph[1][i] + graph[0][i]) * ( gZero - gHund ) / 100);
		}
		for (let i = graph[0].length - 1; i >= 0; i--) {
			ctx.lineTo(60 + 10 * i, gZero - graph[0][i] * ( gZero - gHund ) / 100);
		}
		ctx.fillStyle = 'rgba(255, 0, 0, 0.25)';
		ctx.fill();
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(0, 255, 0)';
		ctx.moveTo(60, gZero - graph[2][0]*(gZero-gHund)/100);
		for (let i = 0; i < graph[2].length; i++) {
			ctx.lineTo(60 + 10 * i, gZero - (graph[2][i] + graph[1][i] + graph[0][i]) * ( gZero - gHund ) / 100);
		}
		for (let i = graph[1].length - 1; i >= 0; i--) {
			ctx.lineTo(60 + 10 * i, gZero - (graph[1][i] + graph[0][i]) * ( gZero - gHund ) / 100);
		}
		ctx.fillStyle = 'rgba(0, 255, 0, 0.25)';
		ctx.fill();
		
	} else {
		console.log('first iteration');
	}
}

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

function start() {
	cvs.width = window.innerWidth;
	cvs.height = window.innerHeight;
	analyse();
	update();
	iterate(0);
}

function analyse() {
	let split = 0;
	let steal = 0;
	let police = 0;
	let totalAge = 0;
	let totalDescendants = 0;
	for (let i = 0; i < population.length; i++) {
		if (population[i].prs == 'split') {
			split++;
		} else if (population[i].prs == 'steal') {
			steal++;
		} else {
			police++;
		}
		totalAge += population[i].age;
		totalDescendants += population[i].descendants;
	}
	graph[3] = split + steal + police;
	graph[0].push(split/graph[3]*100);
	graph[1].push(steal/graph[3]*100);
	graph[2].push(police/graph[3]*100);
	if (graph[0].length > (graphDims[0]-70)/10) {
		graph[0].shift();
	}
	if (graph[1].length > (graphDims[0]-70)/10) {
		graph[1].shift();
	}
	if (graph[2].length > (graphDims[0]-70)/10) {
		graph[2].shift();
	}
	statsGraph[0].push(totalAge/population.length);
	statsGraph[1].push(totalDescendants/population.length);
	if (statsGraph[0].length > (statsGraphDims[0]-70)/10) {
		statsGraph[0].shift();
	}
	if (statsGraph[1].length > (statsGraphDims[0]-70)/10) {
		statsGraph[1].shift();
	}
}

function iterate(n) {
	let treesArray = [];
	for (let i = 0; i < trees; i++) {
		treesArray.push([]);
	}
	let killed = [];
	let born = [];
	for (let i = 0; i < population.length; i++) {
		population[i].age++;
		population[i].chosenTree = null;
		let tries = 0;
		while (population[i].chosenTree == null) {
			population[i].chosenTree = Math.floor(Math.random() * trees);
			if (treesArray[population[i].chosenTree].length > 2) {
				population[i].chosenTree = null;
				tries++;
			}
			if (tries > 25) {	
				for (let j = 0; j < treesArray.length; j++) {
					if (treesArray[j].length < 2) {
						population.chosenTree = j;
					}
				}
				if (population[i].chosenTree == null) {
					killed.push(i);
				}
			}
		}
		treesArray[population[i].chosenTree].push(i);
	}
	for (let i = 0; i < trees; i++) {
		if (treesArray[i].length > 0) {
			if (treesArray[i].length > 1) {
				if (population[treesArray[i][0]].prs != population[treesArray[i][1]].prs) {
					if (population[treesArray[i][0]].prs == 'split' && population[treesArray[i][1]].prs == 'steal') {
						if (Math.random() > 0.5) {
							population[treesArray[i][1]].descendants++;
							born.push('steal');
						}
						if (Math.random() > 0.5) {
							killed.push(treesArray[i][0]);
						}
					} else if (population[treesArray[i][0]].prs == 'steal' && population[treesArray[i][1]].prs == 'split') {
						if (Math.random() > 0.5) {
							population[treesArray[i][0]].descendants++;
							born.push('steal');
						}
						if (Math.random() > 0.5) {
							killed.push(treesArray[i][1]);
						}
					} else if (population[treesArray[i][0]].prs == 'police' && population[treesArray[i][1]].prs == 'steal') {
						killed.push(treesArray[i][1]);
						population[treesArray[i][0]].descendants++;
						born.push('police');
					} else if (population[treesArray[i][0]].prs == 'steal' && population[treesArray[i][1]].prs == 'police') {
						killed.push(treesArray[i][0]);
						population[treesArray[i][1]].descendants++;
						born.push('police');
					} else if (population[treesArray[i][0]].prs == 'split' && population[treesArray[i][1]].prs == 'police') {
						if (Math.random() > 0.5) {	
							killed.push(treesArray[i][1]);
						}
						if (Math.random() > 0.5) {
							population[treesArray[i][0]].descendants++;
							born.push('split');
						}
					} else if (population[treesArray[i][0]].prs == 'police' && population[treesArray[i][1]].prs == 'split') {
						if (Math.random() > 0.5) {
							killed.push(treesArray[i][0]);
						}
						if (Math.random() > 0.5)  {
							population[treesArray[i][1]].descendants++;
							born.push('split');
						}
					}
				} else if (population[treesArray[i][0]].prs == 'steal' && population[treesArray[i][1]].prs == 'steal') {
					killed.push(treesArray[i][0]);
					killed.push(treesArray[i][1]);
				}
			} else {
				population[treesArray[i][0]].descendants++;
				born.push(population[treesArray[i][0]].prs);
			}
		}
	}
	killed.sort();
	for (let i = killed.length - 1; i >= 0; i--) {
		population.splice(killed[i], 1);
	}
	for (let i = 0; i < born.length; i++) {
		if (Math.random() > 0.9) {
			population.push(new Creature(born[i]));
		} else {
			population.push(new Creature(personalities[Math.floor(Math.random() * personalities.length)]));
		}
	}
	
	
	console.log(n);
	analyse();
	update();
	setTimeout(() => {
		if (n % 2500 == 0 && n != 0) {
			console.log('tick');
			setTimeout(() => {
				iterate(n+1);
			}, 1000);
		} else {
			iterate(n+1);
		}
	}, 10);
}

start();
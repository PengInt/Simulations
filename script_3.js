/*
Simulation Three.

Simulating a simplified version of evolution with a few rules.
*/

const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, cvs.width, cvs.height);

class Creature {
	constructor(DNA) {
		this.sex = Math.random() > 0.5 ? 'male' : 'female';
		this.dna = DNA;
		this.age = 0;
		this.descendants = 0;
	}
	hasGenome(gName) {
		for (let i = 0; i < this.dna.active.length; i++) {
			if (this.dna.active[i][0].name == gName) {
				return true;
			}
		}
		return false;
	}
	getGenome(gName) {
		for (let i = 0; i < this.dna.active.length; i++) {
			if (this.dna.active[i][0].name == gName) {
				return this.dna.active[i];
			}
		}
	}
	getGenomeStrength(gName) {
		for (let i = 0; i < this.dna.active.length; i++) {
			if (this.dna.active[i][0].name == gName) {
				return this.dna.active[i][1];
			}
		}
		return 0;
	}
}

class Genome {
	constructor(name, position, recessive) {
		this.name = name;
		this.position = position;
		this.recessive = recessive;
	}
}

function toDict(genomes) {
	let dict = {};
	for (let i = 0; i < genomes.length; i++) {
		dict[genomes[i].name] = genomes[i];
	}
	return dict;
}

const genomes = [
					new Genome('Camo Desert 1', 0, 0),
					new Genome('Camo Desert 2', 0, 0),
					new Genome('Camo Desert 3', 0, 1),
					new Genome('Camo Desert 4', 0, 1),
					new Genome('Camo Forest 1', 0, 0),
					new Genome('Camo Forest 2', 0, 0),
					new Genome('Camo Forest 3', 0, 1),
					new Genome('Camo Forest 4', 0, 1),
					new Genome ('Camo Snow 1', 0, 1),
					new Genome('Camo Snow 2', 0, 1),
					new Genome('Camo Snow 3', 0, 1),
					new Genome('Camo Snow 4', 0, 1),
					new Genome('Reach 1', 1, 0),
					new Genome('Reach 2', 1, 1),
					new Genome('Speed 1', 2, 0),
					new Genome('Speed 2', 2, 0),
					new Genome('Speed 3', 2, 1),
					new Genome('Speed 4', 2, 1),
					new Genome('Armour 1', 2, 0),
					new Genome('Armour 2', 2, 1),
					new Genome('Strength 1', 3, 0),
					new Genome('Strength 2', 3, 1),
					new Genome('Energy 1', 4, 0),
					new Genome('Energy 2', 4, 1),
					new Genome('Energy 3', 4, 1),
					new Genome('Herd 2', 4, 0),
					new Genome('Herd 5', 4, 1),
					new Genome('Herd 10', 4, 1),
					new Genome('Herd 20', 4, 1),
					new Genome('Herd Unlimited', 5, 1),
					new Genome('Mace Tail', 5, 0),
					new Genome('Spikes', 5, 0),
					new Genome('Spike Tail', 5, 1),
					new Genome('Hearing 1', 6, 0),
					new Genome('Hearing 2', 6, 1),
					new Genome('Swimming 1', 7, 0),
					new Genome('Swimming 2', 7, 0),
					new Genome('Swimming 3', 7, 1),
					new Genome('Air Breathing', 8, 0),
					new Genome('Water Breathing', 8, 1),
					new Genome('Claws', 9, 0),
					new Genome('Fangs', 9, 0),
					new Genome('Venom Fangs', 9, 1),
					new Genome('Venom Claws', 9, 1),
					new Genome('Venom Spikes', 9, 1),
					new Genome('Venom Stinger', 9, 1)
				 ]; const genomesDict = toDict(genomes);

const mutations = {
					'Camo Desert 1': ['Camo Desert 2', 'Camo Forest 1', 'Camo Snow 1'],
				    'Camo Desert 2': ['Camo Desert 1', 'Camo Desert 3'],
				    'Camo Desert 3': ['Camo Desert 2', 'Camo Desert 4'],
				    'Camo Desert 4': ['Camo Desert 3'],
				    'Camo Forest 1': ['Camo Desert 1', 'Camo Forest 2', 'Camo Snow 1'],
				    'Camo Forest 2': ['Camo Forest 1', 'Camo Forest 3'],
				    'Camo Forest 3': ['Camo Forest 2', 'Camo Forest 4'],
				    'Camo Forest 4': ['Camo Forest 3'],
				    'Camo Snow 1': ['Camo Desert 1', 'Camo Forest 1', 'Camo Snow 2'],
				    'Camo Snow 2': ['Camo Snow 1', 'Camo Snow 3'],
				    'Camo Snow 3': ['Camo Snow 2', 'Camo Snow 4'],
				    'Camo Snow 4': ['Camo Snow 3'],
				    'Reach 1': ['Reach 2'],
				    'Reach 2': ['Reach 1'],
				    'Speed 1': ['Speed 2'],
				    'Speed 2': ['Speed 1', 'Speed 3'],
				    'Speed 3': ['Speed 2', 'Speed 4'],
				    'Speed 4': ['Speed 3'],
				    'Strength 1': ['Strength 2'],
				    'Strength 2': ['Strength 1'],
				    'Energy 1': ['Energy 2', 'Herd 2'],
				    'Energy 2': ['Energy 1', 'Energy 3'],
				    'Energy 3': ['Energy 2'],
				    'Mace Tail': ['Spike Tail'],
				    'Spike Tail': ['Mace Tail', 'Spikes'],
				    'Hearing 1': ['Hearing 2'],
				    'Hearing 2': ['Hearing 1'],
				    'Swimming 1': ['Swimming 2'],
				    'Swimming 2': ['Swimming 1', 'Swimming 3'],
				    'Swimming 3': ['Swimming 2'],
				    'Air Breathing': ['Water Breathing'],
				    'Water Breathing': ['Air Breathing'],
				    'Claws': ['Fangs', 'Venom Claws'],
				    'Fangs': ['Claws', 'Venom Fangs'],
				    'Venom Fangs': ['Venom Claws', 'Fangs', 'Venom Spikes', 'Venom Stinger'],
				    'Venom Claws': ['Venom Fangs', 'Claws', 'Venom Spikes', 'Venom Stinger'],
				    'Venom Spikes': ['Venom Stinger', 'Venom Claws', 'Venom Fangs'],
				    'Venom Stinger': ['Venom Spikes', 'Venom Fangs', 'Venom Claws'],
				    'Armour 1': ['Armour 2'],
				    'Armour 2': ['Armour 1'],
				    'Spikes': ['Spike Tail'],
					'Herd 2': ['Herd 5', 'Energy 1'],
					'Herd 5': ['Herd 2', 'Herd 10'],
					'Herd 10': ['Herd 5', 'Herd 20'],
					'Herd 20': ['Herd 10', 'Herd Unlimited'],
					'Herd Unlimited': ['Herd 20']
				   }

const moves = {
				'Hit 1': {'Energy': 5, 'Damage': 5},
				'Hit 2': {'Energy': 10, 'Damage': 11.25},
				'Hit 3': {'Energy': 15, 'Damage': 20},
				'Block 1': {'Energy': 2.5, 'Block': 0.7},
				'Block 2': {'Energy': 3.5, 'Block': 0.9},
				'Penetrate 1': {'Energy': 10, 'Damage': 10},
				'Penetrate 2': {'Energy': 15, 'Damage': 20},
				'Dodge 1': {'Energy': 2.5, 'Dodge': 0.4},
				'Dodge 2': {'Energy': 3.5, 'Dodge': 0.65},
				'Dodge 3': {'Energy': 4.5, 'Dodge': 0.8},
				'Dodge 4': {'Energy': 5.5, 'Dodge': 0.9},
				'Mace Swing 1': {'Energy': 10, 'Damage': 15},
				'Mace Swing 2': {'Energy': 15, 'Damage': 25},
				'Mace Swing 3': {'Energy': 20, 'Damage': 40},
				'Spike Tail Swing 1': {'Energy': 10, 'Damage': 12.5},
				'Spike Tail Swing 2': {'Energy': 15, 'Damage': 20},
				'Spike Tail Swing 3': {'Energy': 20, 'Damage': 27.5},
				'Venom Spike Tail Swing 1': {'Energy': 10, 'Damage': 17.5},
				'Venom Spike Tail Swing 2': {'Energy': 15, 'Damage': 30},
				'Venom Spike Tail Swing 3': {'Energy': 20, 'Damage': 50},
				'Claw Slash 1': {'Energy': 5, 'Damage': 7.5},
				'Claw Slash 2': {'Energy': 10, 'Damage': 16.125},
				'Claw Slash 3': {'Energy': 15, 'Damage': 25},
				'Venom Claw Slash 1': {'Energy': 5, 'Damage': 10},
				'Venom Claw Slash 2': {'Energy': 10, 'Damage': 22.5},
				'Venom Claw Slash 3': {'Energy': 15, 'Damage': 35},
				'Bite 1': {'Energy': 5, 'Damage': 5.5},
				'Bite 2': {'Energy': 10, 'Damage': 12.5},
				'Bite 3': {'Energy': 15, 'Damage': 18.875},
				'Venom Bite 1': {'Energy': 5, 'Damage': 11},
				'Venom Bite 2': {'Energy': 10, 'Damage': 25},
				'Venom Bite 3': {'Energy': 15, 'Damage': 37.75},
				'Venom Sting': {'Energy': 10, 'Damage': 50}
			   }

function hasMove(cMoves, mName) {
	for (let i = 0; i < cMoves.length; i++) {
		if (cMoves[i] == mName) {
			return true;
		}
	}
	return false;
}

function chooseStarter(a, b, speedDif, biome) {
	let balance = 0;  // positive -> a, negative -> b
	if ((a.hasGenome('Camo Desert 1') && biome == 'Desert') || (a.hasGenome('Camo Forest 1') && biome == 'Forest') || (a.hasGenome('Camo Snow 1') && biome == 'Snow')) {
		balance += 3;
	} else if ((a.hasGenome('Camo Desert 2') && biome == 'Desert') || (a.hasGenome('Camo Forest 2') && biome == 'Forest') || (a.hasGenome('Camo Snow 2') && biome == 'Snow')) {
		balance += 7;
	} else if ((a.hasGenome('Camo Desert 3') && biome == 'Desert') || (a.hasGenome('Camo Forest 3') && biome == 'Forest') || (a.hasGenome('Camo Snow 3') && biome == 'Snow')) {
		balance += 12;
	} else if ((a.hasGenome('Camo Desert 4') && biome == 'Desert') || (a.hasGenome('Camo Forest 4') && biome == 'Forest') || (a.hasGenome('Camo Snow 4') && biome == 'Snow')) {
		balance += 18;
	}
	if ((b.hasGenome('Camo Desert 1') && biome == 'Desert') || (a.hasGenome('Camo Forest 1') && biome == 'Forest') || (a.hasGenome('Camo Snow 1') && biome == 'Snow')) {
		balance -= 3;
	} else if ((b.hasGenome('Camo Desert 2') && biome == 'Desert') || (b.hasGenome('Camo Forest 2') && biome == 'Forest') || (b.hasGenome('Camo Snow 2') && biome == 'Snow')) {
		balance -= 7;
	} else if ((b.hasGenome('Camo Desert 3') && biome == 'Desert') || (b.hasGenome('Camo Forest 3') && biome == 'Forest') || (b.hasGenome('Camo Snow 3') && biome == 'Snow')) {
		balance -= 12;
	} else if ((b.hasGenome('Camo Desert 4') && biome == 'Desert') || (b.hasGenome('Camo Forest 4') && biome == 'Forest') || (b.hasGenome('Camo Snow 4') && biome == 'Snow')) {
		balance -= 18;
	}
	if (a.hasGenome('Reach 1')) {
		balance += 2;
	} else if (a.hasGenome('Reach 2')) {
		balance += 5;
	}
	if (b.hasGenome('Reach 1')) {
		balance -= 2;
	} else if (b.hasGenome('Reach 2')) {
		balance -= 5;
	}
	for (let i = 0; i < Math.abs(speedDif); i++) {
		balance += 1 + 2 * i * (speedDif/Math.abs(speedDif));
	}
	if (a.hasGenome('Hearing 1')) {
		balance += 4;
	} else if (a.hasGenome('Hearing 2')) {
		balance += 9;
	}
	if (b.hasGenome('Hearing 1')) {
		balance -= 4;
	} else if (b.hasGenome('Hearing 2')) {
		balance -= 9;
	}
	if (a.hasGenome('Mace Tail')) {
		balance += 4;
	}
	if (b.hasGenome('Mace Tail')) {
		balance -= 4;
	}
	if (a.hasGenome('Spike Tail')) {
		balance += 5;
	}
	if (b.hasGenome('Spike Tail')) {
		balance -= 5;
	}
	if (a.hasGenome('Venom Spikes')) {
		balance += 6;
	}
	if (b.hasGenome('Venom Spikes')) {
		balance -= 6;
	}
	if (a.hasGenome('Venom Claws')) {
		balance += 5;
	}
	if (b.hasGenome('Venom Claws')) {
		balance -= 5;
	}
	if (a.hasGenome('Venom Fangs')) {
		balance += 5;
	}
	if (b.hasGenome('Venom Fangs')) {
		balance -= 5;
	}
	if (a.hasGenome('Venom Stinger')) {
		balance += 6;
	}
	if (b.hasGenome('Venom Stinger')) {
		balance -= 6;
	}
	if (a.hasGenome('Claws')) {
		balance += 3;
	}
	if (b.hasGenome('Claws')) {
		balance -= 3;
	}
	if (a.hasGenome('Fangs')) {
		balance += 3;
	}
	if (b.hasGenome('Fangs')) {
		balance -= 3;
	}
	if (a.hasGenome('Spikes')) {
		balance += 4;
	}
	if (b.hasGenome('Spikes')) {
		balance -= 4;
	}
	if (balance > 0) {
		return 'a' // a starts
	}
	if (balance < 0) {
		return 'b' // b starts
	}
	return 'n'     // random starts
}

function chooseMove(localMoves, energy, weights) {
	let total = 0;
	for (let i = 0; i < localMoves.length; i++) {
		total += weights[localMoves[i]];
	}
	let chosen = Math.random() * total;
	if (moves[localMoves[Math.floor(chosen / total * localMoves.length)]].Energy > energy) {
		return chooseMove(localMoves, energy, weights);
	}
	return localMoves[Math.floor(chosen / total * localMoves.length)]
}

function combat(a, b, biome) {
	let aHP = 100;
	let bHP = 100;
	let aSpeed = 10;
	let bSpeed = 10;
	let aMoves = [];
	let bMoves = [];
	let aEnergy = 50;
	let bEnergy = 50;
	let aArmourIntegrity = 0;
	let bArmourIntegrity = 0;
	let aPassiveDefence = 0;
	let bPassiveDefence = 0;
	if (a.hasGenome('Strength 1')) {
		aHP += 5 * a.getGenomeStrength('Strength 1');
		aMoves.push('Hit 2')
	} else if (a.hasGenome('Strength 2')) {
		aHP += 10 * a.getGenomeStrength('Strength 2');
		aMoves.push('Hit 3')    // can break armour 1 and for 5 hits break armour 2 down to 1
	} else {
		aMoves.push('Hit 1')
	}
	if (b.hasGenome('Strength 1')) {
		bHP += 5 * b.getGenomeStrength('Strength 1');
		bMoves.push('Hit 2')
	} else if (b.hasGenome('Strength 2')) {
		bHP += 10 * b.getGenomeStrength('Strength 2');
		bMoves.push('Hit 3')    // can break armour 1 and for 5 hits break armour 2 down to 1
	} else {
		bMoves.push('Hit 1')
	}
	if (a.hasGenome('Armour 1')) {
		aHP += 10 * a.getGenomeStrength('Armour 1');
		aArmourIntegrity = 100 * a.getGenomeStrength('Armour 1');
		aMoves.push('Block 1')
		if (a.hasGenome('Strength 1')) {
			aMoves.push('Penetrate 1')
		}
	} else if (a.hasGenome('Armour 2')) {
		bHP += 20 * b.getGenomeStrength('Armour 2');
		aArmourIntegrity = 200 * a.getGenomeStrength('Armour 2');
		aMoves.push('Block 2')
		if (a.hasGenome('Strength 2')) {
			aMoves.push('Penetrate 2')
		} else if (a.hasGenome('Strength 1')) {
			aMoves.push('Penetrate 1')
		}
	}
	if (b.hasGenome('Armour 1')) {
		bHP += 10 * b.getGenomeStrength('Armour 1');
		bArmourIntegrity = 100 * b.getGenomeStrength('Armour 1');
		bMoves.push('Block 1')
		if (b.hasGenome('Strength 1')) {
			bMoves.push('Penetrate 1')
		}
	} else if (b.hasGenome('Armour 2')) {
		bHP += 20 * b.getGenomeStrength('Armour 2');
		bArmourIntegrity = 200 * b.getGenomeStrength('Armour 2');
		bMoves.push('Block 2')
		if (b.hasGenome('Strength 2')) {
			bMoves.push('Penetrate 2')
		}
	}
	if (a.hasGenome('Speed 1')) {
		aSpeed += 1 * a.getGenomeStrength('Speed 1');
		if (b.hasGenome('Speed 1') || b.hasGenome('Speed 2') || b.hasGenome('Speed 3') || b.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else {
			aMoves.push('Dodge 1')
		}
	} else if (a.hasGenome('Speed 2')) {
		aSpeed += 2 * a.getGenomeStrength('Speed 2');
		if (b.hasGenome('Speed 2') || b.hasGenome('Speed 3') || b.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else if (b.hasGenome('Speed 1')) {
			aMoves.push('Dodge 1')
		} else {
			aMoves.push('Dodge 2')
		}
	} else if (a.hasGenome('Speed 3')) {
		aSpeed += 3 * a.getGenomeStrength('Speed 3');
		if (b.hasGenome('Speed 3') || b.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else if (b.hasGenome('Speed 2')) {
			aMoves.push('Dodge 1')
		} else if (b.hasGenome('Speed 1')) {
			aMoves.push('Dodge 2')
		} else {
			aMoves.push('Dodge 3')
		}
	} else if (a.hasGenome('Speed 4')) {
		aSpeed += 4 * a.getGenomeStrength('Speed 4');
		if (b.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else if (b.hasGenome('Speed 3')) {
			aMoves.push('Dodge 1')
		} else if (b.hasGenome('Speed 2')) {
			aMoves.push('Dodge 2')
		} else if (b.hasGenome('Speed 1')) {
			aMoves.push('Dodge 3')
		} else {
			aMoves.push('Dodge 4')
		}
	}
	if (b.hasGenome('Speed 1')) {
		bSpeed += 1 * b.getGenomeStrength('Speed 1');
		if (a.hasGenome('Speed 1') || a.hasGenome('Speed 2') || a.hasGenome('Speed 3') || a.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else {
			bMoves.push('Dodge 1')
		}
	} else if (b.hasGenome('Speed 2')) {
		bSpeed += 2 * b.getGenomeStrength('Speed 2');
		if (a.hasGenome('Speed 2') || a.hasGenome('Speed 3') || a.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else if (a.hasGenome('Speed 1')) {
			bMoves.push('Dodge 1')
		} else {
			bMoves.push('Dodge 2')
		}
	} else if (b.hasGenome('Speed 3')) {
		bSpeed += 3 * b.getGenomeStrength('Speed 3');
		if (a.hasGenome('Speed 3') || a.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else if (a.hasGenome('Speed 2')) {
			bMoves.push('Dodge 1')
		} else if (a.hasGenome('Speed 1')) {
			bMoves.push('Dodge 2')
		} else {
			bMoves.push('Dodge 3')
		}
	} else if (b.hasGenome('Speed 4')) {
		bSpeed += 4 * b.getGenomeStrength('Speed 4');
		if (a.hasGenome('Speed 4')) {
			// Non-superior speed - No dodge
		} else if (a.hasGenome('Speed 3')) {
			bMoves.push('Dodge 1')
		} else if (a.hasGenome('Speed 2')) {
			bMoves.push('Dodge 2')
		} else if (a.hasGenome('Speed 1')) {
			bMoves.push('Dodge 3')
		} else {
			bMoves.push('Dodge 4')
		}
	}
	if (a.hasGenome('Energy 1')) {
		aEnergy += 10 * a.getGenomeStrength('Energy 1');
	} else if (a.hasGenome('Energy 2')) {
		aEnergy += 20 * a.getGenomeStrength('Energy 2');
	} else if (a.hasGenome('Energy 3')) {
		aEnergy += 30 * a.getGenomeStrength('Energy 3');;
	}
	if (b.hasGenome('Energy 1')) {
		bEnergy += 10 * b.getGenomeStrength('Energy 1');
	} else if (b.hasGenome('Energy 2')) {
		bEnergy += 20 * b.getGenomeStrength('Energy 2');
	} else {
		bEnergy += 30 * b.getGenomeStrength('Energy 3');
	}
	if (a.hasGenome('Mace Tail')) {
		if (a.hasGenome('Strength 1')) {
			aMoves.push('Mace Swing 2')
		} else if (a.hasGenome('Strength 2')) {
			aMoves.push('Mace Swing 3')
		} else {
			aMoves.push('Mace Swing 1')
		}
	}
	if (b.hasGenome('Mace Tail')) {
		if (b.hasGenome('Strength 1')) {
			bMoves.push('Mace Swing 2')
		} else if (b.hasGenome('Strength 2')) {
			bMoves.push('Mace Swing 3')
		} else {
			bMoves.push('Mace Swing 1')
		}
	}
	if (a.hasGenome('Spikes')) {
		aPassiveDefence += 0.1;    // deals 10% of damage back to attacker
	}
	if (a.hasGenome('Venom Spikes')) {
		aPassiveDefence += 0.3;
	}
	if (b.hasGenome('Spikes')) {
		bPassiveDefence += 0.1;    // deals 10% of damage back to attacker
	}
	if (b.hasGenome('Venom Spikes')) {
		bPassiveDefence += 0.3;
	}
	if (a.hasGenome('Spike Tail')) {
		if (a.hasGenome('Strength 1')) {
			aMoves.push('Spike Tail Swing 2')
		} else if (a.hasGenome('Strength 2')) {
			aMoves.push('Spike Tail Swing 3')
		} else {
			aMoves.push('Spike Tail Swing 1')
		}
		if (a.hasGenome('Venom Spikes')) {
			if (a.hasGenome('Strength 1')) {
				aMoves.push('Venom Spike Tail Swing 2')
			} else if (a.hasGenome('Strength 2')) {
				aMoves.push('Venom Spike Tail Swing 3')
			} else {
				aMoves.push('Venom Spike Tail Swing 1')
			}
		}
	}
	if (b.hasGenome('Spike Tail')) {
		if (b.hasGenome('Strength 1')) {
			bMoves.push('Spike Tail Swing 2')
		} else if (b.hasGenome('Strength 2')) {
			bMoves.push('Spike Tail Swing 3')
		} else {
			bMoves.push('Spike Tail Swing 1')
		}
		if (b.hasGenome('Venom Spikes')) {
			if (b.hasGenome('Strength 1')) {
				bMoves.push('Venom Spike Tail Swing 2')
			} else if (b.hasGenome('Strength 2')) {
				bMoves.push('Venom Spike Tail Swing 3')
			} else {
				bMoves.push('Venom Spike Tail Swing 1')
			}
		}
	}
	if (a.hasGenome('Claws')) {
		if (a.hasGenome('Strength 1')) {
			aMoves.push('Claw Slash 2')
		} else if (a.hasGenome('Strength 2')) {
			aMoves.push('Claw Slash 3')
		} else {
			aMoves.push('Claw Slash 1')
		}
	}
	if (a.hasGenome('Venom Claws')) {
		if (a.hasGenome('Strength 1')) {
			aMoves.push('Venom Claw Slash 2')
		} else if (a.hasGenome('Strength 2')) {
			aMoves.push('Venom Claw Slash 3')
		} else {
			aMoves.push('Venom Claw Slash 1')
		}
	}
	if (b.hasGenome('Claws')) {
		if (b.hasGenome('Strength 1')) {
			bMoves.push('Claw Slash 2')
		} else if (b.hasGenome('Strength 2')) {
			bMoves.push('Claw Slash 3')
		} else {
			bMoves.push('Claw Slash 1')
		}
	}
	if (b.hasGenome('Venom Claws')) {
		if (b.hasGenome('Strength 1')) {
			bMoves.push('Venom Claw Slash 2')
		} else if (b.hasGenome('Strength 2')) {
			bMoves.push('Venom Claw Slash 3')
		} else {
			bMoves.push('Venom Claw Slash 1')
		}
	}
	if (a.hasGenome('Fangs')) {
		if (a.hasGenome('Strength 1')) {
			aMoves.push('Bite 2')
		} else if (a.hasGenome('Strength 2')) {
			aMoves.push('Bite 3')
		} else {
			aMoves.push('Bite 1')
		}
	}
	if (a.hasGenome('Venom Fangs')) {
		if (a.hasGenome('Strength 1')) {
			aMoves.push('Venom Bite 2')
		} else if (a.hasGenome('Strength 2')) {
			aMoves.push('Venom Bite 3')
		} else {
			aMoves.push('Venom Bite 1')
		}
	}
	if (b.hasGenome('Fangs')) {
		if (b.hasGenome('Strength 1')) {
			bMoves.push('Bite 2')
		} else if (b.hasGenome('Strength 2')) {
			bMoves.push('Bite 3')
		} else {
			bMoves.push('Bite 1')
		}
	}
	if (b.hasGenome('Venom Fangs')) {
		if (b.hasGenome('Strength 1')) {
			bMoves.push('Venom Bite 2')
		} else if (b.hasGenome('Strength 2')) {
			bMoves.push('Venom Bite 3')
		} else {
			bMoves.push('Venom Bite 1')
		}
	}
	if (a.hasGenome('Venom Stinger')) {
		aMoves.push('Venom Sting')
	}
	if (b.hasGenome('Venom Stinger')) {
		bMoves.push('Venom Sting')
	}
	
	let defenderWeights = {
							'Hit 1': 0.5,
						    'Hit 2': 0.75,
						    'Hit 3': 0.825,
						    'Block 1': 1.5,
						    'Block 2': 2,
						    'Penetrate 1': 0.375,
						    'Penetrate 2': 0.25,
						    'Dodge 1': 1,
						    'Dodge 2': 1.125,
						    'Dodge 3': 1.25,
						    'Dodge 4': 1.375,
							'Mace Swing 1': 0.8,
							'Mace Swing 2': 0.9,
							'Mace Swing 3': 1.05,
							'Spike Tail Swing 1': 0.8,
							'Spike Tail Swing 2': 0.9,
							'Spike Tail Swing 3': 1.05,
							'Venom Spike Tail Swing 1': 1.2,
							'Venom Spike Tail Swing 2': 1.3,
							'Venom Spike Tail Swing 3': 1.45,
							'Claw Slash 1': 0.6,
							'Claw Slash 2': 0.75,
							'Claw Slash 3': 0.825,
							'Venom Claw Slash 1': 0.8,
							'Venom Claw Slash 2': 0.9,
							'Venom Claw Slash 3': 1.05,
							'Bite 1': 0.5,
							'Bite 2': 0.75,
							'Bite 3': 0.825,
							'Venom Bite 1': 0.8,
							'Venom Bite 2': 0.9,
							'Venom Bite 3': 1.05,
							'Venom Sting': 2
						  };
	let attackerWeights = {
							'Hit 1': 1.5,
							'Hit 2': 2,
							'Hit 3': 3,
							'Block 1': 0.25,
							'Block 2': 0.375,
							'Penetrate 1': 1.75,
							'Penetrate 2': 2.5,
							'Dodge 1': 0.75,
							'Dodge 2': 0.625,
							'Dodge 3': 0.5,
							'Dodge 4': 0.375,
							'Mace Swing 1': 1.75,
							'Mace Swing 2': 2.375,
							'Mace Swing 3': 3.5,
							'Spike Tail Swing 1': 1.75,
							'Spike Tail Swing 2': 2.375,
							'Spike Tail Swing 3': 3.5,
							'Venom Spike Tail Swing 1': 2.5,
							'Venom Spike Tail Swing 2': 3.5,
							'Venom Spike Tail Swing 3': 5,
							'Claw Slash 1': 1.5,
							'Claw Slash 2': 2,
							'Claw Slash 3': 3,
							'Venom Claw Slash 1': 1.75,
							'Venom Claw Slash 2': 2.375,
							'Venom Claw Slash 3': 3.5,
							'Bite 1': 1.5,
							'Bite 2': 2,
							'Bite 3': 3,
							'Venom Bite 1': 1.75,
							'Venom Bite 2': 2.375,
							'Venom Bite 3': 3.5,
							'Venom Sting': 6
						   };

	let starts = chooseStarter(a, b, aSpeed - bSpeed, biome);
	
	while (true) {
		if (starts == 'a') {
			// a attacks
			let aMove = chooseMove(aMoves, aEnergy, attackerWeights);
			aEnergy -= moves[aMove].Energy;
			let aDamage = 0;
			let aBlock = 0;
			let aDodge = 0;
			try {
				aDamage = moves[aMove].Damage;
				aBlock = 0;
				aDodge = 0;
			} catch {
				try {
					aDodge = moves[aMove].Dodge;
					aBlock = 0;
					aDamage = 0;
				} catch {
					aBlock = moves[aMove].Block;
					aDodge = 0;
					aDamage = 0;
				}
			}
			let bMove = chooseMove(bMoves, bEnergy, defenderWeights);
			bEnergy -= moves[bMove].Energy;
			let bDamage = 0;
			let bBlock = 0;
			let bDodge = 0;
			try {
				bDamage = moves[bMove].Damage;
				bBlock = 0;
				bDodge = 0;
			} catch {
				try {
					bDodge = moves[bMove].Dodge;
					bBlock = 0;
					bDamage = 0;
				} catch {
					bBlock = moves[bMove].Block;
					bDodge = 0;
					bDamage = 0;
				}
			}
			if (aDamage > 0) {
				if (bDodge > 0) {
					if (Math.random() > bDodge) {
						bHP -= aDamage;
					}
				} else if (bBlock > 0) {
					if (aMove in ['Penetrate 1', 'Penetrate 2']) {
						bHP -= aDamage;
					} else if (aMove == 'Hit 3') {
						if (bArmourIntegrity > 100) {
							bArmourIntegrity -= 20;
							if (bArmourIntegrity <= 100) {
								bArmourIntegrity = 100;
								bMoves.splice(bMoves.indexOf('Block 2'), 1);
							}
						} else {
							bArmourIntegrity -= 20;
							if (bArmourIntegrity <= 0) {
								bArmourIntegrity = 0;
								bMoves.splice(bMoves.indexOf('Block 1'), 1);
							}
						}
					}
					bHP -= aDamage * bBlock;
				} else {
					bHP -= aDamage;
					if (aMove == 'Penetrate 1') {
						bHP -= 2 * aDamage;
					} else if (aMove == 'Penetrate 2') {
						bHP -= 6 * aDamage;
					}
				}
			}
			if (bDamage > 0) {
				if (aDodge > 0) {
					if (Math.random() > aDodge) {
						aHP -= bDamage;
					}
				} else if (aBlock > 0) {
					if (bMove in ['Penetrate 1', 'Penetrate 2']) {
						aHP -= bDamage;
					} else if (bMove == 'Hit 3') {
						if (aArmourIntegrity > 100) {
							aArmourIntegrity -= 20;
							if (aArmourIntegrity <= 100) {
								aArmourIntegrity = 100;
								aMoves.splice(aMoves.indexOf('Block 2'), 1);
							}
						} else {
							aArmourIntegrity -= 20;
							if (aArmourIntegrity <= 0) {
								aArmourIntegrity = 0;
								aMoves.splice(aMoves.indexOf('Block 1'), 1);
							}
						}
					}
					aHP -= bDamage * aBlock;
				} else {
					aHP -= bDamage;
					if (bMove == 'Penetrate 1') {
						aHP -= 2 * bDamage;
					} else if (bMove == 'Penetrate 2') {
						aHP -= 6 * bDamage;
					}
				}
			}
			
		} else if (starts == 'b') {
			// b attacks
			let bMove = chooseMove(bMoves, bEnergy, attackerWeights);
			bEnergy -= moves[bMove].Energy;
			let bDamage = 0;
			let bBlock = 0;
			let bDodge = 0;
			try {
				bDamage = moves[bMove].Damage;
				bBlock = 0;
				bDodge = 0;
			} catch {
				try {
					bDodge = moves[bMove].Dodge;
					bBlock = 0;
					bDamage = 0;
				} catch {
					bBlock = moves[bMove].Block;
					bDodge = 0;
					bDamage = 0;
				}
			}
			let aMove = chooseMove(aMoves, aEnergy, defenderWeights);
			aEnergy -= moves[aMove].Energy;
			let aDamage = 0;
			let aBlock = 0;
			let aDodge = 0;
			try {
				aDamage = moves[aMove].Damage;
				aBlock = 0;
				aDodge = 0;
			} catch {
				try {
					aDodge = moves[aMove].Dodge;
					aBlock = 0;
					aDamage = 0;
				} catch {
					aBlock = moves[aMove].Block;
					aDodge = 0;
					aDamage = 0;
				}
			}
		} else if (Math.random() > 0.5) {
			// a attacks
			let aMove = chooseMove(aMoves, aEnergy, attackerWeights);
			aEnergy -= moves[aMove].Energy;
			let aDamage = 0;
			let aBlock = 0;
			let aDodge = 0;
			try {
				aDamage = moves[aMove].Damage;
				aBlock = 0;
				aDodge = 0;
			} catch {
				try {
					aDodge = moves[aMove].Dodge;
					aBlock = 0;
					aDamage = 0;
				} catch {
					aBlock = moves[aMove].Block;
					aDodge = 0;
					aDamage = 0;
				}
			}
			let bMove = chooseMove(bMoves, bEnergy, defenderWeights);
			bEnergy -= moves[bMove].Energy;
			let bDamage = 0;
			let bBlock = 0;
			let bDodge = 0;
			try {
				bDamage = moves[bMove].Damage;
				bBlock = 0;
				bDodge = 0;
			} catch {
				try {
					bDodge = moves[bMove].Dodge;
					bBlock = 0;
					bDamage = 0;
				} catch {
					bBlock = moves[bMove].Block;
					bDodge = 0;
					bDamage = 0;
				}
			}
			if (aDamage > 0) {
				if (bDodge > 0) {
					if (Math.random() > bDodge) {
						bHP -= aDamage;
					}
				} else if (bBlock > 0) {
					if (aMove in ['Penetrate 1', 'Penetrate 2']) {
						bHP -= aDamage;
					} else if (aMove == 'Hit 3') {
						if (bArmourIntegrity > 100) {
							bArmourIntegrity -= 20;
							if (bArmourIntegrity <= 100) {
								bArmourIntegrity = 100;
								bMoves.splice(bMoves.indexOf('Block 2'), 1);
							}
						} else {
							bArmourIntegrity -= 20;
							if (bArmourIntegrity <= 0) {
								bArmourIntegrity = 0;
								bMoves.splice(bMoves.indexOf('Block 1'), 1);
							}
						}
					}
					bHP -= aDamage * bBlock;
				} else {
					bHP -= aDamage;
					if (aMove == 'Penetrate 1') {
						bHP -= 2 * aDamage;
					} else if (aMove == 'Penetrate 2') {
						bHP -= 6 * aDamage;
					}
				}
			}
			if (bDamage > 0) {
				if (aDodge > 0) {
					if (Math.random() > aDodge) {
						aHP -= bDamage;
					}
				}
				else if (aBlock > 0) {
					if (bMove in ['Penetrate 1', 'Penetrate 2']) {
						aHP -= bDamage;
					} else if (bMove == 'Hit 3') {
						if (aArmourIntegrity > 100) {
							aArmourIntegrity -= 20;
							if (aArmourIntegrity <= 100) {
								aArmourIntegrity = 100;
								aMoves.splice(aMoves.indexOf('Block 2'), 1);
							}
						} else {
							aArmourIntegrity -= 20;
							if (aArmourIntegrity <= 0) {
								aArmourIntegrity = 0;
								aMoves.splice(aMoves.indexOf('Block 1'), 1);
							}
						}
					}
					aHP -= bDamage * aBlock;
				}
			}
		} else {
			// b attacks
			let bMove = chooseMove(bMoves, bEnergy, attackerWeights);
			bEnergy -= moves[bMove].Energy;
			let bDamage = 0;
			let bBlock = 0;
			let bDodge = 0;
			try {
				bDamage = moves[bMove].Damage;
				bBlock = 0;
				bDodge = 0;
			} catch {
				try {
					bDodge = moves[bMove].Dodge;
					bBlock = 0;
					bDamage = 0;
				} catch {
					bBlock = moves[bMove].Block;
					bDodge = 0;
					bDamage = 0;
				}
			}
			let aMove = chooseMove(aMoves, aEnergy, defenderWeights);
			aEnergy -= moves[aMove].Energy;
			let aDamage = 0;
			let aBlock = 0;
			let aDodge = 0;
			try {
				aDamage = moves[aMove].Damage;
				aBlock = 0;
				aDodge = 0;
			} catch {
				try {
					aDodge = moves[aMove].Dodge;
					aBlock = 0;
					aDamage = 0;
				} catch {
					aBlock = moves[aMove].Block;
					aDodge = 0;
					aDamage = 0;
				}
			}
		}
		let losers = [];
		if ((aEnergy < 5 && !b.hasGenome('Armour 1') && !b.hasGenome('Armour 2')) || (aEnergy < 2.5)) {
			// a loses
			losers.push('a');
		}
		if ((bEnergy < 5 && !a.hasGenome('Armour 1') && !a.hasGenome('Armour 2')) || (bEnergy < 2.5)) {
			// b loses
			losers.push('b');
		}
		if (losers.length > 0){
			return losers;
		}
	}
}

// Genes: left -> 0-9, right -> 10-19
// Recessive: 0 -> dominant, 1 -> recessive
class DNA {
	constructor(genes) {
		this.genes = [[], []];
		this.active = [];
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 10; j++) {
				this.genes[i].push(null);
			}
		}
		for (let i = 0; i < genes.length; i++) {
			if (i < 10) {
				this.genes[0][genes[i].position] = genes[i];
			} else {
				this.genes[1][genes[i].position] = genes[i];
			}
		}
		for (let i = 0; i < 10; i++) {
			if (this.genes[0][i].name == this.genes[1][i].name) {
				this.active.push([this.genes[0][i], 1]);
			} else if (this.genes[0][i].name.slice(0, -1) == this.genes[1][i].name.slice(0, -1)) {
				let a = parseInt(this.genes[0][i].name.slice(-1));
				let b = parseInt(this.genes[1][i].name.slice(-1));
				if (a > b) {
					this.active.push([this.genes[0][i], 0.8]);
				} else {
					this.active.push([this.genes[1][i], 0.8]);
				}
			} else if (this.genes[0][i].recessive == 0 && this.genes[1][i].recessive == 0) {
				this.active.push([this.genes[0][i], 0.45]);
				this.active.push([this.genes[1][i], 0.45]);
			} else if (this.genes[0][i].recessive == 0 && this.genes[1][i].recessive == 1) {
				this.active.push([this.genes[0][i], 0.75]);
			} else if (this.genes[0][i].recessive == 1 && this.genes[1][i].recessive == 0) {
				this.active.push([this.genes[1][i], 0.75]);
			} else if (this.genes[0][i].recessive == 1 && this.genes[1][i].recessive == 1) {
				// None are active (very unfortunate)
			}
		}
	}
}

function makeCreature(mother, father) {
	let genes = [];
	for (let i = 0; i < 10; i++) {
		if (Math.random() > 0.5) {
			genes.push(mother.genes[0][i]);
		} else {
			genes.push(mother.genes[1][i]);
		}
		if (Math.random() > 0.5) {
			genes.push(father.genes[0][i]);
		} else {
			genes.push(father.genes[1][i]);
		}
		if (Math.random() > 0.995) {
			genes[i] = genomesDict[mutations[genes[i].name][Math.floor(Math.random() * mutations[genes[i].name].length)]];
		}
	}
	return new Creature(new DNA(genes));
}


var creatures = [];

class MapTile {
	constructor(terrain) {
		this.terrain = terrain;
		this.creatures = [];    // indices of the creatures in the creatures array
	}
}
var map = [];

let xtiles = 10;
let ytiles = 10;
for (let x = 0; x < xtiles; x++) {
	map.push([])
	for (let y = 0; y < ytiles; y++) {
		let random = Math.random()
		if (random > 4/5) {
			map[x].push(new MapTile('Desert'));
		} else if (random > 3/5) {
			map[x].push(new MapTile('Snow'));
		} else if (random > 1/5) {
			map[x].push(new MapTile('Forest'));
		} else {
			map[x].push(new MapTile('Water'));
		}
		if (map[x][y].terrain == 'Desert') {
			ctx.fillStyle = 'rgb(221, 204, 0)';
		} else if (map[x][y].terrain == 'Snow') {
			ctx.fillStyle = 'rgb(238, 238, 238)';
		} else if (map[x][y].terrain == 'Forest') {
			ctx.fillStyle = 'rgb(0, 204, 0)';
		} else if (map[x][y].terrain == 'Water') {
			ctx.fillStyle = 'rgb(102, 153, 204)';
		}
		ctx.fillRect(Math.floor(x * cvs.width / xtiles), Math.floor(y * cvs.height / ytiles), Math.ceil(cvs.width / xtiles), Math.ceil(cvs.height / ytiles));
	}
}

function update() {
	
}

function start() {
	for (let i = 0; i < 100; i++) {
		let genes = [];
		for (let j = 0; j < 20; j++) {
			if (j < 10){
				genes.push(new Genome('None', j, 0));
			} else {
				genes.push(new Genome('None', j - 10, 0));
			}
		}
		// 0-9 -> left, 10-19 -> right
		/*
		genes[0] = genomes[Math.floor(Math.random() * 12)];
		genes[10] = genomes[Math.floor(Math.random() * 12)];
		genes[1] = genomes[Math.floor(Math.random() * 2) + 12];
		genes[11] = genomes[Math.floor(Math.random() * 2) + 12];
		genes[2] = genomes[Math.floor(Math.random() * 6) + 14];
		genes[12] = genomes[Math.floor(Math.random() * 6) + 14];
		genes[3] = genomes[Math.floor(Math.random() * 2) + 20];
		genes[13] = genomes[Math.floor(Math.random() * 2) + 20];
		genes[4] = genomes[Math.floor(Math.random() * 3) + 22];
		genes[14] = genomes[Math.floor(Math.random() * 3) + 22];
		*/
		genes[0] = genomes[0]
		genes[10] = genomes[0]
		genes[1] = genomes[12]
		genes[11] = genomes[12]
		genes[2] = genomes[14]
		genes[12] = genomes[14]
		genes[3] = genomes[20]
		genes[13] = genomes[20]
		genes[4] = genomes[22]
		genes[14] = genomes[22]
		creatures.push(new Creature(new DNA(genes)));
	}
}

function compareDNA(a, b) {
	let score = 0;
	for (let i = 0; i < 10; i++) {
		if (a.genes[0][i].name == b.genes[0][i].name) {
			score += 1;
		}
		if (a.genes[1][i].name == b.genes[1][i].name) {
			score += 1;
		}
	}
	return score;
}

function encounter(a, b, biome) {
	if (a.sex != b.sex && compareDNA(a.dna, b.dna) >= 17) {
		let child = makeCreature(a, b);
		creatures.push(child);
		a.descendants += 1;
		b.descendants += 1;
	} else {
		let result = combat(a, b, biome);
		if (result[0] == 'a' && result.length == 1) {
			creatures.splice(creatures.indexOf(a), 1);
		} else if (result[0] == 'b' && result.length == 1) {
			creatures.splice(creatures.indexOf(b), 1);
		} else if (result.length == 2) {
			creatures.splice(creatures.indexOf(a), 1);
			creatures.splice(creatures.indexOf(b), 1);
		} else {
			console.warn('Error: Invalid result from combat');
		}
	}
}

start();

/*setInterval(() => {
	console.log(combat(creatures[0], creatures[1], 'Desert'));
}, 500)*/
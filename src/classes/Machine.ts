import { Rotor } from './Rotor';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export class Machine {
	rotors: Rotor[] = [];
	reflector?: Rotor;

	addRotor(rotor: Rotor) {
		this.rotors.push(rotor);
	}
	setReflector(reflector: Rotor) {
		this.reflector = reflector;
	}

	shiftRotors() {
		this.rotors.reduce((bump, rotor, i) => {
			if (bump) {
				return rotor.shift();
			}
			return false;
		}, true);
		// console.log('Rotors positions: ' + this.rotors.map(r => alphabet[r.position]).join('/'));
	}

	encodeLetter(letter: string) {
		// console.groupCollapsed('Encode letter "' + letter + '"');
		this.shiftRotors();
		let index = alphabet.indexOf(letter.toLowerCase());

		for (let i = 0; i < this.rotors.length; i++) {
			const rotor = this.rotors[i];
			index = rotor.encode(index);
			// console.log(
			// 	[
			// 		`Rot ${i}`,
			// 		`Pos: ${rotor.position % 26}/${alphabet[rotor.position % 26]}`,
			// 		`Out: ${index}/${alphabet[index]} "${alphabet[(index + rotor.position) % 26]}"`
			// 	].join('\t')
			// );
		}

		// @TODO handle machines without reflector
		index = this.reflector ? this.reflector.encode(index) : index;
		// console.log(`Reflector: ${alphabet[index]}`);

		for (let i = this.rotors.length - 1; i >= 0; i--) {
			const rotor = this.rotors[i];
			index = rotor.decode(index);
			// console.log(
			// 	[
			// 		`Rot ${i}`,
			// 		`Pos: ${rotor.position % 26}/${alphabet[rotor.position % 26]}`,
			// 		`Out: ${index}/${alphabet[index]} "${alphabet[(index + rotor.position) % 26]}"`
			// 	].join('\t')
			// );
		}

		// console.log(`Finish as ${alphabet[index % 26]}`);
		// console.groupEnd();
		return alphabet[index];
	}
}

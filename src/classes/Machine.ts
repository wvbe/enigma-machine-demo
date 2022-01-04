import Event from './Event';
import { Rotor } from './Rotor';

export class Machine {
	public readonly rotors: Rotor[] = [];
	public reflector?: Rotor;
	public readonly $encode = new Event<[number[]]>();
	public readonly alphabet: string;

	constructor(alphabet: string) {
		this.alphabet = alphabet.toLowerCase();
	}

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
	}

	encodeLetter(letter: string) {
		this.shiftRotors();
		let index = this.alphabet.indexOf(letter.toLowerCase());
		const trail = [index];
		for (let i = 0; i < this.rotors.length; i++) {
			const rotor = this.rotors[i];
			index = rotor.encode(index);
			trail.push(index);
		}

		// @TODO handle machines without reflector
		index = this.reflector ? this.reflector.encode(index) : index;
		trail.push(index);

		for (let i = this.rotors.length - 1; i >= 0; i--) {
			const rotor = this.rotors[i];
			index = rotor.decode(index);
			trail.push(index);
		}

		this.$encode.trigger(trail);
		return this.alphabet[index];
	}
}

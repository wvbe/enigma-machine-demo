import Event from './Event';

type RotorDescription = {
	name?: string;
	model?: string;
	year?: number;
};

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
export class Rotor implements RotorDescription {
	public readonly wiring: number[];
	public readonly notches: number[];

	public position: number = 0;
	public readonly alphabet = DEFAULT_ALPHABET;
	public readonly name?: string;
	public readonly model?: string;
	public readonly year?: number;

	public readonly $rotate = new Event<
		[
			// The new position
			number,
			// Wether or not a notch was hit
			boolean
		]
	>();

	constructor(wiring: number[], notches: number[], description: RotorDescription = {}) {
		this.wiring = wiring;
		this.notches = notches;

		Object.assign(this, description);
	}

	/**
	 * Move this rotor's Ringstellung by 1 position. Returns wether or not a turnover notch was hit.
	 */
	public shift(): boolean {
		this.position = this.position + 1;
		const hitsNotch =
			this.notches === null
				? false
				: this.notches.includes((this.position % this.wiring.length) - 1);
		this.$rotate.trigger(this.position, hitsNotch);
		return hitsNotch;
	}

	/**
	 * Signal going from the keypress towards the reflector
	 */
	public encode(index: number) {
		return (
			(this.wiring[(index + this.position) % this.wiring.length] +
				this.wiring.length -
				(this.position % this.wiring.length)) %
			this.wiring.length
		);
	}

	/**
	 * Signal going from the reflector towards the lamp
	 */
	public decode(index: number) {
		const reverseIndex =
			(this.wiring.indexOf((index + this.position) % this.wiring.length) +
				this.wiring.length -
				(this.position % this.wiring.length)) %
			this.wiring.length;
		return reverseIndex;
	}

	static fromAlphabet(coding: string, notches: string, description?: RotorDescription) {
		const codingNumbers = coding
			.toLowerCase()
			.split('')
			.map(letter => DEFAULT_ALPHABET.indexOf(letter));
		const notchesNumbers = !notches
			? []
			: notches
					.toLowerCase()
					.split('')
					.map(letter => DEFAULT_ALPHABET.indexOf(letter));
		return new Rotor(codingNumbers, notchesNumbers, description);
	}

	clone(position?: string | number) {
		if (typeof position === 'string') {
			position = this.alphabet.indexOf(position.toLowerCase());
		}
		const rotor = new Rotor(this.wiring, this.notches, {
			name: this.name,
			model: this.model,
			year: this.year
		});
		if (position !== undefined) {
			rotor.position = position;
		} else {
			rotor.position = this.position;
		}
		return rotor;
	}
}

import { Machine } from './classes/Machine';
import { UKW_B, I, II, III } from './constants/rotors';

describe('Machine #1', () => {
	const machine = new Machine();
	machine.addRotor(I.clone());
	machine.addRotor(II.clone());
	machine.addRotor(III.clone());
	machine.setReflector(UKW_B.clone());

	it('starting position', () => {
		// Assert starting position
		expect(machine.rotors[0].position).toBe(0);
		expect(machine.rotors[1].position).toBe(0);
	});

	it('first key press', () => {
		expect(machine.encodeLetter('A')).toBe('f');
		expect(machine.rotors[0].position).toBe(1);
	});
	it('second key press', () => {
		expect(machine.encodeLetter('A')).toBe('t');
		expect(machine.rotors[0].position).toBe(2);
	});
	it('hitting the notch on rotor 0', () => {
		// Spin the rotor up to rotor 0's notch
		for (let i = 0; i < 14; i++) {
			machine.shiftRotors();
		}
		expect(machine.rotors[0].position).toBe(16);
		expect(machine.rotors[1].position).toBe(0);
		expect(machine.encodeLetter('A')).toBe('j');
		expect(machine.rotors[0].position).toBe(17);
		expect(machine.rotors[1].position).toBe(1);
	});
	it('hitting the notch on rotor 1', () => {
		// Spin rotor 0 enough times to revolve rotor 1 four times
		for (let i = 0; i < 4 * 26 - 1; i++) {
			machine.shiftRotors();
		}
		expect(machine.rotors[0].position % 26).toBe(16);
		expect(machine.rotors[1].position % 26).toBe(4);
		expect(machine.rotors[2].position % 26).toBe(0);
		expect(machine.encodeLetter('A')).toBe('l');
		expect(machine.rotors[0].position % 26).toBe(17);
		expect(machine.rotors[1].position % 26).toBe(5);
		expect(machine.rotors[2].position % 26).toBe(1);
	});
});

describe('Machine #2', () => {
	const machine = new Machine();
	machine.addRotor(I.clone());
	machine.addRotor(II.clone());
	machine.addRotor(III.clone());
	machine.setReflector(UKW_B.clone());

	it('quick brown fox', () => {
		const stringIn = 'thequickbrownfoxjumpsoverthelazydog';
		const stringOut = 'zptrrateujdawkfeabuuyiiplxxlzijvneh';
		stringIn.split('').forEach((char, i) => {
			expect(machine.encodeLetter(char)).toBe(stringOut[i]);
		});
	});
});

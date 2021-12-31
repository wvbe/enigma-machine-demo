import { FunctionComponent, useMemo } from 'react';
import { Rotor as RotorClass } from '../classes/Rotor';
import { useEvent } from '../hooks/useEvent';

function useLetters(rotor: RotorClass) {
	return (
		rotor.alphabet.substring(rotor.position % rotor.alphabet.length, rotor.alphabet.length) +
		rotor.alphabet.substring(0, rotor.position % rotor.alphabet.length)
	)
		.split('')
		.map((letter, i) => [letter, rotor.alphabet[rotor.wiring[rotor.alphabet.indexOf(letter)]]]);
}

const RotorPosition: FunctionComponent<{ rotor: RotorClass; index: number }> = ({
	rotor,
	index
}) => {
	const letter = rotor.alphabet.charAt(index);
	const outLetter = rotor.alphabet[rotor.wiring[rotor.alphabet.indexOf(letter)]];
	const hasNotch = rotor.notches.includes(rotor.alphabet.indexOf(outLetter));

	return (
		<div>
			{hasNotch ? '-' : <>&nbsp;</>}
			{outLetter}
			{' <-- '}
			{letter}
		</div>
	);
};

export const Rotor: FunctionComponent<{ instance: RotorClass }> = ({ instance }) => {
	const [position] = useEvent(instance.$rotate, instance.position, false);
	const letters = useMemo(
		() =>
			Array.from(new Array(instance.alphabet.length)).map(
				(_, i) => (i + position) % instance.alphabet.length
			),
		[position]
	);
	return (
		<div className="rotor">
			{letters.map(index => (
				<RotorPosition key={index} rotor={instance} index={index} />
			))}
		</div>
	);
};

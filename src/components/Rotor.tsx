import { FunctionComponent } from 'react';
import { Rotor as RotorClass } from '../classes/Rotor';

/**
 * One visible radiant of the rotor, representing one letter (the input) and scrambling it to
 * another position.
 */
const RotorSegment: FunctionComponent<{
	rotor: RotorClass;
	index: number;

	// The I/O going from the keyboard towards the reflector; When set to true, this end of the wire
	// a current coming through.
	toReflectorIn: boolean;
	toReflectorOut: boolean;

	// The I/O going from the reflector towards the lamps; When set to true, this end of the wire
	// a current coming through.
	toLampsIn: boolean;
	toLampsOut: boolean;
}> = ({ rotor, index, toReflectorIn, toReflectorOut, toLampsIn, toLampsOut }) => {
	const rIndex = (index + rotor.position) % rotor.alphabet.length;
	const letter = rotor.alphabet.charAt(rIndex);
	const hasNotch = rotor.notches.includes(rIndex);

	return (
		<pre key={letter}>
			{toReflectorOut ? `[${letter}]` : toLampsIn ? `{${letter}}` : ` ${letter} `}
			{hasNotch ? '---' : '   '}
			{toReflectorIn ? `[${letter}]` : toLampsOut ? `{${letter}}` : ` ${letter} `}
		</pre>
	);
};

export const Rotor: FunctionComponent<{
	instance: RotorClass;
	signalsTowardsReflector: [number | undefined, number | undefined];
	signalsTowardsLamps: [number | undefined, number | undefined];
}> = ({ instance, signalsTowardsReflector, signalsTowardsLamps }) => {
	return (
		<div className="rotor">
			{instance.alphabet
				.split('')
				.map((_, index) => (
					<RotorSegment
						key={index}
						index={index}
						rotor={instance}
						toReflectorIn={signalsTowardsReflector[0] === index}
						toReflectorOut={signalsTowardsReflector[1] === index}
						toLampsIn={signalsTowardsLamps[0] === index}
						toLampsOut={signalsTowardsLamps[1] === index}
					/>
				))
				.reverse()}
		</div>
	);
};

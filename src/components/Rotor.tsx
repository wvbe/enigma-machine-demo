import { Rotor as RotorClass } from '@wvbe/enigma-machine';
import { Fragment, FunctionComponent } from 'react';
import { CHARACTER_PADDING, ROTOR_HEIGHT, ROTOR_WIDTH, WIRE_PADDING } from '../util/svg';
import { SignalLetter } from './SignalLetter';
import { SignalWire } from './SignalWire';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
export const Rotor: FunctionComponent<{
	instance: RotorClass;
	signalsTowardsReflector: [number | undefined, number | undefined];
	signalsTowardsLamps: [number | undefined, number | undefined];
}> = ({ instance, signalsTowardsReflector, signalsTowardsLamps }) => {
	return (
		<>
			<rect
				x={WIRE_PADDING}
				width={ROTOR_WIDTH - 2 * WIRE_PADDING}
				fill="#eee"
				height={ROTOR_HEIGHT}
			/>
			<SignalWire
				from={signalsTowardsReflector[1]}
				to={signalsTowardsReflector[0]}
				stroke="blue"
			/>
			<SignalWire from={signalsTowardsLamps[0]} to={signalsTowardsLamps[1]} stroke="red" />
			{alphabet.split('').map((_, index) => {
				const letter = alphabet.charAt((index + instance.rotation) % instance.size);
				return (
					<Fragment key={index}>
						<SignalLetter
							index={index}
							letter={letter}
							x={CHARACTER_PADDING}
							highlight={
								signalsTowardsReflector[1] === index
									? 'blue'
									: signalsTowardsLamps[0] === index
									? 'red'
									: undefined
							}
						/>
						<SignalLetter
							index={index}
							letter={letter}
							x={ROTOR_WIDTH - CHARACTER_PADDING}
							highlight={
								signalsTowardsReflector[0] === index
									? 'blue'
									: signalsTowardsLamps[1] === index
									? 'red'
									: undefined
							}
						/>
					</Fragment>
				);
			})}
		</>
	);
};

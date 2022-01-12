import { Rotor as RotorClass } from '@wvbe/enigma-machine';
import { Fragment, FunctionComponent } from 'react';
import { CHARACTER_PADDING, ROTOR_HEIGHT, ROTOR_WIDTH, WIRE_PADDING, yForI } from '../util/svg';
import { Signal } from './Signal';

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
			{alphabet.split('').map((_, index) => {
				const letter = alphabet.charAt((index + instance.rotation) % instance.size);
				return (
					<Fragment key={index}>
						<text
							x={CHARACTER_PADDING}
							y={yForI(index)}
							textAnchor="start"
							alignmentBaseline="central"
						>
							{letter}
						</text>
						<text
							x={ROTOR_WIDTH - CHARACTER_PADDING}
							y={yForI(index)}
							textAnchor="end"
							alignmentBaseline="central"
						>
							{letter}
						</text>
					</Fragment>
				);
			})}
			<Signal
				from={signalsTowardsReflector[1]}
				to={signalsTowardsReflector[0]}
				stroke="blue"
			/>
			<Signal from={signalsTowardsLamps[0]} to={signalsTowardsLamps[1]} stroke="red" />
		</>
	);
};

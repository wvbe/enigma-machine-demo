import { Plugboard as PlugboardClass } from '@wvbe/enigma-machine';
import { Fragment, FunctionComponent } from 'react';
import { ROTOR_WIDTH, yForI } from '../util/svg';
import { Signal } from './Signal';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const Plugboard: FunctionComponent<{
	instance: PlugboardClass;
	signalsTowardsReflector: [number | undefined, number | undefined];
	signalsTowardsLamps: [number | undefined, number | undefined];
}> = ({ instance, signalsTowardsReflector, signalsTowardsLamps }) => {
	return (
		<>
			{alphabet.split('').map((_, index) => {
				const letter = alphabet.charAt(index);
				const wiring = instance.encode(index);

				return (
					<Fragment key={index}>
						<text x="5" y={yForI(index)} textAnchor="start" alignmentBaseline="central">
							{letter}
						</text>
						<text
							x={ROTOR_WIDTH - 5}
							y={yForI(index)}
							textAnchor="end"
							alignmentBaseline="central"
						>
							{letter}
						</text>
						{wiring !== index &&
							signalsTowardsLamps[0] !== index &&
							signalsTowardsReflector[1] !== index && (
								<Signal from={index} to={wiring} stroke="lightgray" />
							)}
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

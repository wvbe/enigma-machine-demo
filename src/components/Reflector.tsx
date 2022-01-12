import { Rotor as RotorClass } from '@wvbe/enigma-machine';
import { FunctionComponent } from 'react';
import { REFLECTOR_WIDTH, yForI } from '../util/svg';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const Reflector: FunctionComponent<{
	instance: RotorClass;
	signalIn: number | undefined;
	signalOut: number | undefined;
}> = ({ instance, signalIn, signalOut }) => {
	return (
		<>
			{instance.wiring.map((mapped, index) => {
				const letter = alphabet.charAt((index + instance.rotation) % instance.size);

				return (
					<text
						key={index}
						x={REFLECTOR_WIDTH - 5}
						y={yForI(index)}
						textAnchor="end"
						alignmentBaseline="central"
					>
						{letter}
					</text>
				);
			})}
			{signalIn !== undefined && signalOut !== undefined && (
				<polyline
					points={[
						[REFLECTOR_WIDTH, yForI(signalIn)],
						[0, yForI(signalIn)],
						[0, yForI(signalOut)],
						[REFLECTOR_WIDTH, yForI(signalOut)]
					]
						.map(c => c.join(','))
						.join(' ')}
					stroke="black"
					fill="none"
				/>
			)}
		</>
	);
};

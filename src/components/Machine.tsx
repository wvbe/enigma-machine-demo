import { Machine as MachineClass } from '@wvbe/enigma-machine';
import { FunctionComponent, useEffect } from 'react';
import { useEvent } from '../hooks/useEvent';
import { PLUGBOARD_WIDTH, REFLECTOR_WIDTH, ROTOR_HEIGHT, ROTOR_WIDTH } from '../util/svg';
import { Keyboard } from './Keyboard';
import { Plugboard } from './Plugboard';
import { Reflector } from './Reflector';
import { Rotor } from './Rotor';

export const Machine: FunctionComponent<{ instance: MachineClass }> = ({ instance }) => {
	const [offsets] = useEvent(instance.$encode, []);
	useEffect(() => {
		function handleKey(event: KeyboardEvent) {
			const key = event.key.toLowerCase();
			if (key.length !== 1 || !key.match(/[a-z]/g)) {
				return;
			}
			instance.encode(key);
		}
		window.document.body.addEventListener('keypress', handleKey);
		return () => {
			window.document.body.removeEventListener('keypress', handleKey);
		};
	}, [instance]);

	return (
		<div className="machine">
			<svg
				width={REFLECTOR_WIDTH + ROTOR_WIDTH * instance.rotors.length + PLUGBOARD_WIDTH}
				height={ROTOR_HEIGHT}
				viewBox={`0 0 ${
					REFLECTOR_WIDTH + ROTOR_WIDTH * instance.rotors.length + PLUGBOARD_WIDTH
				} ${ROTOR_HEIGHT}`}
			>
				{instance.reflector && (
					<svg x="0">
						<Reflector
							instance={instance.reflector}
							signalIn={offsets[instance.rotors.length + 1]}
							signalOut={offsets[instance.rotors.length + 2]}
						/>
					</svg>
				)}
				{instance.rotors
					.slice()
					.reverse()
					.map((rotor, inverseIndex) => {
						const rotorCount = instance.rotors.length;
						const index = rotorCount - inverseIndex;
						return (
							<svg
								key={inverseIndex}
								x={REFLECTOR_WIDTH + ROTOR_WIDTH * inverseIndex}
							>
								<Rotor
									key={inverseIndex}
									instance={rotor}
									signalsTowardsReflector={[offsets[index], offsets[index + 1]]}
									signalsTowardsLamps={[
										offsets[rotorCount + 1 + inverseIndex + 1],
										offsets[rotorCount + 2 + inverseIndex + 1]
									]}
								/>
							</svg>
						);
					})}
				<svg x={REFLECTOR_WIDTH + ROTOR_WIDTH * instance.rotors.length}>
					<Plugboard
						instance={instance.plugboard}
						signalsTowardsReflector={[offsets[0], offsets[1]]}
						signalsTowardsLamps={[
							offsets[offsets.length - 2],
							offsets[offsets.length - 1]
						]}
					/>
				</svg>
			</svg>
			<div className="keyboards">
				<Keyboard character={offsets[offsets.length - 1]} isLamp={true} />
				<Keyboard
					character={offsets[0]}
					isLamp={false}
					onLetterPress={letter => {
						instance.encode(letter.toLowerCase());
					}}
				/>
			</div>
		</div>
	);
};

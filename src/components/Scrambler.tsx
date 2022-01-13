import { Machine as MachineClass } from '@wvbe/enigma-machine';
import { FunctionComponent, useEffect } from 'react';
import { useEvent } from '../hooks/useEvent';
import { PLUGBOARD_WIDTH, REFLECTOR_WIDTH, ROTOR_HEIGHT, ROTOR_WIDTH } from '../util/svg';
import { Plugboard } from './Plugboard';
import { Reflector } from './Reflector';
import { Rotor } from './Rotor';

export const Scrambler: FunctionComponent<{ machine: MachineClass }> = ({ machine }) => {
	const [offsets] = useEvent(machine.$encode, []);
	useEffect(() => {
		function handleKey(event: KeyboardEvent) {
			const key = event.key.toLowerCase();
			if (key.length !== 1 || !key.match(/[a-z]/g)) {
				return;
			}
			machine.encode(key);
		}
		window.document.body.addEventListener('keypress', handleKey);
		return () => {
			window.document.body.removeEventListener('keypress', handleKey);
		};
	}, [machine]);

	return (
		<svg
			className="scrambler"
			width={REFLECTOR_WIDTH + ROTOR_WIDTH * machine.rotors.length + PLUGBOARD_WIDTH}
			height={ROTOR_HEIGHT}
			viewBox={`0 0 ${
				REFLECTOR_WIDTH + ROTOR_WIDTH * machine.rotors.length + PLUGBOARD_WIDTH
			} ${ROTOR_HEIGHT}`}
		>
			{machine.reflector && (
				<svg x="0">
					<Reflector
						instance={machine.reflector}
						signalIn={offsets[machine.rotors.length + 1]}
						signalOut={offsets[machine.rotors.length + 2]}
					/>
				</svg>
			)}
			{machine.rotors
				.slice()
				.reverse()
				.map((rotor, inverseIndex) => {
					const rotorCount = machine.rotors.length;
					const index = rotorCount - inverseIndex;
					return (
						<svg key={inverseIndex} x={REFLECTOR_WIDTH + ROTOR_WIDTH * inverseIndex}>
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
			<svg x={REFLECTOR_WIDTH + ROTOR_WIDTH * machine.rotors.length}>
				<Plugboard
					instance={machine.plugboard}
					signalsTowardsReflector={[offsets[0], offsets[1]]}
					signalsTowardsLamps={[offsets[offsets.length - 2], offsets[offsets.length - 1]]}
				/>
			</svg>
		</svg>
	);
};

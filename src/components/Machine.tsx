import { FunctionComponent, useEffect } from 'react';
import { Machine as MachineClass } from '@wvbe/enigma-machine';
import { useEvent } from '../hooks/useEvent';
import { Keyboard } from './Keyboard';
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
			{/* {instance.reflector && <Reflector instance={instance.reflector} />} */}
			{instance.rotors
				.slice()
				.reverse()
				.map((rotor, inverseIndex) => {
					const rotorCount = instance.rotors.length;
					const index = rotorCount - inverseIndex - 1;
					return (
						<Rotor
							key={inverseIndex}
							instance={rotor}
							signalsTowardsReflector={[offsets[index], offsets[index + 1]]}
							signalsTowardsLamps={[
								offsets[rotorCount + 1 + inverseIndex],
								offsets[rotorCount + 2 + inverseIndex]
							]}
						/>
					);
				})}
			<pre>
				{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
					.split('')
					.map((l, i) => {
						if (offsets[0] === i) {
							return `[${l}]`;
						}
						if (offsets[offsets.length - 1] === i) {
							return `{${l}}`;
						}
						return ` ${l} `;
					})
					.reverse()
					.join('\n')}
			</pre>
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

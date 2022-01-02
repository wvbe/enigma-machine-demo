import { FunctionComponent, useEffect, useState } from 'react';
import { Machine as MachineClass } from '../classes/Machine';
import { useEvent } from '../hooks/useEvent';
import { Rotor } from './Rotor';

export const Machine: FunctionComponent<{ instance: MachineClass }> = ({ instance }) => {
	const [input, updateInput] = useState('');
	const [output, updateOutput] = useState('');
	const [offsets] = useEvent(instance.$encode, []);
	useEffect(() => {
		function handleKey(event: KeyboardEvent) {
			if (input.length !== output.length) {
				// Guard against multiple simultaneous input
				return;
			}
			const key = event.key.toLowerCase();
			if (key.length !== 1 || !key.match(/[a-z]/g)) {
				return;
			}
			updateInput(input + key);
			updateOutput(output + instance.encodeLetter(key));
		}
		window.document.body.addEventListener('keypress', handleKey);
		return () => {
			window.document.body.removeEventListener('keypress', handleKey);
		};
	}, [instance, input, updateInput, output, updateOutput]);

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)'
			}}
		>
			<div className="scrambler">
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
			</div>
			<pre>{`Input:  [${input.length > 34 ? '…' : ''}${input
				.toUpperCase()
				.substring(input.length - 34, input.length)}]`}</pre>
			<pre>{`Output: {${output.length > 34 ? '…' : ''}${output
				.toUpperCase()
				.substring(output.length - 34, output.length)}}`}</pre>
		</div>
	);
};

import { Machine as MachineClass } from '@wvbe/enigma-machine';
import { FunctionComponent } from 'react';
import { useEvent } from '../hooks/useEvent';
import { Keyboard } from './Keyboard';
import { Scrambler } from './Scrambler';

export const Machine: FunctionComponent<{ instance: MachineClass }> = ({ instance }) => {
	const [offsets] = useEvent(instance.$encode, []);
	return (
		<div className="machine">
			<Keyboard character={offsets[offsets.length - 1]} isLamp={true} />
			<div style={{ position: 'relative' }}>
				<Scrambler machine={instance} />
				{!offsets.length && (
					<div className="not-used-before">
						<div>Press any letter on your keyboard or below to begin!</div>
					</div>
				)}
			</div>
			<Keyboard
				character={offsets[0]}
				isLamp={false}
				onLetterPress={letter => {
					instance.encode(letter.toLowerCase());
				}}
			/>
		</div>
	);
};

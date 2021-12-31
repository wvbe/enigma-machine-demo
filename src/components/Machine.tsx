import { FunctionComponent, useMemo } from 'react';
import { Machine as MachineClass } from '../classes/Machine';
import { Rotor as RotorClass } from '../classes/Rotor';
import { Reflector } from './Reflector';
import { Rotor } from './Rotor';

const Scrambler: FunctionComponent<{ rotors: RotorClass[]; reflector?: RotorClass }> = ({
	rotors,
	reflector
}) => {
	const rotorsInversed = useMemo(() => rotors.slice().reverse(), [rotors]);
	return (
		<div className="scrambler">
			{reflector && <Reflector instance={reflector} />}
			{rotorsInversed.map((rotor, i) => (
				<Rotor key={i} instance={rotor} />
			))}
		</div>
	);
};

export const Machine: FunctionComponent<{ instance: MachineClass }> = ({ instance }) => {
	return (
		<div>
			<Scrambler rotors={instance.rotors} reflector={instance.reflector} />
		</div>
	);
};

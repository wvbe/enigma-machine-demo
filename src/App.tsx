import { useMemo } from 'react';
import { Machine } from './components/Machine';
import { rotors, Machine as MachineClass } from '@wvbe/enigma-machine';

function App() {
	const machine = useMemo(() => {
		const machine = new MachineClass();
		machine.addRotor(rotors.I.clone());
		machine.addRotor(rotors.II.clone());
		machine.addRotor(rotors.III.clone());
		machine.setReflector(rotors.UKW_B.clone());
		machine.plugboard.plug(12, 4);
		machine.plugboard.plug(24, 25);
		console.log(machine);
		(window as any).machine = machine;
		return machine;
	}, []);

	return <Machine instance={machine} />;
}

export default App;

import { useMemo } from 'react';
import { Machine as MachineClass } from './classes/Machine';
import { Machine } from './components/Machine';
import { ALPHABET, I, II, III, UKW_B } from './constants/rotors';

function App() {
	const machine = useMemo(() => {
		const machine = new MachineClass(ALPHABET);
		machine.addRotor(I.clone());
		machine.addRotor(II.clone());
		machine.addRotor(III.clone());
		machine.setReflector(UKW_B.clone());
		console.log(machine);
		(window as any).machine = machine;
		return machine;
	}, []);

	return (
		<>
			<Machine instance={machine} />
		</>
	);
}

export default App;

import React from 'react';
import './App.css';
import { Machine } from './classes/Machine';
import { UKW_B, I, II, III } from './constants/rotors';
import logo from './logo.svg';

const machine = new Machine();
machine.addRotor(I.clone());
machine.addRotor(II.clone());
machine.addRotor(III.clone());
machine.setReflector(UKW_B.clone());

(window as any).machine = machine;

(window as any).reset = () => {
	machine.rotors.forEach(rotor => {
		rotor.position = 0;
	});
};
(window as any).encode = (str: string) =>
	str
		.split('')
		.map(char => machine.encodeLetter(char))
		.join('');
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;

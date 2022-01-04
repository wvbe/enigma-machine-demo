import styled from '@emotion/styled';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Machine as MachineClass } from '../classes/Machine';
import { useEvent } from '../hooks/useEvent';
import { Key } from '../skeumorphic/Key';
import { Keyboard } from '../skeumorphic/Keyboard';
import { Lamp } from '../skeumorphic/Lamp';
import { Rotor } from '../skeumorphic/Rotor';

const StyledBox = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;
	align-items: stretch;

	& > * {
		margin-top: 2em;
		&:first-child {
			margin-top: 0;
		}
	}
`;

export const Machine: FunctionComponent<{ instance: MachineClass }> = ({ instance }) => {
	const [offsets] = useEvent(instance.$encode, []);
	const [lastPressedKey, setLastPressedKey] = useState<null | string>(null);
	useEffect(() => {
		function handleKey(event: KeyboardEvent) {
			const key = event.key.toLowerCase();
			if (key.length !== 1 || !key.match(/[a-z]/g)) {
				return;
			}
			setLastPressedKey(`${key}:${Date.now()}`);
			instance.encodeLetter(key);
		}
		window.document.body.addEventListener('keypress', handleKey);
		return () => {
			window.document.body.removeEventListener('keypress', handleKey);
		};
	}, [instance]);
	const renderKeyboardKey = useCallback(
		(letter: string) => (
			<Key
				onClick={() => {
					instance.encodeLetter(letter.toLowerCase());
				}}
				pressed={
					letter.toLowerCase() === lastPressedKey?.charAt(0) ? lastPressedKey : false
				}
			>
				{letter}
			</Key>
		),
		[instance, lastPressedKey]
	);
	const renderLampboardKey = useCallback(
		(letter: string, index: number) => (
			<Lamp isLighted={offsets[offsets.length - 1] === index}>{letter}</Lamp>
		),
		[offsets]
	);

	return (
		<StyledBox>
			<div style={{ whiteSpace: 'pre', textAlign: 'center' }}>
				{instance.rotors
					.slice()
					.reverse()
					.map((rotor, i) => (
						<>
							{i > 0 ? '       ' : null}
							<Rotor
								key={i}
								position={(rotor.position % rotor.alphabet.length) + 1}
							/>
						</>
					))}
			</div>
			<Keyboard renderKey={renderLampboardKey} />
			<Keyboard renderKey={renderKeyboardKey} />
		</StyledBox>
	);
};

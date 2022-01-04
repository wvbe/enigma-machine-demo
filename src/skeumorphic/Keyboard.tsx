import styled from '@emotion/styled';
import { Fragment, FunctionComponent, ReactElement } from 'react';
import { ALPHABET } from '../constants/rotors';
import bg from '../images/dots.jpeg';

const StyledKeyboard = styled.div`
	background: url('${bg}');
	background-color: #222;
	padding: 1.25rem;
	border-radius: 1.5625rem;
	box-shadow: 0 0.5rem 1rem rgba(255, 255, 255, 0.1) inset,
		0 -0.5rem 1rem rgba(0, 0, 0, 0.3) inset;
	& > * {
		margin-top: 0.125rem;
		&:first-child {
			margin-top: 0;
		}
	}
`;

const StyledKeyboardRow = styled.div`
	white-space: nowrap;
	text-align: center;

	& > * {
		margin-left: 0.4375rem;
		&:first-child {
			margin-left: 0;
		}
	}
`;

export const Keyboard: FunctionComponent<{
	alphabet?: string;
	renderKey: (letter: string, index: number) => ReactElement;
}> = ({ alphabet = ALPHABET, renderKey }) => {
	return (
		<StyledKeyboard>
			<StyledKeyboardRow>
				{'QWERTYUIOP'.split('').map(letter => (
					<Fragment key={letter}>
						{renderKey(
							alphabet.charAt(ALPHABET.indexOf(letter)),
							ALPHABET.indexOf(letter)
						)}
					</Fragment>
				))}
			</StyledKeyboardRow>
			<StyledKeyboardRow>
				{'ASDFGHJKL'.split('').map(letter => (
					<Fragment key={letter}>
						{renderKey(
							alphabet.charAt(ALPHABET.indexOf(letter)),
							ALPHABET.indexOf(letter)
						)}
					</Fragment>
				))}
			</StyledKeyboardRow>
			<StyledKeyboardRow>
				{'ZXCVBNM'.split('').map(letter => (
					<Fragment key={letter}>
						{renderKey(
							alphabet.charAt(ALPHABET.indexOf(letter)),
							ALPHABET.indexOf(letter)
						)}
					</Fragment>
				))}
			</StyledKeyboardRow>
		</StyledKeyboard>
	);
};

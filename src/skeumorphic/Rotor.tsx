import styled from '@emotion/styled';
import { FunctionComponent } from 'react';

const StyledRotor = styled.div`
	border-radius: 0.3125rem;
	padding: 0.125rem;
	display: inline-block;
	background-color: #bebebe;
	border-top: 0.0625rem solid #fff;
	border-bottom: 0.0625rem solid #7a7a7a;
`;

const StyledRotorWheel = styled.div`
	border-radius: 0.1875rem;
	box-shadow: 0 0 0.1875rem rgba(0, 0, 0, 0.8) inset;
	/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#a3a3a3+0,b7b7b7+6,efefef+28,efefef+68,b7b7b7+92,969696+100 */
	background: #a3a3a3; /* Old browsers */
	background: linear-gradient(
		to bottom,
		#a3a3a3 0%,
		#b7b7b7 6%,
		#ffffff 28%,
		#efefef 68%,
		#b7b7b7 92%,
		#969696 100%
	); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
`;

const StyledRotorLetter = styled.div`
	font-family: monospace;
	text-align: center;
	line-height: 2.25rem;
	width: 2.25rem;
	font-size: 1.5rem;
	border-top: 0.0625rem solid rgba(0, 0, 0, 0.1);
	&:first-child {
		border-top: none;
	}
`;

export const Rotor: FunctionComponent<{ position: number }> = ({ position }) => {
	const str = position < 10 ? `0${position}` : String(position);

	return (
		<StyledRotor>
			<StyledRotorWheel>
				<StyledRotorLetter>{str}</StyledRotorLetter>
			</StyledRotorWheel>
		</StyledRotor>
	);
};

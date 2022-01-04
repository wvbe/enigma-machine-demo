import styled from '@emotion/styled';
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';

const BUTTON_DEPTH = 0.3125;
const BUTTON_BORDER_RADIUS = 0.9375;

const StyledButton = styled.div`
	display: inline-block;
	position: relative;
	padding-bottom: ${BUTTON_DEPTH}rem;
`;

const StyledButtonSurface = styled.div<{ isClicked: boolean }>`
	font-family: sans-serif;
	font-weight: bold;
	font-size: 0.75rem;
	position: relative;
	top: ${({ isClicked }) => (isClicked ? BUTTON_DEPTH + 'rem' : 0)};
	transition: top 0.05s;
	z-index: 2;

	min-width: 2.5rem;
	height: 2.5rem;
	line-height: 2.5rem;

	padding: 0 1em;
	text-align: center;

	color: #b6b6a5;
	background-color: #413333;
	box-sizing: border-box;
	box-shadow: 0 0 0.625rem -0.1875rem #000 inset;
	border-radius: ${BUTTON_BORDER_RADIUS}rem;
	border-top: 0.0625rem solid #727268;
	border-bottom: 0.0625rem solid #58584f;

	&:hover {
		cursor: pointer;
		/* color: #fff; */
		/* text-shadow: 0 0 0.3125rem #ebbbbb, 0 0 0.125rem #ebbbbb, 0 0 0.125rem #fff; */
	}
`;
const StyledButtonBevel = styled.div`
	z-index: 1;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: calc(100% - ${2 * BUTTON_DEPTH}rem);

	border-radius: ${BUTTON_BORDER_RADIUS}rem;
	box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, 0.3), 0 0 0.1875rem 0 rgba(0, 0, 0, 0.8);

	background: linear-gradient(0deg, #030303 0%, #545455 25%, #646b6d 100%);
`;

type Timeout = ReturnType<typeof setTimeout>;

export const Key: FunctionComponent<{
	pressed: boolean | string;
	onClick: () => void;
}> = ({ children, onClick: onClickInner, pressed }) => {
	const [isClicked, setIsClicked] = useState(false);
	const isClickedTimeout = useRef<null | Timeout>(null);
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	const showCompressedState = useCallback(() => {
		setIsClicked(true);
		if (isClickedTimeout.current) {
			clearTimeout(isClickedTimeout.current);
		}
		isClickedTimeout.current = setTimeout(() => {
			setIsClicked(false);
		}, 300);
	}, []);
	useEffect(() => {
		if (pressed) {
			showCompressedState();
		}
	}, [pressed, showCompressedState]);
	const onClick = useCallback(() => {
		showCompressedState();
		onClickInner();
	}, [onClickInner, showCompressedState]);

	return (
		<StyledButton onMouseDown={onClick}>
			<StyledButtonSurface isClicked={isClicked}>{children}</StyledButtonSurface>
			<StyledButtonBevel />
		</StyledButton>
	);
};

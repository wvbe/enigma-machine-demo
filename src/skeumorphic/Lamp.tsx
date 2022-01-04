import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';

const BUTTON_DEPTH = 0.3125;
const BUTTON_BORDER_RADIUS = 0.9375;

const StyledLamp = styled.div`
	display: inline-block;
	position: relative;
	padding-bottom: ${BUTTON_DEPTH}rem;
`;

const StyledLampSurface = styled.div<{ isLighted: boolean }>`
	font-family: sans-serif;
	font-weight: bold;
	font-size: 0.75rem;
	position: relative;
	transition: top 0.05s;
	z-index: 2;

	min-width: 2.5rem;

	height: 2.5rem;
	line-height: 2.5rem;

	padding: 0 1em;
	text-align: center;

	box-sizing: border-box;
	border-radius: ${BUTTON_BORDER_RADIUS}rem;

	transition: all 0.25s;
	${({ isLighted }) =>
		!isLighted
			? css`
					border-top: 0.0625rem solid #727268;
					border-bottom: 0.0625rem solid #58584f;
					background-color: #413333;
					color: #666655;
					box-shadow: 0 0 0.625rem -0.1875rem #000 inset;
			  `
			: css`
					border-top: 0.0625rem solid #ffffff;
					border-bottom: 0.0625rem solid #ffffbf;
					background-color: #b3f07a;
					color: #7e4414;
					text-shadow: 0 0 0.3125rem #ebbbbb, 0 0 0.125rem #ebbbbb, 0 0 0.125rem #fff;
					box-shadow: 0 0 0.3125rem 0 #fbfd8b, 0 0 0.625rem #f4ffc5 inset;
			  `};
`;
const StyledLampBevel = styled.div<{ isLighted: boolean }>`
	z-index: 1;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: calc(100% - ${2 * BUTTON_DEPTH}rem);

	border-radius: ${BUTTON_BORDER_RADIUS}rem;
	transition: all 0.5s;
	${({ isLighted }) =>
		!isLighted
			? css`
					background: linear-gradient(0deg, #030303 0%, #545455 25%, #646b6d 100%);
					box-shadow: 0 0.1875rem 0.25rem 0 rgba(0, 0, 0, 0.3),
						0 0 0.1875rem 0 rgba(0, 0, 0, 0.8);
			  `
			: css`
					background: linear-gradient(0deg, #c53232 0%, #e9b14a 25%, #f7ef85 100%);
					box-shadow: 0 0.1875rem 0.25rem 0 rgba(255, 21, 21, 0.3),
						0 0 0.1875rem 0 rgba(255, 35, 35, 0.8);
			  `}
`;

export const Lamp: FunctionComponent<{
	isLighted?: boolean;
}> = ({ children, isLighted }) => {
	// const [isLighted, setIsLighted] = useState(!!isLightedInner);
	// const isLightedTimeout = useRef<null | Timeout>(null);
	// const isMounted = useRef(false);

	// useEffect(() => {
	// 	isMounted.current = true;
	// 	return () => {
	// 		isMounted.current = false;
	// 	};
	// }, []);

	return (
		<StyledLamp>
			<StyledLampSurface isLighted={!!isLighted}>{children}</StyledLampSurface>
			<StyledLampBevel isLighted={!!isLighted} />
		</StyledLamp>
	);
};

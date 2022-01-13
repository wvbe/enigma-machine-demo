import { FunctionComponent } from 'react';
import { yForI } from '../util/svg';

export const SignalLetter: FunctionComponent<{
	x: number;
	index: number;
	highlight?: string;
	letter: string;
}> = ({ x, index, letter, highlight }) => {
	const y = yForI(index);
	return (
		<>
			{highlight && <circle cx={x} cy={y + 1} r={7.5} fill="white" stroke={highlight} />}
			<text x={x} y={y} textAnchor="middle" alignmentBaseline="central">
				{letter}
			</text>
		</>
	);
};

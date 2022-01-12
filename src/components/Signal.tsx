import { FunctionComponent } from 'react';
import { ROTOR_PADDING, ROTOR_WIDTH, yForI } from '../util/svg';

export const Signal: FunctionComponent<{
	stroke?: string;
	from?: number;
	to?: number;
}> = ({ from, to, stroke = 'black' }) => {
	if (from === undefined || to === undefined) {
		return null;
	}
	return (
		<polyline
			points={[
				[0, yForI(from)],
				[ROTOR_PADDING, yForI(from)],
				[ROTOR_WIDTH - ROTOR_PADDING, yForI(to)],
				[ROTOR_WIDTH, yForI(to)]
			]
				.map(c => c.join(','))
				.join(' ')}
			stroke={stroke}
			fill="none"
		/>
	);
};

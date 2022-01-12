import { FunctionComponent } from 'react';
import { WIRE_PADDING, ROTOR_WIDTH, yForI } from '../util/svg';

export const Signal: FunctionComponent<{
	stroke?: string;
	from?: number;
	to?: number;
	short?: boolean;
}> = ({ from, to, stroke = 'black', short }) => {
	if (from === undefined || to === undefined) {
		return null;
	}
	const coords = [
		[WIRE_PADDING, yForI(from)],
		[ROTOR_WIDTH - WIRE_PADDING, yForI(to)]
	];
	if (!short) {
		coords.unshift([0, yForI(from)]);
		coords.push([ROTOR_WIDTH, yForI(to)]);
	}
	return <polyline points={coords.map(c => c.join(',')).join(' ')} stroke={stroke} fill="none" />;
};

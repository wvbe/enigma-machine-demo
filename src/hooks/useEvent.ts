import { useEffect, useState } from 'react';
import { Event } from '@wvbe/enigma-machine';

export function useEvent<P extends unknown[]>(event: Event<P>, ...initialValue: P) {
	const [lastValue, setLastValue] = useState<P>(initialValue);
	useEffect(() => event.on((...data) => setLastValue(data)), [event]);
	return lastValue;
}

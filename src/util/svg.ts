export const ROTOR_WIDTH = 100;
export const ROTOR_PADDING = 20;
export const ROTOR_HEIGHT_PER_CHAR = 24;
export const ROTOR_HEIGHT = ROTOR_HEIGHT_PER_CHAR * 26;
export const REFLECTOR_WIDTH = 30;
export const PLUGBOARD_WIDTH = 100;
/**
 * Returns the Y pixel offset for a signal index
 */
export function yForI(index: number) {
	return ((26 - 1 - index) % 26) * ROTOR_HEIGHT_PER_CHAR + 0.5 * ROTOR_HEIGHT_PER_CHAR;
}

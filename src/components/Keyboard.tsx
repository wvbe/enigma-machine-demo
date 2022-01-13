import { FunctionComponent } from 'react';

const KeyboardLetter: FunctionComponent<{
	letter: string;
	enabled: boolean;
	isLamp: boolean;
	onPress?: (letter: string) => void;
}> = ({ letter, enabled, isLamp, onPress }) => {
	const onClick = onPress
		? () => {
				onPress(letter);
		  }
		: undefined;
	const className = [
		isLamp ? 'is-lamp' : 'is-key',
		enabled ? 'enabled' : undefined,
		onClick ? 'has-click' : undefined
	]
		.filter(Boolean)
		.join(' ');
	return (
		<pre className={className} onClick={onClick}>
			{` ${letter} `}
		</pre>
	);
};

const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const Keyboard: FunctionComponent<{
	alphabet?: string;
	character?: number;
	isLamp: boolean;
	onLetterPress?: (letter: string) => void;
}> = ({ alphabet = DEFAULT_ALPHABET, character, isLamp, onLetterPress }) => {
	return (
		<div className="keyboard">
			<div>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('Q'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('Q')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('W'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('W')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('E'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('E')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('R'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('R')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('T'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('T')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('Y'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('Y')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('U'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('U')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('I'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('I')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('O'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('O')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('P'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('P')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
			</div>
			<div>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('A'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('A')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('S'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('S')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('D'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('D')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('F'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('F')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('G'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('G')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('H'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('H')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('J'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('J')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('K'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('K')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('L'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('L')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
			</div>
			<div>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('Z'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('Z')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('X'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('X')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('C'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('C')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('V'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('V')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('B'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('B')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('N'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('N')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
				<KeyboardLetter
					letter={alphabet.charAt(DEFAULT_ALPHABET.indexOf('M'))}
					enabled={character === DEFAULT_ALPHABET.indexOf('M')}
					isLamp={isLamp}
					onPress={onLetterPress}
				/>
			</div>
		</div>
	);
};

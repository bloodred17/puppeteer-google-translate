import { TranslationOptions, PptrLaunchOptions } from '../src/types';
import { translateText, translateDocs } from '../src/index';

const translationOptions: TranslationOptions = { to: 'es'};
const launchOptions: PptrLaunchOptions = { headless: true };

jest.setTimeout(10000);

test('text', async () => {
	const result = await translateText('text', translationOptions, launchOptions);
	expect(result).toBe('texto');
});

test('textArray', async () => {
	const result = await translateText(['text', 'array'], translationOptions, launchOptions);
	expect(result).toStrictEqual(['texto', 'formación']);
});

test('docs', async () => {
	const result = await translateDocs('./test/assets/txt.txt', translationOptions, launchOptions);
	expect(result).toBe('TXT');
});

test('docsArray', async () => {
	const result = await translateDocs(
		['./test/assets/txt.txt', './test/assets/docx.docx'],
		translationOptions,
		launchOptions
	);
	expect(result).toStrictEqual(['TXT', 'docx']);
});

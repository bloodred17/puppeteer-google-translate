import { translateText, translateDocs } from '../src/index';
import { PptrLaunchOptions, TranslationOptions } from '../src/types';

const translationOptions: TranslationOptions = { to: 'es'};
const launchOptions: PptrLaunchOptions = { headless: true };


jest.setTimeout(10000);

describe('fileSize', () => {
	test('docs', async () => {
		await expect(
			translateDocs('./test/assets/limit.txt', translationOptions, launchOptions)
		).rejects.toThrow();
	});
	test('docsArray', async () => {
		await expect(
			translateDocs(['./test/assets/limit.txt'], translationOptions, launchOptions)
		).rejects.toThrow();
	});
});

describe('fileType', () => {
	test('docs', async () => {
		await expect(translateDocs('./test/assets/err.err', translationOptions, launchOptions)).rejects.toThrow();
	});
	test('docsArray', async () => {
		await expect(
			translateDocs(['./test/assets/err.err'], translationOptions, launchOptions)
		).rejects.toThrow();
	});
});

describe('invalidType', () => {
	test('text', async () => {
		expect(() => {
			translateText(null, translationOptions, launchOptions);
		}).toThrow();
	});
	test('textArray', async () => {
		expect(() => {
			translateText(null, translationOptions, launchOptions);
		}).toThrow();
	});
	test('docs', async () => {
		expect(() => {
			translateDocs(null, translationOptions, launchOptions);
		}).toThrow();
	});
	test('docsArray', async () => {
		expect(() => {
			translateDocs(null, translationOptions, launchOptions);
		}).toThrow();
	});
});

describe('textOverflow', () => {
	test('text', async () => {
		expect(() => {
			translateText('error'.repeat(1001), translationOptions, launchOptions);
		}).toThrow();
	});
	test('textArray', async () => {
		expect(() => {
			translateText(['error'.repeat(1001)], translationOptions, launchOptions);
		}).toThrow();
	});
});

describe('textLenZero', () => {
	test('text', async () => {
		expect(() => {
			translateText('', translationOptions, launchOptions);
		}).toThrow();
	});
	test('textArray', async () => {
		expect(() => {
			translateText([''], translationOptions, launchOptions);
		}).toThrow();
	});
});

describe('arrayLenZero', () => {
	test('textArray', async () => {
		expect(() => {
			translateText([], translationOptions, launchOptions);
		}).toThrow();
	});
	test('docsArray', async () => {
		expect(() => {
			translateDocs([], translationOptions, launchOptions);
		}).toThrow();
	});
});

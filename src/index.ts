import { TranslationOptions, PptrLaunchOptions } from './types';
import fromText from './translate/text';
import fromDocs from './translate/docs';
import buildQuery from './utils/buildQuery';
import fromTextArray from './translate/textArray';
import fromDocsArray from './translate/docsArray';
import { errArrayLenZero, errInvalidType } from './error';

function translateText(
	text: string | string[],
	translationOptions: TranslationOptions,
	launchOptions?: PptrLaunchOptions
): Promise<string | string[]> {
	if (typeof text === 'string')
		return fromText(
			buildQuery({ text, to: translationOptions.to, from: translationOptions?.from, op: 'translate' }),
			launchOptions
		);
	if (Array.isArray(text)) {
		if (text.length === 0) return errArrayLenZero();
		const queryArr: string[] = [];
		for (let i = 0; i < text.length; i++)
			queryArr[i] = buildQuery({
				text: text[i],
				to: translationOptions.to,
				from: translationOptions.from,
				op: 'translate'
			});
		return fromTextArray(queryArr, launchOptions);
	}
	return errInvalidType(typeof text);
}

function translateDocs(
	path: string | string[],
	translationOptions: TranslationOptions,
	launchOptions?: PptrLaunchOptions
): Promise<string | string[]> {
	if (typeof path === 'string') {
		return fromDocs(
			buildQuery({ to: translationOptions.to, from: translationOptions?.from, op: 'docs' }),
			path,
			launchOptions
		);
	}
	if (Array.isArray(path)) {
		if (path.length === 0) return errArrayLenZero();
		const queryArr: string[] = [];
		for (let i = 0; i < path.length; i++)
			queryArr[i] = buildQuery({
				to: translationOptions.to,
				from: translationOptions?.from,
				op: 'docs'
			});
		return fromDocsArray(queryArr, path, launchOptions);
	}
	return errInvalidType(typeof path);
}

export { translateText, translateDocs, PptrLaunchOptions, TranslationOptions };

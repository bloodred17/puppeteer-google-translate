import launch from '../launch';
import { TranslationOptions, PptrLaunchOptions } from '../types';

export default async (
	query: string,
	launchOptions?: PptrLaunchOptions
): Promise<string> => {
	const { browser, page, timeout } = await launch(launchOptions);
	try {
		await page.goto('https://translate.google.com/' + query);
		const el = await page.waitForSelector('span>span>span[jsaction]', {
			timeout
		});
		const result = await el.evaluate((e) => e.textContent);
		return result;
	} catch (err) {
		throw err;
	} finally {
		await browser.close();
	}
};

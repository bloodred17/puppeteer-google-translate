import launch from '../launch';
import { PptrLaunchOptions } from '../types';

export default async (
	query: string[],
	launchOptions?: PptrLaunchOptions
): Promise<string[]> => {
	const { browser, page, timeout } = await launch(launchOptions);
	const result: string[] = [];
	for (let i = 0; i < query.length; i++) {
		try {
			await page.goto('https://translate.google.com/' + query[i]);
			const el = await page.waitForSelector('span>span>span[jsaction]', {
				timeout
			});
			result[i] = await el.evaluate((e) => e.textContent);
		} catch (err) {
			await browser.close();
			throw err;
		}
	}
	await browser.close();
	return result;
};

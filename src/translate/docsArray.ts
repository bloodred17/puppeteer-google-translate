import launch from '../launch';
import { ElementHandle } from 'puppeteer';
import { errFileSize, errFileType } from '../error';
import { isExtensionValid, isFileSizeValid } from '../utils/docsValid';
import { PptrLaunchOptions } from '../types';

export default async (
	query: string[],
	path: string[],
	launchOptions?: PptrLaunchOptions
): Promise<string[]> => {
	const { browser, page, timeout } = await launch(launchOptions);
	const result: string[] = [];
	for (let i = 0; i < query.length; i++) {
		try {
			const extension: string = path[i].split('.').pop();
			if (!isExtensionValid(extension)) return errFileType(extension);
			if (!isFileSizeValid(path[i])) return errFileSize();
			await page.goto('https://translate.google.com/' + query[i]);
			const [fileChooser] = await Promise.all([
				page.waitForFileChooser(),
				page.click('label')
			]);
			await fileChooser.accept([path[i]]);
			await page.click('form>div>div>div>button');
			await page.waitForNavigation();
			let el: ElementHandle;
			if (extension === 'txt')
				el = await page.waitForSelector('pre', { timeout });
			else el = await page.waitForSelector('font>font', { timeout });
			result[i] = await el.evaluate((e) => e.textContent);
		} catch (err) {
			await browser.close();
			throw err;
		}
	}
	await browser.close();
	return result;
};

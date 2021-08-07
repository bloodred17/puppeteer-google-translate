import launch from '../launch';
import { ElementHandle } from 'puppeteer';
import { errFileSize, errFileType } from '../error';
import { isExtensionValid, isFileSizeValid } from '../utils/docsValid';
import { PptrLaunchOptions } from '../types';

export default async (
	query: string,
	path: string,
	launcOptions?: PptrLaunchOptions
): Promise<string> => {
	const extension: string = path.split('.').pop();
	if (!isExtensionValid(extension)) return errFileType(extension);
	if (!isFileSizeValid(path)) return errFileSize();
	const { browser, page, timeout } = await launch(launcOptions);
	try {
		await page.goto('https://translate.google.com/' + query);
		const [fileChooser] = await Promise.all([
			page.waitForFileChooser(),
			page.click('label')
		]);
		await fileChooser.accept([path]);
		await page.click('form>div>div>div>button');
		await page.waitForNavigation();
		let el: ElementHandle;
		if (extension === 'txt')
			el = await page.waitForSelector('pre', { timeout });
		else el = await page.waitForSelector('font>font', { timeout });
		const result = await el.evaluate((e) => e.textContent);
		return result;
	} catch (err) {
		throw err;
	} finally {
		await browser.close();
	}
};

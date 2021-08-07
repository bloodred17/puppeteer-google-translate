import puppeteer from 'puppeteer';
import { PptrLaunchOptions } from './types';

export default async (
	launcOptions?: PptrLaunchOptions
): Promise<{
	browser: puppeteer.Browser;
	page: puppeteer.Page;
	timeout: number;
}> => {
	const launchOptionsDefault: PptrLaunchOptions = { headless: true, timeout: 10000 };
	const browser = await puppeteer.launch(launcOptions || launchOptionsDefault);
	const [page] = await browser.pages();
	const timeout: number = launcOptions.timeout || launchOptionsDefault.timeout;
	return { browser, page, timeout };
};

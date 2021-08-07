# Fork of: puppeteer-google-translate

Translate texts or documents with Google Translate using Puppeteer

This is a fork of [puppeteer-google-translate](https://github.com/alanleungcn/puppeteer-google-translate)


<!-- ## Installation -->
<!-- 
```bash
npm i puppeteer-google-translate
``` -->

## Changes

At the time of fork the version of [puppeteer-google-translate](https://github.com/alanleungcn/puppeteer-google-translate) is 1.0.3.

- This version supports direct supply of launch options to Puppeteer.
- It separates Options into TranslationOptions and PptrLaunchOptions and exposes them for better typescript support.

## Usage

### Javascript

```js
const { translateText, translateDocs } = require('puppeteer-google-translate');

const launchOptions = { timeout: 10000, headless: true };
// Puppeteer launch options

const translationOptions = { from: 'en', to: 'es' };
// translate from English to Spanish

translateText('text', translationOptions, launchOptions).then((result) => {
  // result: texto
});

translateText(['text', 'array'], translationOptions, launchOptions).then((result) => {
  // result: ['texto', 'formación']
});

translateDocs('txt.txt', translationOptions, launchOptions).then((result) => {
  // result: translated text
});

translateDocs(['txt.txt', 'docx.docx'], translationOptions, launchOptions).then((result) => {
  // result: array of translated text
});
```

### Typescript

```ts
import { translateText, translateDocs } from 'puppeteer-google-translate';

(async () => {
  const launchOptions: PptrLaunchOptions = { timeout: 10000, headless: true };
  // Puppeteer launch options

  const translationOptions: TranslationOptions = { from: 'en', to: 'es' };
  // translate from English to Spanish

  const result = await translateText('text', translationOptions, launchOptions);
  // result: texto
})()
```

## API

### translateText(text, TranslationOptions, PptrLaunchOptions)

- `text` \<string | string[]> Text or an array of text to be translated
- returns: Promise\<string | string[]>

### translateDocs(path, TranslationOptions, PptrLaunchOptions)

- `path` \<string | string[]> Path or an array of path that points to documents
- returns: Promise\<string | string[]>
  
- `TranslationOptions` \<Object>
  - `to` \<string> Language to translate to
  - `from` \<?string> Language to translate from. Defaults to `auto`
  
- `PptrLaunchOptions` \<?Object> Puppeteer Launch Options
  - `timeout` \<?number> Time in ms before Puppeteer throws an error, pass `0` to disable timeout. Defaults to `10000`
  - `headless` \<?boolean> Whether to run browser in headless mode. Defaults to `true`
  - `args` \<?Array[string]> Puppeteer launch arguements


## Disclaimer

This is a fork of [puppeteer-google-translate](https://github.com/alanleungcn/puppeteer-google-translate)

It is only for educational purposes, for Google translation api please check out [the official document](https://cloud.google.com/translate)

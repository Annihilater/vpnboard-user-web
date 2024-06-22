const { defineConfig } = require('@lobehub/i18n-cli');

module.exports = defineConfig({
  entry: './src/i18n/locales/en-US',
  entryLocale: 'en-US',
  output: './src/i18n/locales',
  outputLocales: [
    'cs-CZ',
    'de-DE',
    'en-US',
    'es-ES',
    'es-MX',
    'fi-FI',
    'fr-FR',
    'hi-IN',
    'hu-HU',
    'ja-JP',
    'ko-KR',
    'no-NO',
    'pl-PL',
    'pt-BR',
    'ro-RO',
    'ru-RU',
    'th-TH',
    'tr-TR',
    'uk-UA',
    'vi-VN',
    'zh-CN',
    'zh-TW',
  ],
  experimental: {
    jsonMode: true,
  },
  markdown: {
    entry: ['./README.md'],
    entryLocale: 'en-US',
    outputLocales: ['zh-CN', 'zh-TW'],
  },
});

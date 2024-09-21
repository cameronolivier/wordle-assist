/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports'), require.resolve('prettier-plugin-tailwindcss')],
  singleQuote: true,

  importOrder: ["<BUILT_IN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", '^~/(.*)$', '', '^../(.*)$', '', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.4.5',
};

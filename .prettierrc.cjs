/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports'), require.resolve('prettier-plugin-tailwindcss')],
  singleQuote: true,
  importOrder: ['^~/(.*)$', '^../(.*)$', '^[./]'],
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

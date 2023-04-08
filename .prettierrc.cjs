module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  printWidth: 140,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: ['^~/(.*)$', '^../(.*)$', '^[./]'],
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

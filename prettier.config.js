module.exports = {
    printWidth: 150,
    tabWidth: 4,
    singleQuote: false,
    quoteProps: "as-needed",
    semi: true,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "avoid",
    proseWrap: "always",
    endOfLine: "lf",
    overrides: [{ files: ["*.yml", "*.yaml"], options: { tabWidth: 2 } }],
};

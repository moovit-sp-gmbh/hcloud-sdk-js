import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/node_modules", "**/build"],
    },
    ...fixupConfigRules(compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:import/typescript", "prettier")),
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: "module",
        },

        rules: {
            "constructor-super": 2,
            "getter-return": 2,
            "no-async-promise-executor": 2,
            "no-case-declarations": 2,

            "no-console": [
                1,
                {
                    allow: ["error"],
                },
            ],

            "no-const-assign": 2,
            "no-constant-condition": 2,
            "no-constructor-return": 2,
            "no-dupe-args": 2,
            "no-dupe-class-members": 2,
            "no-dupe-else-if": 2,
            "no-duplicate-case": 1,
            "no-duplicate-imports": 1,
            "no-empty": 2,
            "no-ex-assign": 2,
            "no-func-assign": 2,
            "no-inner-declarations": 1,
            "no-invalid-regexp": 2,
            "no-loss-of-precision": 1,
            "no-misleading-character-class": 2,
            "no-prototype-builtins": 2,
            "no-redeclare": 2,
            "no-self-assign": 1,
            "no-self-compare": 1,
            "no-sparse-arrays": 1,
            "no-this-before-super": 2,
            "no-undef": 1,
            "no-unmodified-loop-condition": 1,
            "no-unreachable": 1,
            "no-unreachable-loop": 1,
            "no-use-before-define": 0,
            "no-useless-backreference": 1,
            "no-useless-escape": 2,
            "use-isnan": 1,
            "valid-typeof": 2,

            camelcase: [
                2,
                {
                    ignoreGlobals: true,
                },
            ],

            complexity: ["warn", 8],
            "consistent-return": 2,
            "default-case": 1,
            eqeqeq: 1,
            "new-cap": 2,
            "no-invalid-this": 2,
            "no-shadow-restricted-names": 2,
            "no-useless-catch": 1,
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-this-alias": 0,
            "@typescript-eslint/no-empty-interface": 0,
            "@typescript-eslint/ban-ts-comment": 0,
            "@typescript-eslint/no-unused-expressions": 0,

            "sort-imports": [
                "error",
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                    allowSeparatedGroups: true,
                },
            ],
        },
    },
    {
        files: ["*.ts"],
        languageOptions: {
            parser: tsParser,
        },
    }
];

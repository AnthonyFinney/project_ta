import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // your existing Next.js/TS presets
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    // custom rules to match editorconfig
    {
        rules: {
            // indentation: 4 spaces
            indent: ["error", 4, { SwitchCase: 1 }],

            // turn off max line length for .js
            "max-len": "off",

            // enforce LF line endings
            "linebreak-style": ["error", "unix"],

            // ensure final newline
            "eol-last": ["error", "always"],

            // trim trailing whitespace
            "no-trailing-spaces": ["error"],
        },

        overrides: [
            {
                // for JSON and YAML files, 2‑space indent
                files: ["*.json", "*.yml"],
                rules: {
                    indent: ["error", 2],
                },
            },
        ],
    },
];

export default eslintConfig;

module.exports = {
    extends: [
        require.resolve("@rimac-technology/style-guide/eslint/core"),
        require.resolve("@rimac-technology/style-guide/eslint/react"),
        require.resolve("@rimac-technology/style-guide/eslint/next"),
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    ignorePatterns: [
        "node_modules",
        "public",
        "dist",
        ".eslintrc.js",
        "next.config.js",
        "src/shared/types/supabase.ts"
    ],
    rules: {
        '@next/next/google-font-display': 'off',
        'no-console': 'off'
    }
}

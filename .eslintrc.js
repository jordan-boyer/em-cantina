module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-extra-parens": "error",
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/promise-function-async": [
            "error",
            {
                "allowedPromiseNames": [],
                "checkArrowFunctions": true,
                "checkFunctionDeclarations": true,
                "checkFunctionExpressions": true,
                "checkMethodDeclarations": true
            }
        ],
        "valid-jsdoc": [2, {
            "requireReturn": false
        }],
        "eqeqeq": [2, "smart"],
        "semi": "off",
        "no-useless-call": "error",
        "wrap-iife": [2, "inside"],
        "no-use-before-define": [2, {"functions": true, "classes": true}],
        "@typescript-eslint/semi": "error",
        "require-jsdoc": [2, {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false
            }
        }],
        "no-var": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-unused-vars": "off",
    },
    parserOptions: {
        ecmaVersion:  2018,
        project: "./tsconfig.json",
        parser: '@typescript-eslint/parser', 
        sourceType: "module"
    }
};

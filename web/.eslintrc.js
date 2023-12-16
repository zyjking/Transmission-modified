module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended"
  ],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "sonarjs",
    "unicorn"
  ],
  "rules": {
    "accessor-pairs": "error",
    "array-callback-return": "error",
    "arrow-spacing": "error",
    "block-scoped-var": "error",
    "class-methods-use-this": "error",
    "consistent-return": "error",
    "curly": "error",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "eqeqeq": "error",
    "grouped-accessor-pairs": "error",
    "guard-for-in": "error",
    "init-declarations": "error",
    "no-array-constructor": "error",
    "no-caller": "error",
    "no-confusing-arrow": "error",
    "no-constructor-return": "error",
    "no-delete-var": "error",
    "no-dupe-class-members": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-loss-of-precision": "error",
    "no-multi-str": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-promise-executor-return": "error",
    "no-proto": "error",
    "no-redeclare": "error",
    "no-restricted-exports": "error",
    "no-restricted-globals": "error",
    "no-restricted-imports": "error",
    "no-restricted-properties": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-template-curly-in-string": "error",
    "no-this-before-super": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreachable-loop": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-unused-vars": "error",
    "no-use-before-define": "error",
    "no-useless-backreference": "error",
    "no-useless-call": "error",
    "no-useless-catch": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-void": "error",
    "no-with": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": "error",
    "prefer-exponentiation-operator": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-spread": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "radix": "error",
    "require-atomic-updates": "error",
    "require-await": "error",
    "semi": "error",
    "sonarjs/cognitive-complexity": "off",
    "sonarjs/no-duplicate-string": "off",
    "sort-keys": "error",
    "strict": "error",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-fn-reference-in-iterator": "off",
    "unicorn/no-null": "off",
    "unicorn/no-reduce": "off",
    "unicorn/no-unused-properties": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/switch-case-braces": "off"
  }
};

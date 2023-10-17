/* eslint-disable no-undef */
module.exports = {
    '*': () => ['npm run check-secret', 'npm run format'],
    '**/*.ts?(x)': () => 'pnpm check-types',
    // "*.{json,yaml}": ["prettier --write"],
};

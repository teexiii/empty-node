
/* eslint-disable no-undef */
module.exports = {
    extends: ["@commitlint/config-conventional"],
    ignores: [(message) => /chore/m.test(message)],
};


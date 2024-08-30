// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.includes('[skip ci]')],
};

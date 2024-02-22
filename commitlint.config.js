/*
 * This config is used locally by the commit-msg hook to validate commit messages.
 * It implements the conventional commit specification, but also allows the additional commit
 * type called "tmp", which can be used to do temporary commits that are intended to be 
 * renamed or squashed later on. This commit message type cannot be pushed to remote.
 *
 * docs: https://commitlint.js.org/#/reference-configuration
 */

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "tmp",
      ],
    ],
  },
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
};

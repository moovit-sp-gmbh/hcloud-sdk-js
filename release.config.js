/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["HCLOUD-1996_Use-semantic-release-to-generate-changelog-from-commit-messages-in-js-SDK-and-to-release_Darius-Weiberg-3"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "changelog.md",
            },
        ],
        [
            "@semantic-release/git",
            {
                assets: ["changelog.md"],
            },
        ],
        "@semantic-release/github",
        [
            "@semantic-release/npm",
            {
                pkgRoot: "build",
            },
        ],
    ],
};

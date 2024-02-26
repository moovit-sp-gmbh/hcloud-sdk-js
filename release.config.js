/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["staging"],
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
        [
            "@semantic-release/github",
            {
                successComment: false,
            },
        ],
        [
            "@semantic-release/npm",
            {
                pkgRoot: "build",
            },
        ],
        [
            "semantic-release-telegram",
            {
                chats: [-1001743446580],
            },
        ],
    ],
};

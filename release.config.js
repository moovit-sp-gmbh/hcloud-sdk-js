/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["main", "test"],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                "preset": "conventionalcommits",
                "parserOpts": {
                    "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
                }
            }
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                "preset": "conventionalcommits",
                "parserOpts": {
                    "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
                }
            }
        ],
        [
            "@semantic-release/changelog",
            {
                changelogFile: "build/changelog.md",
            },
        ],
        [
            "@semantic-release/changelog",
            {
                changelogFile: "build-github/changelog.md",
            },
        ],
        [
            "@amanda-mitchell/semantic-release-npm-multiple",
            {
                registries: {
                    npmjs: {
                        pkgRoot: "build",
                        npmPublish: true,
                    },
                    github: {
                        pkgRoot: "build-github",
                        npmPublish: true,
                    },
                },
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

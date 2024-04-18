/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["HCLOUD-2508_Implement-semantic-release-for-agent-agent-bundle-wave-engine-wave-node-catalog_Darius-Weiberg"],
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

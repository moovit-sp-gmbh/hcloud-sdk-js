/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["semantic_test_darius", { name: "staging", prerelease: true }],
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
    ],
};

export interface Release {
    version: string;
    link: string;
    date: string;
    commitGroups: CommitGroup[];
}

export enum CommitType {
    feat = "Features",
    fix = "Bug Fixes",
    perf = "Performance Improvements",
    refactor = "Refactorings",
    docs = "Documentation",
    style = "Style",
    test = "Tests",
    build = "Build",
    ci = "CI",
    chore = "Chore",
    revert = "Reverts",
    breaking = "BREAKING CHANGES",
}

export interface CommitGroup {
    title: string;
    type: CommitType;
    commits: Commit[];
}

export interface Commit {
    message: string;
    hash: string;
    url: string;
}

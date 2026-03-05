import assert from "node:assert";
import { describe, it } from "node:test";
import { matchesQuery, Query } from "../src/lib/interfaces/high5/wave/dependentInputs";

describe("dependent node inputs", function() {
    const testCases = [
        {
            description: "simple boolean equality — match",
            input: { active: true },
            query: { active: true },
            expected: true,
        },
        {
            description: "simple boolean equality — no match",
            input: { active: false },
            query: { active: true },
            expected: false,
        },
        {
            description: "simple string equality — match",
            input: { role: "admin" },
            query: { role: "admin" },
            expected: true,
        },
        {
            description: "simple string equality — no match",
            input: { role: "user" },
            query: { role: "admin" },
            expected: false,
        },
        {
            description: "simple number equality — match",
            input: { age: 30 },
            query: { age: 30 },
            expected: true,
        },
        {
            description: "$eq operator — match",
            input: { score: 100 },
            query: { score: { $eq: 100 } },
            expected: true,
        },
        {
            description: "$ne operator — match",
            input: { status: "inactive" },
            query: { status: { $ne: "active" } },
            expected: true,
        },
        {
            description: "$ne operator — no match",
            input: { status: "active" },
            query: { status: { $ne: "active" } },
            expected: false,
        },
        {
            description: "$gt — match",
            input: { age: 25 },
            query: { age: { $gt: 18 } },
            expected: true,
        },
        {
            description: "$gt — no match",
            input: { age: 18 },
            query: { age: { $gt: 18 } },
            expected: false,
        },
        {
            description: "$gte — match on equal",
            input: { age: 18 },
            query: { age: { $gte: 18 } },
            expected: true,
        },
        {
            description: "$lt — match",
            input: { price: 9.99 },
            query: { price: { $lt: 10 } },
            expected: true,
        },
        {
            description: "$lte — no match",
            input: { price: 10.01 },
            query: { price: { $lte: 10 } },
            expected: false,
        },
        {
            description: "$contains — match",
            input: { label: "yo mate" },
            query: { label: { $contains: "yo" } },
            expected: true,
        },
        {
            description: "$contains — no match",
            input: { label: "hello world" },
            query: { label: { $contains: "yo" } },
            expected: false,
        },
        {
            description: "$startsWith — match",
            input: { name: "London" },
            query: { name: { $startsWith: "Lon" } },
            expected: true,
        },
        {
            description: "$startsWith — no match",
            input: { name: "Manchester" },
            query: { name: { $startsWith: "Lon" } },
            expected: false,
        },
        {
            description: "$endsWith — match",
            input: { filename: "report.pdf" },
            query: { filename: { $endsWith: ".pdf" } },
            expected: true,
        },
        {
            description: "$endsWith — no match",
            input: { filename: "report.docx" },
            query: { filename: { $endsWith: ".pdf" } },
            expected: false,
        },
        {
            description: "$regex — match",
            input: { email: "user@example.com" },
            query: { email: { $regex: "^[\\w.]+@[\\w.]+\\.[a-z]{2,}$" } },
            expected: true,
        },
        {
            description: "$regex — no match",
            input: { email: "not-an-email" },
            query: { email: { $regex: "^[\\w.]+@[\\w.]+\\.[a-z]{2,}$" } },
            expected: false,
        },
        {
            description: "$in — match",
            input: { role: "editor" },
            query: { role: { $in: ["admin", "editor", "viewer"] } },
            expected: true,
        },
        {
            description: "$in — no match",
            input: { role: "guest" },
            query: { role: { $in: ["admin", "editor", "viewer"] } },
            expected: false,
        },
        {
            description: "$nin — match",
            input: { role: "guest" },
            query: { role: { $nin: ["admin", "editor"] } },
            expected: true,
        },
        {
            description: "$nin — no match",
            input: { role: "admin" },
            query: { role: { $nin: ["admin", "editor"] } },
            expected: false,
        },
        {
            description: "$exists true — field present",
            input: { nickname: "ace" },
            query: { nickname: { $exists: true } },
            expected: true,
        },
        {
            description: "$exists true — field absent (null)",
            input: { nickname: null },
            query: { nickname: { $exists: true } },
            expected: false,
        },
        {
            description: "$type string — match",
            input: { code: "ABC" },
            query: { code: { $type: "string" } },
            expected: true,
        },
        {
            description: "$type number — no match",
            input: { code: "ABC" },
            query: { code: { $type: "number" } },
            expected: false,
        },
        {
            description: "$and — all clauses match",
            input: { active: true, role: "admin" },
            query: { $and: [{ active: true }, { role: "admin" }] },
            expected: true,
        },
        {
            description: "$and — one clause fails",
            input: { active: true, role: "user" },
            query: { $and: [{ active: true }, { role: "admin" }] },
            expected: false,
        },
        {
            description: "$or — one clause matches",
            input: { role: "editor" },
            query: { $or: [{ role: "admin" }, { role: "editor" }] },
            expected: true,
        },
        {
            description: "$or — no clause matches",
            input: { role: "guest" },
            query: { $or: [{ role: "admin" }, { role: "editor" }] },
            expected: false,
        },
        {
            description: "$nor — no clause matches (passes)",
            input: { role: "guest" },
            query: { $nor: [{ role: "admin" }, { role: "editor" }] },
            expected: true,
        },
        {
            description: "$nor — one clause matches (fails)",
            input: { role: "admin" },
            query: { $nor: [{ role: "admin" }, { role: "editor" }] },
            expected: false,
        },
        {
            description: "$not — inner query does not match (passes)",
            input: { active: false },
            query: { $not: { active: true } },
            expected: true,
        },
        {
            description: "$not — inner query matches (fails)",
            input: { active: true },
            query: { $not: { active: true } },
            expected: false,
        },
        {
            description: "nested object — exact field match",
            input: { address: { city: "London", zip: "W1A" } },
            query: { address: { city: "London" } },
            expected: true,
        },
        {
            description: "nested object — field condition",
            input: { address: { city: "London", zip: "W1A" } },
            query: { address: { city: { $startsWith: "Lon" } } },
            expected: true,
        },
        {
            description: "nested object — field condition no match",
            input: { address: { city: "Manchester", zip: "M1" } },
            query: { address: { city: { $startsWith: "Lon" } } },
            expected: false,
        },
        {
            description: "complex: $and with string and boolean",
            input: { "my boolean input": true, "my select input": "yo mate" },
            query: {
                $and: [
                    { "my boolean input": true },
                    { "my select input": { $contains: "yo" } },
                ],
            },
            expected: true,
        },
        {
            description: "complex: nested $or inside $and",
            input: { active: true, role: "editor", score: 80 },
            query: {
                $and: [
                    { active: true },
                    { $or: [{ role: "admin" }, { role: "editor" }] },
                    { score: { $gte: 50 } },
                ],
            },
            expected: true,
        },
        {
            description: "complex: nested $or inside $and — fails on score",
            input: { active: true, role: "editor", score: 30 },
            query: {
                $and: [
                    { active: true },
                    { $or: [{ role: "admin" }, { role: "editor" }] },
                    { score: { $gte: 50 } },
                ],
            },
            expected: false,
        },
    ];

    for (const { input, query, expected, description } of testCases) {
        it(description, function() {
            const actual = matchesQuery(input, query as Query<typeof input>);
            assert.strictEqual(actual, expected);
        })
    }
})

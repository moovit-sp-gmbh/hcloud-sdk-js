import assert from "node:assert";
import { describe, it } from "node:test";
import { matchesQuery, Query } from "../src/lib/interfaces/high5/wave/dependentInputs";
import { ValidationResult, validateQuery } from "../src/lib/interfaces/high5/wave/dependentInputsValidation";

describe("dependent node inputs", function() {
    describe("check", function() {
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
    describe("validation", function() {
        const valid = { valid: true } satisfies ValidationResult;
        const invalid = (...errors: { path: string; message: string }[]): ValidationResult => ({
            valid: false,
            errors,
        });

        const validateTestCases = [

            // ---------------------------------------------------------------------------
            // Valid queries
            // ---------------------------------------------------------------------------
            {
                description: "empty query — always matches everything",
                query: {},
                expected: valid,
            },
            {
                description: "shorthand equality on a string field",
                query: { role: "admin" },
                expected: valid,
            },
            {
                description: "shorthand equality on a boolean field",
                query: { active: true },
                expected: valid,
            },
            {
                description: "shorthand equality on a number field",
                query: { age: 30 },
                expected: valid,
            },
            {
                description: "shorthand equality on a null field",
                query: { deleted: null },
                expected: valid,
            },
            {
                description: "$eq operator with a string",
                query: { role: { $eq: "admin" } },
                expected: valid,
            },
            {
                description: "$ne with a number",
                query: { score: { $ne: 0 } },
                expected: valid,
            },
            {
                description: "$gt / $lte range on a number field",
                query: { age: { $gt: 18, $lte: 65 } },
                expected: valid,
            },
            {
                description: "$contains on a string field",
                query: { label: { $contains: "yo" } },
                expected: valid,
            },
            {
                description: "$startsWith on a string field",
                query: { name: { $startsWith: "Lon" } },
                expected: valid,
            },
            {
                description: "$endsWith on a string field",
                query: { filename: { $endsWith: ".pdf" } },
                expected: valid,
            },
            {
                description: "$regex with a valid pattern",
                query: { email: { $regex: "^[\\w.]+@[\\w.]+\\.[a-z]{2,}$" } },
                expected: valid,
            },
            {
                description: "$in with a non-empty array of strings",
                query: { role: { $in: ["admin", "editor"] } },
                expected: valid,
            },
            {
                description: "$nin with a non-empty array of numbers",
                query: { score: { $nin: [0, -1] } },
                expected: valid,
            },
            {
                description: "$exists: true",
                query: { nickname: { $exists: true } },
                expected: valid,
            },
            {
                description: "$exists: false",
                query: { nickname: { $exists: false } },
                expected: valid,
            },
            {
                description: "$type: string",
                query: { code: { $type: "string" } },
                expected: valid,
            },
            {
                description: "$type: number",
                query: { code: { $type: "number" } },
                expected: valid,
            },
            {
                description: "$and with two field conditions",
                query: { $and: [{ active: true }, { role: "admin" }] },
                expected: valid,
            },
            {
                description: "$or with two field conditions",
                query: { $or: [{ role: "admin" }, { role: "editor" }] },
                expected: valid,
            },
            {
                description: "$nor with two field conditions",
                query: { $nor: [{ status: "banned" }, { status: "suspended" }] },
                expected: valid,
            },
            {
                description: "$not with a single field condition",
                query: { $not: { active: false } },
                expected: valid,
            },
            {
                description: "nested $or inside $and",
                query: {
                    $and: [
                        { active: true },
                        { $or: [{ role: "admin" }, { role: "editor" }] },
                    ],
                },
                expected: valid,
            },
            {
                description: "nested object sub-query",
                query: { address: { city: { $startsWith: "Lon" } } },
                expected: valid,
            },
            {
                description: "multiple operators on the same field",
                query: { age: { $gte: 18, $lt: 65 } },
                expected: valid,
            },

            // ---------------------------------------------------------------------------
            // Invalid — query root
            // ---------------------------------------------------------------------------
            {
                description: "query is null",
                query: null,
                expected: invalid({ path: "$", message: "Query node must be a plain object, got null" }),
            },
            {
                description: "query is an array",
                query: [{ role: "admin" }],
                expected: invalid({ path: "$", message: "Query node must be a plain object, got array" }),
            },
            {
                description: "query is a string",
                query: "admin",
                expected: invalid({ path: "$", message: "Query node must be a plain object, got string" }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — unknown operators
            // ---------------------------------------------------------------------------
            {
                description: "unknown top-level operator",
                query: { $where: "this.age > 18" },
                expected: invalid({ path: "$.$where", message: 'Unknown operator "$where"' }),
            },
            {
                description: "unknown field operator",
                query: { age: { $between: [18, 65] } },
                expected: invalid({ path: "$.age.$between", message: 'Unknown field operator "$between"' }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — logical operators
            // ---------------------------------------------------------------------------
            {
                description: "$and is not an array",
                query: { $and: { role: "admin" } },
                expected: invalid({ path: "$.$and", message: '"$and" must be an array, got object' }),
            },
            {
                description: "$and is an empty array",
                query: { $and: [] },
                expected: invalid({ path: "$.$and", message: '"$and" array must not be empty' }),
            },
            {
                description: "$or is a string",
                query: { $or: "admin" },
                expected: invalid({ path: "$.$or", message: '"$or" must be an array, got string' }),
            },
            {
                description: "$nor is an empty array",
                query: { $nor: [] },
                expected: invalid({ path: "$.$nor", message: '"$nor" array must not be empty' }),
            },
            {
                description: "$not is an array instead of an object",
                query: { $not: [{ active: true }] },
                expected: invalid({ path: "$.$not", message: '"$not" must be a query object, got array' }),
            },
            {
                description: "$not is a primitive",
                query: { $not: true },
                expected: invalid({ path: "$.$not", message: '"$not" must be a query object, got boolean' }),
            },
            {
                description: "$and contains an invalid sub-query (array instead of object)",
                query: { $and: [[], { role: "admin" }] },
                expected: invalid({ path: "$.$and[0]", message: "Query node must be a plain object, got array" }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — comparison operator operands
            // ---------------------------------------------------------------------------
            {
                description: "$eq operand is an array",
                query: { role: { $eq: ["admin"] } },
                expected: invalid({ path: "$.role.$eq", message: '"$eq" operand must be a primitive, got array' }),
            },
            {
                description: "$gt operand is an object",
                query: { age: { $gt: { value: 18 } } },
                expected: invalid({ path: "$.age.$gt", message: '"$gt" operand must be a primitive, got object' }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — string operator operands
            // ---------------------------------------------------------------------------
            {
                description: "$contains operand is a number",
                query: { label: { $contains: 42 } },
                expected: invalid({ path: "$.label.$contains", message: '"$contains" operand must be a string, got number' }),
            },
            {
                description: "$startsWith operand is null",
                query: { name: { $startsWith: null } },
                expected: invalid({ path: "$.name.$startsWith", message: '"$startsWith" operand must be a string, got null' }),
            },
            {
                description: "$regex operand is not a string",
                query: { email: { $regex: 123 } },
                expected: invalid({ path: "$.email.$regex", message: '"$regex" operand must be a string, got number' }),
            },
            {
                description: "$regex operand is an invalid regular expression",
                query: { email: { $regex: "[invalid" } },
                expected: invalid({ path: "$.email.$regex", message: '"$regex" operand is not a valid regular expression' }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — array operator operands
            // ---------------------------------------------------------------------------
            {
                description: "$in operand is not an array",
                query: { role: { $in: "admin" } },
                expected: invalid({ path: "$.role.$in", message: '"$in" operand must be an array, got string' }),
            },
            {
                description: "$in operand is an empty array",
                query: { role: { $in: [] } },
                expected: invalid({ path: "$.role.$in", message: '"$in" operand array must not be empty' }),
            },
            {
                description: "$nin contains a non-primitive element",
                query: { role: { $nin: ["admin", { nested: true }] } },
                expected: invalid({ path: "$.role.$nin[1]", message: '"$nin" array elements must be primitives, got object' }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — meta operator operands
            // ---------------------------------------------------------------------------
            {
                description: "$exists operand is a string instead of boolean",
                query: { nickname: { $exists: "yes" } },
                expected: invalid({ path: "$.nickname.$exists", message: '"$exists" operand must be a boolean, got string' }),
            },
            {
                description: "$type operand is an unrecognised type string",
                query: { code: { $type: "nope" } },
                expected: invalid({
                    path: "$.code.$type",
                    message: '"$type" operand must be one of: "string", "number", "boolean", "object", got string',
                }),
            },
            {
                description: "$type operand is a number instead of a string",
                query: { code: { $type: 42 } },
                expected: invalid({
                    path: "$.code.$type",
                    message: '"$type" operand must be one of: "string", "number", "boolean", "object", got number',
                }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — mixed operator and plain keys
            // ---------------------------------------------------------------------------
            {
                description: "field condition mixes operator keys and plain field keys",
                query: { age: { $gt: 18, years: 30 } },
                expected: invalid({
                    path: "$.age",
                    message: "Field condition must not mix operator keys and plain field keys",
                }),
            },

            // ---------------------------------------------------------------------------
            // Invalid — multiple errors in one query
            // ---------------------------------------------------------------------------
            {
                description: "multiple errors: empty $and and bad $type operand",
                query: {
                    $and: [],
                    score: { $type: "nope" },
                },
                expected: invalid(
                    { path: "$.$and", message: '"$and" array must not be empty' },
                    {
                        path: "$.score.$type",
                        message: '"$type" operand must be one of: "string", "number", "boolean", "object", got string',
                    },
                ),
            },
        ];

        for (const { query, expected, description } of validateTestCases) {
            it(description, function() {
                const actual = validateQuery(query);
                assert.deepStrictEqual(actual, expected);
            })
        }

    })
})

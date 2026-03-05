/* eslint-disable complexity */
import type { Primitive } from "./dependentInputs";

// ---------------------------------------------------------------------------
// Validation result types
// ---------------------------------------------------------------------------

export type ValidationSuccess = {
    valid: true;
};

export type ValidationError = {
    valid: false;
    errors: QueryValidationError[];
};

export type ValidationResult = ValidationSuccess | ValidationError;

export type QueryValidationError = {
    /** JSONPath-style location of the offending node, e.g. "$and[0].age" */
    path: string;
    message: string;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LOGICAL_OPERATORS = new Set(["$and", "$or", "$nor", "$not"]);
const FIELD_OPERATORS = new Set([
    "$eq",
    "$ne",
    "$gt",
    "$gte",
    "$lt",
    "$lte",
    "$contains",
    "$startsWith",
    "$endsWith",
    "$regex",
    "$in",
    "$nin",
    "$exists",
    "$type",
]);
const VALID_TYPES = new Set(["string", "number", "boolean", "object"]);
const PRIMITIVE_JS_TYPES = new Set(["string", "number", "boolean"]);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Validates the structure of a query object against the query schema.
 * Returns a discriminated union: { valid: true } or { valid: false, errors[] }.
 *
 * Does NOT validate field names against a specific InputObject — it only
 * checks that the query itself is structurally sound (correct operator
 * positions, correct operand types, no unknown operators, etc.).
 */
export function validateQuery(query: unknown): ValidationResult {
    const errors: QueryValidationError[] = [];
    validateNode(query, "$", errors);
    return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

// ---------------------------------------------------------------------------
// Internal recursive validator
// ---------------------------------------------------------------------------

function validateNode(node: unknown, path: string, errors: QueryValidationError[]): void {
    if (node === null || typeof node !== "object" || Array.isArray(node)) {
        errors.push({ path, message: `Query node must be a plain object, got ${formatType(node)}` });
        return;
    }

    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
        const childPath = `${path}.${key}`;

        if (LOGICAL_OPERATORS.has(key)) {
            validateLogicalOperator(key, value, childPath, errors);
        } else if (key.startsWith("$")) {
            errors.push({ path: childPath, message: `Unknown operator "${key}"` });
        } else {
            // Field key — value is either a primitive, an array, a condition object,
            // or a nested sub-query object.
            validateFieldValue(value, childPath, errors);
        }
    }
}

function validateLogicalOperator(op: string, value: unknown, path: string, errors: QueryValidationError[]): void {
    if (op === "$not") {
        // $not takes a single sub-query object
        if (value === null || typeof value !== "object" || Array.isArray(value)) {
            errors.push({ path, message: `"$not" must be a query object, got ${formatType(value)}` });
            return;
        }
        validateNode(value, path, errors);
        return;
    }

    // $and / $or / $nor take a non-empty array of sub-query objects
    if (!Array.isArray(value)) {
        errors.push({ path, message: `"${op}" must be an array, got ${formatType(value)}` });
        return;
    }
    if (value.length === 0) {
        errors.push({ path, message: `"${op}" array must not be empty` });
        return;
    }
    for (let i = 0; i < value.length; i++) {
        validateNode(value[i], `${path}[${i}]`, errors);
    }
}

function validateFieldValue(value: unknown, path: string, errors: QueryValidationError[]): void {
    // Plain primitive — shorthand equality
    if (isPrimitive(value)) return;

    // Array — must be an array of primitives (shorthand $in-style direct value)
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (!isPrimitive(value[i])) {
                errors.push({
                    path: `${path}[${i}]`,
                    message: `Array field values must be primitives, got ${formatType(value[i])}`,
                });
            }
        }
        return;
    }

    if (value === null || typeof value !== "object") {
        errors.push({ path, message: `Field value must be a primitive, array, or object, got ${formatType(value)}` });
        return;
    }

    const keys = Object.keys(value as object);
    const hasOperatorKeys = keys.some(k => k.startsWith("$"));
    const hasFieldKeys = keys.some(k => !k.startsWith("$"));

    if (hasOperatorKeys && hasFieldKeys) {
        errors.push({ path, message: "Field condition must not mix operator keys and plain field keys" });
        return;
    }

    if (hasOperatorKeys) {
        // Treat as a FieldCondition object
        validateFieldCondition(value as Record<string, unknown>, path, errors);
    } else {
        // Treat as a nested sub-query object
        validateNode(value, path, errors);
    }
}

function validateFieldCondition(condition: Record<string, unknown>, path: string, errors: QueryValidationError[]): void {
    for (const [op, operand] of Object.entries(condition)) {
        const opPath = `${path}.${op}`;

        if (!FIELD_OPERATORS.has(op)) {
            errors.push({ path: opPath, message: `Unknown field operator "${op}"` });
            continue;
        }

        switch (op) {
            // Operand must be a primitive
            case "$eq":
            case "$ne":
            case "$gt":
            case "$gte":
            case "$lt":
            case "$lte":
                if (!isPrimitive(operand)) {
                    errors.push({ path: opPath, message: `"${op}" operand must be a primitive, got ${formatType(operand)}` });
                }
                break;

            // Operand must be a string
            case "$contains":
            case "$startsWith":
            case "$endsWith":
            case "$regex":
                if (typeof operand !== "string") {
                    errors.push({ path: opPath, message: `"${op}" operand must be a string, got ${formatType(operand)}` });
                }
                // Extra: validate that $regex is a valid regular expression
                if (op === "$regex") {
                    try {
                        new RegExp(operand as string);
                    } catch {
                        errors.push({ path: opPath, message: `"$regex" operand is not a valid regular expression` });
                    }
                }
                break;

            // Operand must be a non-empty array of primitives
            case "$in":
            case "$nin":
                if (!Array.isArray(operand)) {
                    errors.push({ path: opPath, message: `"${op}" operand must be an array, got ${formatType(operand)}` });
                } else {
                    if (operand.length === 0) {
                        errors.push({ path: opPath, message: `"${op}" operand array must not be empty` });
                    }
                    for (let i = 0; i < operand.length; i++) {
                        if (!isPrimitive(operand[i])) {
                            errors.push({
                                path: `${opPath}[${i}]`,
                                message: `"${op}" array elements must be primitives, got ${formatType(operand[i])}`,
                            });
                        }
                    }
                }
                break;

            // Operand must be a boolean
            case "$exists":
                if (typeof operand !== "boolean") {
                    errors.push({ path: opPath, message: `"$exists" operand must be a boolean, got ${formatType(operand)}` });
                }
                break;

            // Operand must be one of the valid type strings
            case "$type":
                if (typeof operand !== "string" || !VALID_TYPES.has(operand)) {
                    errors.push({
                        path: opPath,
                        message: `"$type" operand must be one of: ${[...VALID_TYPES].map(t => `"${t}"`).join(", ")}, got ${formatType(operand)}`,
                    });
                }
                break;
            default:
                errors.push({ path: opPath, message: `Unknown field operator "${op}"` });
                break;
        }
    }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isPrimitive(value: unknown): value is Primitive {
    if (value === null) return true;
    if (value instanceof Date) return true;
    return PRIMITIVE_JS_TYPES.has(typeof value);
}

function formatType(value: unknown): string {
    if (value === null) return "null";
    if (value instanceof Date) return "Date";
    if (Array.isArray(value)) return "array";
    return typeof value;
}

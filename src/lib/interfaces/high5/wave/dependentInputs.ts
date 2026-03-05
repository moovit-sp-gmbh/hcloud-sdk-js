/* eslint-disable complexity */
// ---------------------------------------------------------------------------
// Primitive & input types
// ---------------------------------------------------------------------------

type Primitive = string | number | boolean | null | Date | undefined;

type InputObject = Record<string, Primitive | Primitive[] | Record<string, Primitive>>;

// ---------------------------------------------------------------------------
// Field-level condition operators
// ---------------------------------------------------------------------------

type ComparisonCondition<T extends Primitive> = {
    $eq?: T;
    $ne?: T;
    $gt?: T;
    $gte?: T;
    $lt?: T;
    $lte?: T;
};

type StringCondition = {
    $contains?: string;
    $startsWith?: string;
    $endsWith?: string;
    $regex?: string;
};

type ArrayCondition<T extends Primitive> = {
    $in?: T[];
    $nin?: T[];
};

type MetaCondition = {
    $exists?: boolean;
    $type?: "string" | "number" | "boolean" | "object";
};

type FieldCondition<T extends Primitive = Primitive> = ComparisonCondition<T> & StringCondition & ArrayCondition<T> & MetaCondition;

// ---------------------------------------------------------------------------
// Query operators
// ---------------------------------------------------------------------------

type FieldQuery<T extends InputObject> = {
    [K in keyof T]?: T[K] extends Primitive
        ? T[K] | FieldCondition<T[K]>
        : T[K] extends Primitive[]
          ? T[K] | ArrayCondition<T[K][number]>
          : T[K] extends Record<string, Primitive>
            ? NestedFieldQuery<T[K]> | Query<T[K]>
            : never;
};

/** Allows dot-notation-style conditions on nested object fields */
type NestedFieldQuery<T extends Record<string, Primitive>> = {
    [K in keyof T]?: T[K] | FieldCondition<T[K]>;
};

type LogicalQuery<T extends InputObject> = {
    $and?: Query<T>[];
    $or?: Query<T>[];
    $nor?: Query<T>[];
    $not?: Query<T>;
};

type Query<T extends InputObject = InputObject> = FieldQuery<T> & LogicalQuery<T>;

// ---------------------------------------------------------------------------
// Engine implementation
// ---------------------------------------------------------------------------

function matchesQuery<T extends InputObject>(input: T, query: Query<T>): boolean {
    for (const key of Object.keys(query) as (keyof Query<T>)[]) {
        if (key === "$and") {
            const clauses = query.$and!;
            if (!clauses.every(subQuery => matchesQuery(input, subQuery))) return false;
            continue;
        }
        if (key === "$or") {
            const clauses = query.$or!;
            if (!clauses.some(subQuery => matchesQuery(input, subQuery))) return false;
            continue;
        }
        if (key === "$nor") {
            const clauses = query.$nor!;
            if (clauses.some(subQuery => matchesQuery(input, subQuery))) return false;
            continue;
        }
        if (key === "$not") {
            if (matchesQuery(input, query.$not!)) return false;
            continue;
        }

        // Field-level check
        const fieldKey = key as keyof T;
        const fieldValue = input[fieldKey];
        const condition = query[fieldKey] as Primitive | FieldCondition | Record<string, unknown> | undefined;

        if (condition === undefined) continue;

        // Nested object: recurse into it as a sub-query
        if (
            fieldValue !== null &&
            typeof fieldValue === "object" &&
            !Array.isArray(fieldValue) &&
            !(fieldValue instanceof Date) &&
            !isFieldCondition(condition)
        ) {
            if (!matchesQuery(fieldValue as InputObject, condition as Query)) return false;
        } else if (isFieldCondition(condition)) {
            if (!matchesCondition(fieldValue as Primitive, condition)) return false;
        } else {
            if (!isEqual(fieldValue, condition)) return false;
        }
    }

    return true;
}

function matchesCondition(value: Primitive, condition: FieldCondition): boolean {
    // Comparison
    if ("$eq" in condition && !isEqual(value, condition.$eq!)) return false;
    if ("$ne" in condition && isEqual(value, condition.$ne!)) return false;
    if (value === null || value === undefined) {
        return false;
    }
    if ("$gt" in condition && !(value > condition.$gt!)) return false;
    if ("$gte" in condition && !(value >= condition.$gte!)) return false;
    if ("$lt" in condition && !(value < condition.$lt!)) return false;
    if ("$lte" in condition && !(value <= condition.$lte!)) return false;

    // String
    if ("$contains" in condition) {
        if (typeof value !== "string" || !value.includes(condition.$contains!)) return false;
    }
    if ("$startsWith" in condition) {
        if (typeof value !== "string" || !value.startsWith(condition.$startsWith!)) return false;
    }
    if ("$endsWith" in condition) {
        if (typeof value !== "string" || !value.endsWith(condition.$endsWith!)) return false;
    }
    if ("$regex" in condition) {
        if (typeof value !== "string" || !new RegExp(condition.$regex!).test(value)) return false;
    }

    // Array membership
    if ("$in" in condition && !condition.$in!.some(o => isEqual(value, o))) return false;
    if ("$nin" in condition && condition.$nin!.some(o => isEqual(value, o))) return false;

    // Meta
    if ("$exists" in condition) {
        const exists = value !== undefined && value !== null;
        if (condition.$exists !== exists) return false;
    }
    if ("$type" in condition && typeof value !== condition.$type!) return false;

    return true;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isFieldCondition(value: unknown): value is FieldCondition {
    if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
    const operators = [
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
    ];
    return Object.keys(value).some(k => operators.includes(k));
}

function isEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((v, i) => isEqual(v, b[i]));
    }
    return false;
}

export type { Primitive, InputObject, FieldCondition, Query };
export { matchesQuery };

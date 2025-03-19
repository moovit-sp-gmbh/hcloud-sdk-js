enum Entity {
    USER_NAME = "USER_NAME",
    ORGANIZATION_NAME = "ORGANIZATION_NAME",
    USER_ORGANIZATION_NAME = "USER_ORGANIZATION_NAME",
    TEAM_NAME = "TEAM_NAME",
    COMPANY_NAME = "COMPANY_NAME",
    PAT_NAME = "PAT_NAME",
    JOIN_TOKEN_NAME = "JOIN_TOKEN_NAME",
    SPACE_NAME = "SPACE_NAME",
    EVENT_NAME = "EVENT_NAME",
    STREAM_NAME = "STREAM_NAME",
    DESIGN_NAME = "DESIGN_NAME",
    SNAPSHOT_NAME = "SNAPSHOT_NAME",
    WEBHOOK_NAME = "WEBHOOK_NAME",
    SECRET_KEY = "SECRET_KEY",
    SECRET_VALUE = "SECRET_VALUE",
    POOL_NAME = "POOL_NAME",
    FUSE_JOB = "FUSE_JOB",
    WAVE_ENGINE_RELEASE = "WAVE_ENGINE_RELEASE",
    CHALLENGE_STRING = "CHALLENGE_STRING",
    DATABASE_NAME = "DATABASE_NAME",
    DOCUMENT_KEY = "DOCUMENT_KEY",
}

interface Details {
    pattern: RegExp;
    symbols?: RegExp; // Allowed symbols, Normally they are determined automatically by 'pattern' but can be set manually in some cases
    minLength: number;
    maxLength: number;
}

class EntityDetails {
    private entity: Details;

    constructor(name: Entity) {
        this.entity = entityCollection[name];
    }

    get pattern(): RegExp {
        return this.entity.pattern;
    }

    get minLength(): number {
        return this.entity.minLength;
    }

    get maxLength(): number {
        return this.entity.maxLength;
    }

    /**
     * Checks whether the specified value can be used as name of the Current Entity,
     * the length of the string is additionally checking because these details may not be specified in the regular expression.
     * @param value - Some string to validate
     * @returns Validation result
     */
    validate(value: string): boolean {
        return (
            typeof value === "string" &&
            value.length >= this.entity.minLength &&
            value.length <= this.entity.maxLength &&
            this.entity.pattern.test(value)
        );
    }

    /**
     * This function cleans the given string from disallowed characters, removes extra dashes, dots, and spaces at the beginning and end of the string.
     * The list of allowed characters is determined automatically based on the given regular expression for name validation (property "pattern"),
     * but for special cases, it can be set manually in the property "symbols" in the entity name definition.
     * @param value - Incoming string to sanitize
     * @returns Sanitized string
     */
    sanitize(value: string): string {
        if (typeof value !== "string") return "";
        if (!this.validate(value)) {
            if (!this.entity.symbols) {
                const matches = this.entity.pattern.toString().match(/\[([^\]]+)\]/);
                this.entity.symbols = new RegExp(matches ? `[${matches[1]}]` : /./i);
            }
            value = value
                .split("")
                .filter(char => this.entity.symbols!.test(char))
                .join("")
                .replace(/^[\s-.]+|[\s-.]+$/g, "")
                .replace(/-{2,}/g, "-");
            if (value.length < this.entity.minLength) value = value.concat("x".repeat(this.entity.minLength - value.length));
            return value.slice(0, this.entity.maxLength);
        }
        return value;
    }
}

function ValidationHelper(name: Entity): EntityDetails {
    return new EntityDetails(name);
}

const entityCollection: Record<Entity, Details> = {
    [Entity.USER_NAME]: {
        // Case-insensitive. Must contain at least 3 character. Allows letters, numbers, underscores, hyphens, dots, and spaces. Cannot start with a dash, end with a dash, or contain double dashes
        pattern: /^(?!-)(?!.*--)[\w-. ]{3,255}(?<!-)$/i,
        minLength: 3,
        maxLength: 255,
    },
    [Entity.ORGANIZATION_NAME]: {
        // Case-insensitive. No spaces or other special characters allowed. Cannot start with a dash, end with a dash, or contain double dashes
        pattern: /^(?!-)(?!.*--)[a-zA-Z0-9-.]{3,64}(?<!-)$/i,
        minLength: 3,
        maxLength: 64,
    },
    [Entity.USER_ORGANIZATION_NAME]: {
        pattern: /^[\w-+@.]{3,255}$/i,
        minLength: 3,
        maxLength: 255,
    },
    [Entity.TEAM_NAME]: {
        // Case-insensitive. No spaces or additional special characters allowed. Cannot start with a dash, end with a dash, or contain double dashes
        pattern: /^(?!-)(?!.*--)[a-zA-Z0-9-.]{3,64}(?<!-)$/i,
        minLength: 3,
        maxLength: 64,
    },
    [Entity.COMPANY_NAME]: {
        pattern: /^[\w-. ]{1,255}$/i,
        minLength: 1,
        maxLength: 255,
    },
    [Entity.PAT_NAME]: {
        pattern: /^[\w-. ]{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
    [Entity.JOIN_TOKEN_NAME]: {
        pattern: /^[\w-.]{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
    [Entity.SPACE_NAME]: {
        pattern: /^[a-zA-Z0-9-.]{1,32}$/i,
        minLength: 1,
        maxLength: 32,
    },
    [Entity.EVENT_NAME]: {
        pattern: /^[\w-.]{1,128}$/i,
        minLength: 1,
        maxLength: 128,
    },
    [Entity.STREAM_NAME]: {
        pattern: /^(?![.\s]+)[\w-. ]{1,128}(?<![.\s]+)$/i,
        symbols: /[\w-. ]/i,
        minLength: 1,
        maxLength: 128,
    },
    [Entity.DESIGN_NAME]: {
        pattern: /^[a-zA-Z-_]{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
    [Entity.SNAPSHOT_NAME]: {
        pattern: /^[\w-. ]{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
    [Entity.WEBHOOK_NAME]: {
        pattern: /^[\w-. ]{1,128}$/i,
        minLength: 1,
        maxLength: 128,
    },
    [Entity.SECRET_KEY]: {
        pattern: /^[\w-.]{1,32}$/i,
        minLength: 1,
        maxLength: 32,
    },
    [Entity.SECRET_VALUE]: {
        pattern: /^.{1,1024}$/i,
        minLength: 1,
        maxLength: 1024,
    },
    [Entity.POOL_NAME]: {
        pattern: /^[\w-.]{1,128}$/i,
        minLength: 1,
        maxLength: 128,
    },
    [Entity.FUSE_JOB]: {
        pattern: /^.{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
    [Entity.WAVE_ENGINE_RELEASE]: {
        pattern: /^\d+\.\d+\.\d+(-dev-\d+)?$/i,
        symbols: /[dev0-9-.]/i,
        minLength: 1,
        maxLength: 128,
    },
    [Entity.CHALLENGE_STRING]: {
        pattern: /^[\w-]{1,128}$/i,
        minLength: 1,
        maxLength: 128,
    },
    [Entity.DATABASE_NAME]: {
        pattern: /^[\w-.]{1,128}$/i,
        minLength: 1,
        maxLength: 128,
    },
    [Entity.DOCUMENT_KEY]: {
        pattern: /^[\w-.]{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
};

export { Entity, EntityDetails, ValidationHelper };

enum Entity {
    USER_NAME = "USER_NAME",
    USER_PASSWORD = "USER_PASSWORD",
    OAUTH_SECRET_NAME = "OAUTH_SECRET_NAME",
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
    WAVE_ENGINE_RELEASE = "WAVE_ENGINE_RELEASE",
    CHALLENGE_STRING = "CHALLENGE_STRING",
    DATABASE_NAME = "DATABASE_NAME",
    DATABASE_API_KEY = "DATABASE_API_KEY",
    DOCUMENT_KEY = "DOCUMENT_KEY",
    DOMAIN_NAME = "DOMAIN_NAME",
    USER_ID = "USER_ID",
    INVITATION_ID = "INVITATION_ID",
    OAUTH_APP_ID = "OAUTH_APP_ID",
    PAT_ID = "PAT_ID",
    STREAM_ID = "STREAM_ID",
    EXECUTION_SECRET = "EXECUTION_SECRET",
    HIGH5_EXECUTION_ID = "HIGH5_EXECUTION_ID",
    STREAM_LOG_ID = "STREAM_LOG_ID",
    STREAM_STATUS_ID = "STREAM_STATUS_ID",
    JOIN_TOKEN_ID = "JOIN_TOKEN_ID",
    NODE_ID = "NODE_ID",
    SNAPSHOT_ID = "SNAPSHOT_ID",
    CATALOG_ID = "CATALOG_ID",
    WEBHOOK_ID = "WEBHOOK_ID",
    WEBHOOK_TOKEN = "WEBHOOK_TOKEN",
    JOB = "JOB",
    JOB_ID = "JOB_ID",
    JOB_LOG_ID = "JOB_LOG_ID",
    NAMESPACE_NAME = "NAMESPACE_NAME",
    MESSAGE_ID = "MESSAGE_ID",
    ARRAY_INDEX = "ARRAY_INDEX",
    URL_SLUG = "URL_SLUG",
    LONG_URL_SLUG = "LONG_URL_SLUG",
    TAG_NAME = "TAG_NAME",
    TAG_COLOR = "TAG_COLOR",
    MODULE_NAME = "MODULE_NAME",
    LOG_COLLECTOR_NAME = "LOG_COLLECTOR_NAME",
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
    [Entity.USER_PASSWORD]: {
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,255}$/i,
        minLength: 8,
        maxLength: 255,
    },
    [Entity.OAUTH_SECRET_NAME]: {
        pattern: /^[\w\-.]{1,255}$/i,
        minLength: 1,
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
        pattern: /^[\w-.]{1,32}$/i,
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
    [Entity.DATABASE_API_KEY]: {
        pattern: /^[\w-]{3,64}$/i,
        minLength: 3,
        maxLength: 64,
    },
    [Entity.DOCUMENT_KEY]: {
        pattern: /^[\w-.]{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
    [Entity.DOMAIN_NAME]: {
        pattern: /^(?=.{1,254}$)(?=(^.{1,63}\.|^.{1,63}\.)*)(^([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$)$/i,
        minLength: 4,
        maxLength: 254,
    },
    [Entity.USER_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.INVITATION_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.OAUTH_APP_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.PAT_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.STREAM_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.EXECUTION_SECRET]: {
        pattern: /^[\w-]{3,1024}$/i,
        minLength: 3,
        maxLength: 1024,
    },
    [Entity.HIGH5_EXECUTION_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.STREAM_LOG_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.STREAM_STATUS_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.JOIN_TOKEN_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.NODE_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.SNAPSHOT_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.CATALOG_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.WEBHOOK_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.WEBHOOK_TOKEN]: {
        pattern: /^[a-fA-F0-9]{128}$/i,
        minLength: 128,
        maxLength: 128,
    },
    [Entity.JOB]: {
        pattern: /^.{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
    [Entity.JOB_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.JOB_LOG_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.NAMESPACE_NAME]: {
        // Case-insensitive. No spaces or other special characters allowed. Cannot start with a dash, end with a dash, or contain double dashes
        pattern: /^(?!-)(?!.*--)[a-zA-Z0-9-.]{3,64}(?<!-)$/i,
        minLength: 3,
        maxLength: 64,
    },
    [Entity.MESSAGE_ID]: {
        pattern: /^[a-fA-F0-9]{24}$/i,
        minLength: 24,
        maxLength: 24,
    },
    [Entity.ARRAY_INDEX]: {
        pattern: /^\d{1,24}$/i,
        minLength: 1,
        maxLength: 24,
    },
    [Entity.URL_SLUG]: {
        pattern: /^[A-NP-Za-km-z1-9]{6}$/i,
        minLength: 6,
        maxLength: 6,
    },
    [Entity.LONG_URL_SLUG]: {
        pattern: /^[A-NP-Za-km-z1-9]{34}$/i,
        minLength: 34,
        maxLength: 34,
    },
    [Entity.TAG_NAME]: {
        pattern: /^[a-zA-Z0-9 ]{1,20}$/i,
        minLength: 1,
        maxLength: 20,
    },
    [Entity.TAG_COLOR]: {
        pattern: /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/i,
        minLength: 7,
        maxLength: 7,
    },
    [Entity.MODULE_NAME]: {
        pattern: /^[\w-.]{3,64}$/i,
        minLength: 3,
        maxLength: 64,
    },
    [Entity.LOG_COLLECTOR_NAME]: {
        pattern: /^[\w-.]{1,64}$/i,
        minLength: 1,
        maxLength: 64,
    },
};

export { Entity, EntityDetails, ValidationHelper };

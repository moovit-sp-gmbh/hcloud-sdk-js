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
}

interface Details {
    name: string; // Name of the path parameter
    description: string;
    allowedCharacters?: string;
    pattern: RegExp;
    showRegexp: boolean; // Determines whether to display the regexp pattern in the OpenAPI documentation
    minLength: number;
    maxLength: number;
    example: string;
    errorMessage?: string;
}

class EntityDetails {
    private entity: Details;

    constructor(name: Entity) {
        this.entity = entityCollection[name];
    }

    get name(): string {
        return this.entity.name;
    }

    get description(): string {
        const rules: string[] = this.entity.allowedCharacters ? [`only ${this.entity.allowedCharacters} are allowed`] : [];
        rules.push(`it should contain between ${this.entity.minLength} and ${this.entity.maxLength} characters`);
        return `${this.entity.description} (${rules.join("; ")})`;
    }

    get pattern(): RegExp {
        return this.entity.pattern;
    }

    get showRegexp(): boolean {
        return this.entity.showRegexp;
    }

    get minLength(): number {
        return this.entity.minLength;
    }

    get maxLength(): number {
        return this.entity.maxLength;
    }

    get example(): string {
        return this.entity.example;
    }

    get errorMessage(): string {
        const rules: string[] = this.entity.errorMessage ? [this.entity.errorMessage] : [];
        if (this.entity.allowedCharacters) rules.push(`allowed only ${this.entity.allowedCharacters}`);
        rules.push(`length should be between ${this.entity.minLength} and ${this.entity.maxLength}`);
        rules.push(`pattern: ${this.entity.pattern.toString()}.`);
        return `Invalid '${this.entity.name}' - ${rules.join(", ")}`;
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
}

function ValidationHelper(name: Entity): EntityDetails {
    return new EntityDetails(name);
}

const entityCollection: Record<Entity, Details> = {
    [Entity.USER_NAME]: {
        name: "name",
        description: "Name of the user",
        allowedCharacters: "alphanumeric characters, underscores, hyphens, dots and spaces",
        // Case-insensitive. Must contain at least 3 character. Allows letters, numbers, underscores, hyphens, dots, and spaces. Cannot start with a dash, end with a dash, or contain double dashes
        pattern: /^(?!-)(?!.*--)[\w-. ]{3,255}(?<!-)$/i,
        showRegexp: true,
        minLength: 3,
        maxLength: 255,
        example: "Helmut Mc Cloud",
    },
    [Entity.ORGANIZATION_NAME]: {
        name: "orgName",
        description: "Name of the organization",
        allowedCharacters: "alphanumeric characters, hyphens and dots",
        // Case-insensitive. No spaces or other special characters allowed. Cannot start with a dash, end with a dash, or contain double dashes
        pattern: /^(?!-)(?!.*--)[a-zA-Z0-9-.]{3,64}(?<!-)$/i,
        showRegexp: false,
        minLength: 3,
        maxLength: 64,
        example: "MoovIT-Software-Products-GmbH",
    },
    [Entity.USER_ORGANIZATION_NAME]: {
        name: "name",
        description: "Name of the user's private organization, allowed everything defined in the RFC for the email specification",
        pattern: /^[\w-+@.]{3,255}$/i,
        showRegexp: false,
        minLength: 3,
        maxLength: 255,
        example: "hmc@helmut.cloud",
        errorMessage: "it must follow everything defined in the RFC for the email specification",
    },
    [Entity.TEAM_NAME]: {
        name: "teamName",
        description: "Name of the team",
        allowedCharacters: "alphanumeric characters, hyphens and dots",
        // Case-insensitive. No spaces or additional special characters allowed. Cannot start with a dash, end with a dash, or contain double dashes
        pattern: /^(?!-)(?!.*--)[a-zA-Z0-9-.]{3,64}(?<!-)$/i,
        showRegexp: false,
        minLength: 3,
        maxLength: 64,
        example: "Research-and-development-department.1",
    },
    [Entity.COMPANY_NAME]: {
        name: "company",
        description: "Name of the company the organization belongs to",
        allowedCharacters: "alphanumeric characters, underscores, hyphens, dots and spaces",
        pattern: /^[\w-. ]{1,255}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 255,
        example: "Moovit SP",
    },
    [Entity.PAT_NAME]: {
        name: "name",
        description: "Name of the Personal Access Token",
        allowedCharacters: "alphanumeric characters, underscores, hyphens, dots and spaces",
        pattern: /^[\w-. ]{1,64}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 64,
        example: "Private auth token",
    },
    [Entity.JOIN_TOKEN_NAME]: {
        name: "name",
        description: "Name of the join token",
        allowedCharacters: "alphanumeric characters, underscores, hyphens and dots",
        pattern: /^[\w-.]{1,64}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 64,
        example: "Join_token_for_Moovit-SP.",
    },
    [Entity.SPACE_NAME]: {
        name: "spaceName",
        description: "Name of the space",
        allowedCharacters: "alphanumeric characters, hyphens and dots",
        pattern: /^[a-zA-Z0-9-.]{1,32}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 32,
        example: "Helmut4",
    },
    [Entity.EVENT_NAME]: {
        name: "eventName",
        description: "Name of the event",
        allowedCharacters: "alphanumeric characters, underscores, hyphens and dots",
        pattern: /^[\w-.]{1,128}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 128,
        example: "Dev_Camp-2025.1",
    },
    [Entity.STREAM_NAME]: {
        name: "name",
        description: "Name of the stream, periods and spaces are allowed only inside a name",
        allowedCharacters: "alphanumeric characters, underscores, hyphens, dots and spaces",
        pattern: /^(?![.\s]+)[\w-. ]{1,128}(?<![.\s]+)$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 128,
        example: "Stream-bandwidth",
    },
    [Entity.DESIGN_NAME]: {
        name: "name",
        description: "Name of the design",
        allowedCharacters: "alphabet characters, hyphens and underscores",
        pattern: /^[a-zA-Z-_]{1,64}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 64,
        example: "Design-application",
    },
    [Entity.SNAPSHOT_NAME]: {
        name: "name",
        description: "Name of the snapshot",
        allowedCharacters: "alphanumeric characters, underscores, hyphens, dots and spaces",
        pattern: /^[\w-. ]{1,64}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 64,
        example: "This is version 1.0",
    },
    [Entity.WEBHOOK_NAME]: {
        name: "name",
        description: "Name of the webhook",
        allowedCharacters: "alphanumeric characters, underscores, hyphens, dots and spaces",
        pattern: /^[\w-. ]{1,128}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 128,
        example: "Webhook - green",
    },
    [Entity.SECRET_KEY]: {
        name: "secretKey",
        description: "Key of the secret",
        allowedCharacters: "alphanumeric characters, underscores, hyphens and dots",
        pattern: /^[\w-.]{1,32}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 32,
        example: "Helmut4-dev.api_key",
    },
    [Entity.SECRET_VALUE]: {
        name: "value",
        description: "Secret value",
        pattern: /^.{1,1024}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 1024,
        example: "Something important!",
    },
    [Entity.POOL_NAME]: {
        name: "poolName",
        description: "Name of the pool",
        allowedCharacters: "alphanumeric characters, underscores, hyphens and dots",
        pattern: /^[\w-.]{1,128}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 128,
        example: "My-Pool",
    },
    [Entity.FUSE_JOB]: {
        name: "name",
        description: "Name of the cronjob",
        pattern: /^.{1,64}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 64,
        example: "My cronjob",
    },
    [Entity.WAVE_ENGINE_RELEASE]: {
        name: "version",
        description: "Version of the release",
        pattern: /^\d+\.\d+\.\d+(-dev-\d+)?$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 128,
        example: "1.3.0-dev-147",
        errorMessage: "it must follow semantic version format, for example: '1.0.0' or '1.0.0-dev-1'",
    },
    [Entity.CHALLENGE_STRING]: {
        name: "challenge",
        description:
            "Some third party services require to validate the target URL of a webhook first. To do so, they sent an initial GET request with a query-string called 'challenge'",
        allowedCharacters: "alphanumeric characters, underscores and hyphens",
        pattern: /^[\w-]{1,128}$/i,
        showRegexp: false,
        minLength: 1,
        maxLength: 128,
        example: "Some-random-string-to-validate-the-target-URL-of-a-webhook",
    },
};

export { Entity, ValidationHelper };

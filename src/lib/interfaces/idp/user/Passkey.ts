/**
 * Whether a passkey credential can be backed up and synced across multiple devices (e.g. via iCloud Keychain or
 * Google Password Manager), or is bound to a single physical authenticator and cannot be synced
 */
export enum DeviceType {
    SINGLE_DEVICE = "SINGLE_DEVICE",
    MULTI_DEVICE = "MULTI_DEVICE",
}

/**
 * How an authenticator is connected to the client device during a WebAuthn ceremony
 */
export enum AuthenticatorAttachment {
    PLATFORM = "platform", // The authenticator is built into the client device (e.g. Touch ID, Windows Hello)
    CROSS_PLATFORM = "cross-platform", // The authenticator is a removable/external device (e.g. a USB security key, or a phone reached via hybrid transport)
}

/**
 * A transport an authenticator supports for communicating with the client device
 */
export enum AuthenticatorTransport {
    BLE = "ble", // Bluetooth Low Energy
    CABLE = "cable", // Cloud-assisted Bluetooth Low Energy (caBLE)
    HYBRID = "hybrid", // A client device (e.g. a phone) reachable via QR code and BLE pairing
    INTERNAL = "internal", // The authenticator is part of the client device itself (platform authenticator)
    NFC = "nfc", // Near Field Communication
    SMART_CARD = "smart-card", // Smart Card
    USB = "usb", // USB
}

/**
 * Public representation of a passkey registered by a user. Never includes the credential's public key or signature counter
 */
export interface Passkey {
    credentialId: string; // Base64url-encoded credential ID
    name: string; // User-friendly label for this passkey, e.g. "MacBook Touch ID"
    deviceType?: DeviceType; // Whether the credential can be synced across multiple devices
    createDate: number; // Creation date of the passkey, in milliseconds since the Unix epoch
    lastUsedDate?: number; // Date the passkey was last used to log in, in milliseconds since the Unix epoch
}

/**
 * The relying party a new passkey is being registered for
 */
export interface PasskeyRelyingParty {
    id: string; // Domain identifying the relying party
    name: string; // Human-readable name of the relying party shown to the user
}

/**
 * The user a new passkey is being registered for
 */
export interface PasskeyUser {
    id: string; // Opaque, base64url-encoded identifier for the user
    name: string; // Username shown to help the user pick the right passkey
    displayName: string; // Full display name shown alongside the passkey
}

/**
 * References an existing credential, used to either exclude it from a new registration or allow it for authentication
 */
export interface PasskeyCredentialDescriptor {
    id: string; // Base64url-encoded credential ID
    transports?: AuthenticatorTransport[]; // Transports supported by this credential's authenticator
}

/**
 * A public key algorithm accepted for a new credential
 */
export interface PasskeyPubKeyCredParam {
    alg: number; // COSE algorithm identifier, e.g. -7 for ES256
    type: "public-key"; // WebAuthn credential type, always "public-key"
}

/**
 * Constraints the relying party places on which authenticators may be used and how they must behave during registration
 */
export interface PasskeyAuthenticatorSelection {
    authenticatorAttachment?: AuthenticatorAttachment; // Preferred connection type for the authenticator, if the relying party wants to restrict it
    residentKey?: string; // Whether the credential must be discoverable without the relying party specifying it beforehand
    requireResidentKey?: boolean; // Legacy equivalent of requiring a discoverable credential, kept for older clients
    userVerification?: string; // Whether the authenticator must verify the user's identity, for example via biometrics or a PIN
}

/**
 * Options returned by the server to create a new passkey with an authenticator
 */
export interface PasskeyRegistrationOptions {
    rp: PasskeyRelyingParty; // The relying party this passkey is being registered for
    user: PasskeyUser; // The user this passkey is being registered for
    challenge: string; // Random value the authenticator must sign to prove possession of the newly created private key
    pubKeyCredParams: PasskeyPubKeyCredParam[]; // Public key algorithms accepted for the new credential, in order of preference
    timeout?: number; // Maximum time in milliseconds the user has to complete the registration
    excludeCredentials?: PasskeyCredentialDescriptor[]; // Credentials already registered for this user, so the authenticator can avoid creating a duplicate passkey for one of them
    authenticatorSelection?: PasskeyAuthenticatorSelection; // Constraints on which authenticators may be used and how they must behave
    attestation?: string; // Level of attestation statement requested from the authenticator about its provenance
    extensions?: Record<string, unknown>; // Additional authenticator extension inputs, rarely used
}

/**
 * Options returned by the server to authenticate with an existing passkey
 */
export interface PasskeyAuthenticationOptions {
    challenge: string; // Random value the authenticator must sign to prove possession of the credential's private key
    timeout?: number; // Maximum time in milliseconds the user has to complete the authentication
    rpId?: string; // Domain identifying the relying party this passkey was registered for
    allowCredentials?: PasskeyCredentialDescriptor[]; // Credentials allowed to complete this authentication. Intentionally omitted by the server so that any passkey registered for this relying party can be offered without knowing the user's identity beforehand
    userVerification?: string; // Whether the authenticator must verify the user's identity, for example via biometrics or a PIN
    extensions?: Record<string, unknown>; // Additional authenticator extension inputs, rarely used
}

/**
 * The authenticator's response produced during passkey registration
 */
export interface PasskeyAttestationResponse {
    clientDataJSON: string; // Base64url-encoded clientDataJSON, containing the ceremony type, challenge and origin
    attestationObject: string; // Base64url-encoded CBOR attestationObject, containing the authenticator data and attestation statement
    authenticatorData?: string; // Base64url-encoded authenticator data (optional convenience duplicate of the data already embedded in attestationObject)
    transports?: AuthenticatorTransport[]; // Transports supported by this authenticator, as reported by the browser
    publicKeyAlgorithm?: number; // COSE algorithm identifier used by the credential's public key
    publicKey?: string; // Base64url-encoded DER SubjectPublicKeyInfo of the credential's public key
}

/**
 * The credential produced by the browser during passkey registration (the value returned by `navigator.credentials.create()`),
 * together with a label for the new passkey.
 */
export interface PasskeyRegistrationCredential {
    id: string; // Base64url-encoded credential ID
    rawId: string; // Base64url-encoded raw credential ID (identical to id)
    response: PasskeyAttestationResponse; // The authenticator's attestation response
    authenticatorAttachment?: AuthenticatorAttachment; // How the authenticator used for this registration is connected to the client device
    clientExtensionResults: Record<string, unknown>; // Authenticator extension outputs returned by the browser (rarely used)
    type: "public-key"; // WebAuthn credential type, always "public-key"
    name: string; // User-friendly label for this passkey, e.g. "MacBook Touch ID"
}

/**
 * The authenticator's response produced during passkey authentication
 * (part of the value returned by `navigator.credentials.get()`)
 */
export interface PasskeyAssertionResponse {
    clientDataJSON: string; // Base64url-encoded clientDataJSON, containing the ceremony type, challenge and origin
    authenticatorData: string; // Base64url-encoded authenticator data, including the relying party ID hash, flags and signature counter
    signature: string; // Base64url-encoded signature over the authenticator data and client data hash, produced with the credential's private key
    userHandle?: string; // Base64url-encoded user handle (the userID set at registration), returned by the browser for discoverable credentials
}

/**
 * The credential produced by the browser during passkey authentication (the value returned by `navigator.credentials.get()`)
 */
export interface PasskeyAuthenticationCredential {
    id: string; // Base64url-encoded credential ID used to sign the challenge
    rawId: string; // Base64url-encoded raw credential ID (identical to id)
    response: PasskeyAssertionResponse; // The authenticator's assertion response
    authenticatorAttachment?: AuthenticatorAttachment; // How the authenticator used for this login attempt is connected to the client device
    clientExtensionResults: Record<string, unknown>; // Authenticator extension outputs returned by the browser (rarely used)
    type: "public-key"; // WebAuthn credential type, always "public-key"
}

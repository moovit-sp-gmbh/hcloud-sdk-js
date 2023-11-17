export * from "./oauth";
export * from "./organization";
export * from "./organization/member";
export * from "./organization/member/invitations";
export * from "./organization/team";
export * from "./organization/settings/domain";
export * from "./organization/settings/domain/saml";
export * from "./organization/settings/oauthApp";
export * from "./user/GeneralSettings";
export * from "./user/Pat";
export * from "./user/Scopes";
export * from "./user/SuccessfulAuth";
export * from "./user/Totp";
export * from "./user";

export enum PreLoginPath {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    VERIFY_EMAIL = "VERIFY_EMAIL",
    EXTERNAL = "EXTERNAL",
}

export type PreLoginResponse =
    | {
          path: PreLoginPath.EXTERNAL;
          location: string;
      }
    | {
          path: Exclude<PreLoginPath, PreLoginPath.EXTERNAL>;
      };

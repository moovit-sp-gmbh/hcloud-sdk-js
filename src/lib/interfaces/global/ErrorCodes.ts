// AUTO-GENERATED - DO NOT EDIT

export const ErrorCodes = [
  {
    code: "000.000.0001",
    error: "rate.limit.reached",
    message: "Rate limit of 110 calls in 10s reached - blocked for 10s"
  },
  {
    code: "001.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "001.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "001.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "001.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "001.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "001.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "001.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "001.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "001.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "001.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "001.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "001.001.0005",
    error: "session.expired",
    message: "Your session expired"
  },
  {
    code: "001.001.0006",
    error: "token.expired",
    message: "Your token expired"
  },
  {
    code: "001.001.0007",
    error: "basic.auth.disabled.2fa",
    message: "Basic Auth has been disabled as 2FA is enabled for this account"
  },
  {
    code: "001.001.0008",
    error: "oidc.provider.not.found",
    message: "OpenID Connect provider not found. List of possible providers available in the public config"
  },
  {
    code: "001.001.0009",
    error: "oidc.provider.external.error",
    message: "OpenID Connect provider had an error"
  },
  {
    code: "001.001.0010",
    error: "oidc.provider.endpoint.missing",
    message: "Unable to use the discovery document to obtain the necessary endpoints. The provider may be unavailable"
  },
  {
    code: "001.001.0011",
    error: "invalid.login.state",
    message: "The RelayState sent by the SAML IdP is invalid."
  },
  {
    code: "001.001.0012",
    error: "login.state.not.found",
    message: "The login state has expired. Login states only persist for 10 minutes. Please try again."
  },
  {
    code: "001.001.0013",
    error: "email.assertion.missing",
    message: "The response from the SAML IdP is missing an email assertion."
  },
  {
    code: "001.001.0014",
    error: "invalid.scope",
    message: "Invalid scope(s) provided."
  },
  {
    code: "001.002.0001",
    error: "organization.member.not.found",
    message: "User is not member of the organization"
  },
  {
    code: "001.002.0002",
    error: "organization.member.already.exists",
    message: "User is already part of the organization"
  },
  {
    code: "001.003.0001",
    error: "invitation.already.sent",
    message: "An invitation to this user has already been sent."
  },
  {
    code: "001.003.0002",
    error: "invitation.not.found",
    message: "The specified invitation does not exist."
  },
  {
    code: "001.003.0003",
    error: "invitation.already.responded",
    message: "The invitation has already been responded to."
  },
  {
    code: "001.003.0004",
    error: "invitation.resend.limit.exceeded",
    message: "Too many resend-invitation-emails sent. Try again later."
  },
  {
    code: "001.004.0001",
    error: "pat.not.found",
    message: "PAT does not exist"
  },
  {
    code: "001.004.0002",
    error: "invalid.pat.expiration.date",
    message: "Expiration date must lie ahead at least one day"
  },
  {
    code: "001.004.0003",
    error: "pat.expired",
    message: "The personal access token used for authentication has expired."
  },
  {
    code: "001.004.0004",
    error: "pat.reserved.scope",
    message: "The personal access token contains a reserved scope."
  },
  {
    code: "001.005.0001",
    error: "user.protected",
    message: "This resource is protected"
  },
  {
    code: "001.005.0002",
    error: "old.password.mismatch",
    message: "The provided old password does not match the current one."
  },
  {
    code: "001.005.0003",
    error: "invalid.reset.nonce",
    message: "The provided nonce does not match the expected one."
  },
  {
    code: "001.005.0004",
    error: "user.email.not.allowed",
    message: "User's email is not allowed in helmut cloud"
  },
  {
    code: "001.005.0005",
    error: "user.not.found",
    message: "User has no helmut cloud account"
  },
  {
    code: "001.005.0006",
    error: "user.account.not.active",
    message: "The user account of given user has not been activated yet"
  },
  {
    code: "001.005.0007",
    error: "invalid.guest.hmac",
    message: "The HMAC supplied is incorrect. The email has been tampered with."
  },
  {
    code: "001.006.0001",
    error: "oauthApp.already.exists",
    message: "OAuth app with given name already exists"
  },
  {
    code: "001.006.0002",
    error: "oAuthApp.not.found",
    message: "OAuthApp does not exist"
  },
  {
    code: "001.006.0003",
    error: "missing.oAuthApp.pat",
    message: "This OAuthApp does not have a PAT. A Pat can be created via OAuth"
  },
  {
    code: "001.006.0004",
    error: "expired.oAuth.code",
    message: "The provided OAuth code has already expired"
  },
  {
    code: "001.006.0005",
    error: "oAuth.code.not.found",
    message: "The provided oauth code does not exist"
  },
  {
    code: "001.006.0006",
    error: "oAuth.refresh.token.not.found",
    message: "The provided oauth refresh token does not exist"
  },
  {
    code: "001.006.0007",
    error: "invalid.oAuthApp.content.type",
    message: "Only 'application/json' and 'application/x-www-form-urlencoded' content types are supported for oauth requests."
  },
  {
    code: "001.006.0008",
    error: "missing.oAuth.query",
    message: "OAuth missing query parameter: 'queryParameterName'"
  },
  {
    code: "001.006.0009",
    error: "oAuth.secret.not.found",
    message: "The provided oauth secret does not exist"
  },
  {
    code: "001.006.0010",
    error: "oAuthApp.secret.not.found",
    message: "OAuthApp secret with uuid 'uuid' does not exist"
  },
  {
    code: "001.006.0011",
    error: "oauth.invalid.redirect.uri",
    message: "The redirect_uri provided is either missing or failed to be validated."
  },
  {
    code: "001.006.0012",
    error: "oauth.secret.already.exists",
    message: "OAuth app secret already exists."
  },
  {
    code: "001.006.0013",
    error: "consent.not.given",
    message: "The user has not consented to the specified scopes"
  },
  {
    code: "001.007.0001",
    error: "organization.not.found",
    message: "Organization not found"
  },
  {
    code: "001.007.0002",
    error: "organization.already.exists",
    message: "Organization with given name already exists"
  },
  {
    code: "001.007.0003",
    error: "organization.must.have.owner",
    message: "The organization must have at least one owner. To remove the current owner from the organization, first assign another member as owner."
  },
  {
    code: "001.007.0004",
    error: "organization.insufficient.role",
    message: "Your role does not have the required permission"
  },
  {
    code: "001.007.0005",
    error: "operation.disabled.for.user.organization",
    message: "This operation is disabled for user organizations"
  },
  {
    code: "001.008.0001",
    error: "team.not.found",
    message: "Team does not exist"
  },
  {
    code: "001.008.0002",
    error: "team.already.exists",
    message: "Team with given name already exists in organization"
  },
  {
    code: "001.009.0001",
    error: "registration.verification.failed",
    message: "The given verification code was invalid"
  },
  {
    code: "001.009.0002",
    error: "registration.invalid.captcha",
    message: "The given captcha was not valid"
  },
  {
    code: "001.009.0003",
    error: "user.already.exists",
    message: "User has already an account in helmut cloud"
  },
  {
    code: "001.009.0004",
    error: "verification.email.resend.limit.exceeded",
    message: "Too many resend-verification-emails sent. Try again later."
  },
  {
    code: "001.021.0001",
    error: "domain.already.taken",
    message: "Domain already taken by another organization. If you are the current owner of this domain, this means that the previous owner already verified it. Contact support to resolve this issue."
  },
  {
    code: "001.021.0002",
    error: "domain.not.found",
    message: "Your organization has no domain associated with the given name."
  },
  {
    code: "001.021.0003",
    error: "domain.verification.failed",
    message: "Unable to find the correct UUID in the DNS TXT records associated with this domain."
  },
  {
    code: "001.021.0004",
    error: "domain.already.verified",
    message: "This domain has already been verified."
  },
  {
    code: "001.021.0005",
    error: "domain.belongs.to.another.organization",
    message: "This domain has already been verified by another organization. If you are the current owner of this domain, this means that the previous owner already verified it. Contact support to resolve this issue."
  },
  {
    code: "001.021.0006",
    error: "domain.cannot.be.resolved",
    message: "Unable to find DNS records associated with the domain {domainName} from DNS server."
  },
  {
    code: "001.022.0001",
    error: "saml.invalid.certificate",
    message: "The certificate sent is invalid."
  },
  {
    code: "001.022.0002",
    error: "saml.provider.already.exists",
    message: "SAML provider already exists for the specified domain."
  },
  {
    code: "001.022.0003",
    error: "saml.provider.not.found",
    message: "SAML provider not found for the specified domain."
  },
  {
    code: "001.022.0004",
    error: "saml.unverified.domain",
    message: "Cannot link SAML provider to an unverified domain."
  },
  {
    code: "001.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "001.029.0001",
    error: "totp.not.found",
    message: "User has no TOTP activated"
  },
  {
    code: "001.029.0002",
    error: "totp.recover.failed",
    message: "Failed to verify the given 2FA (TOTP) recover code"
  },
  {
    code: "001.029.0003",
    error: "totp.verification.failed",
    message: "Failed to verify the given 2FA (TOTP) token"
  },
  {
    code: "001.029.0004",
    error: "totp.already.exists",
    message: "User TOTP has already been set, delete first"
  },
  {
    code: "001.032.0001",
    error: "license.quota.exceeded",
    message: "You have exceeded the assigned quota for this action."
  },
  {
    code: "001.032.0002",
    error: "license.already.exists",
    message: "This organization already has a license."
  },
  {
    code: "001.032.0003",
    error: "failed.to.fetch.license",
    message: "Failed to fetch the license because '{{reason}}'"
  },
  {
    code: "001.032.0004",
    error: "unassigned.license",
    message: "The specified license is not assigned to this organization."
  },
  {
    code: "001.034.0001",
    error: "service.account.not.found",
    message: "Service account not found"
  },
  {
    code: "001.034.0002",
    error: "service.account.already.exists",
    message: "Service account {name} already exists"
  },
  {
    code: "001.044.0001",
    error: "message.not.found",
    message: "The specified message does not exist."
  },
  {
    code: "001.055.0001",
    error: "storage.already.exists",
    message: "Storage already exists"
  },
  {
    code: "001.055.0002",
    error: "storage.not.found",
    message: "Storage not found"
  },
  {
    code: "001.055.0003",
    error: "storage.name.not.allowed",
    message: "Storage name not allowed"
  },
  {
    code: "001.055.0004",
    error: "storage.does.not.fulfill.requirements",
    message: "Storage does not fulfill requirements: '{{msg}}'"
  },
  {
    code: "001.056.0001",
    error: "oidc.provider.already.exists",
    message: "oidc provider already exists for the specified domain."
  },
  {
    code: "001.056.0002",
    error: "domain.oidc.provider.not.found",
    message: "OIDC provider not found for the specified domain."
  },
  {
    code: "001.056.0003",
    error: "oidc.unverified.domain",
    message: "Cannot link oidc provider to an unverified domain."
  },
  {
    code: "002.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "002.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "002.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "002.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "002.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "002.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "002.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "002.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "002.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "002.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "002.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "002.002.0001",
    error: "organization.member.not.found",
    message: "User is not member of the organization"
  },
  {
    code: "002.007.0001",
    error: "organization.not.found",
    message: "Organization not found"
  },
  {
    code: "002.008.0001",
    error: "team.not.found",
    message: "Team does not exist"
  },
  {
    code: "002.010.0001",
    error: "space.not.found",
    message: "Given space not found"
  },
  {
    code: "002.010.0002",
    error: "space.name.in.use",
    message: "Given space name is already in use"
  },
  {
    code: "002.010.0003",
    error: "space.insufficient.permission",
    message: "You do not have the required permission"
  },
  {
    code: "002.010.0004",
    error: "space.invalid.owner",
    message: "A team cannot be the owner of a space"
  },
  {
    code: "002.010.0005",
    error: "space.permission.not.found",
    message: "No permission found for given spaceId and entityId"
  },
  {
    code: "002.011.0001",
    error: "webhook.name.in.use",
    message: "Given webhook name is already in use"
  },
  {
    code: "002.011.0002",
    error: "webhook.not.found",
    message: "Given webhook not found"
  },
  {
    code: "002.011.0004",
    error: "frameio.invalid.signature",
    message: "FrameIo signature verification failed, missing or invalid signature"
  },
  {
    code: "002.011.0005",
    error: "frameio.invalid.timestamp",
    message: "FrameIo signature verification failed, missing or invalid timestamp"
  },
  {
    code: "002.011.0006",
    error: "invalid.security.headers",
    message: "The provided security headers do not match"
  },
  {
    code: "002.011.0007",
    error: "invalid.multipart.form.data.header",
    message: "The provided multipart/form-data header is invalid. It is missing 'missing'."
  },
  {
    code: "002.011.0008",
    error: "webhook.execution.error",
    message: "Failed to execute webhook"
  },
  {
    code: "002.011.0009",
    error: "webhook.preparation.error",
    message: "Failed to prepare webhook - 'detailedMessage'"
  },
  {
    code: "002.011.0010",
    error: "webhook.blocked.ip",
    message: "Incoming request from blocked IP address {{ip}}"
  },
  {
    code: "002.011.0011",
    error: "webhook.callback.expired",
    message: "The callback window for this webhook execution has expired"
  },
  {
    code: "002.012.0001",
    error: "webhookLog.not.found",
    message: "Given webhook log not found"
  },
  {
    code: "002.013.0001",
    error: "wave.engine.not.found",
    message: "Requested wave engine not found"
  },
  {
    code: "002.013.0002",
    error: "wave.catalog.not.found",
    message: "Requested wave catalog not found"
  },
  {
    code: "002.013.0003",
    error: "failed.dependency",
    message: "Failed to request resource(s) from 'target'"
  },
  {
    code: "002.013.0004",
    error: "invalid.catalog",
    message: "The supplied catalog is invalid due to {{reason}}"
  },
  {
    code: "002.014.0001",
    error: "stream.not.found",
    message: "Given stream not found"
  },
  {
    code: "002.014.0003",
    error: "stream.invalid.order",
    message: "The stream order provided is invalid. It should be sequential, incremental by 1, starting from 1 and not exceeding total events stream count."
  },
  {
    code: "002.015.0001",
    error: "stream.inactive",
    message: "Unable to execute stream marked as inactive. Please change the state of the stream first."
  },
  {
    code: "002.015.0003",
    error: "target.not.connected",
    message: "Requested target is not connected"
  },
  {
    code: "002.015.0004",
    error: "execution.target.not.member",
    message: "Requested target {{target}} is not a member of the organization"
  },
  {
    code: "002.015.0005",
    error: "incompatible.engine.version",
    message: "Minimum engine version required '{{minimum}}', but current space version is '{{current}}'"
  },
  {
    code: "002.015.0006",
    error: "invalid.execution.configuration",
    message: "invalid execution configuration: {{reason}}"
  },
  {
    code: "002.015.0007",
    error: "single.user.debug",
    message: "Only the user that started an execution can issue debug commands to it"
  },
  {
    code: "002.015.0008",
    error: "no.debug.mode",
    message: "Debug commands can only be issued to executions of designs started in debug mode"
  },
  {
    code: "002.015.0009",
    error: "debug.command.timeout",
    message: "Acknowledgement of debug command timed out"
  },
  {
    code: "002.015.0010",
    error: "execution.target.not.execution.target",
    message: "Requested target {{target}} is a member of the organization but not an execution target"
  },
  {
    code: "002.015.0011",
    error: "missing.catalog.exception",
    message: "A catalog present in the stream does not exist in the space anymore {{catalog}}"
  },
  {
    code: "002.016.0001",
    error: "node.not.found",
    message: "Node not found"
  },
  {
    code: "002.017.0001",
    error: "event.not.found",
    message: "Given event not found"
  },
  {
    code: "002.017.0002",
    error: "event.name.in.use",
    message: "Given event name is already in use"
  },
  {
    code: "002.017.0003",
    error: "event.has.linked.jobs",
    message: "Event still has {{count}} linked job(s) - delete them first or confirm cascade deletion"
  },
  {
    code: "002.018.0001",
    error: "design.not.found",
    message: "Given design not found"
  },
  {
    code: "002.018.0002",
    error: "design.node.not.found",
    message: "Given design node not found"
  },
  {
    code: "002.018.0003",
    error: "design.link.not.found",
    message: "Given design link not found"
  },
  {
    code: "002.018.0004",
    error: "design.hash.mismatch",
    message: "Mismatch between actual current hash and expected current hash. You may need to retrieve a more up-to-date version of this design."
  },
  {
    code: "002.018.0005",
    error: "snapshot.already.exists",
    message: "There already a snapshot of this design with the same name."
  },
  {
    code: "002.018.0006",
    error: "snapshot.not.found",
    message: "Design snapshot not found."
  },
  {
    code: "002.018.0007",
    error: "maximum.snapshots.reached",
    message: "This stream has reached the maximum amount of snapshots ({amount}). Delete existing ones in order to add more."
  },
  {
    code: "002.018.0008",
    error: "published.snapshot.deletion.forbidden",
    message: "A published snapshot cannot be deleted."
  },
  {
    code: "002.018.0009",
    error: "empty.design",
    message: "An empty design cannot be published"
  },
  {
    code: "002.018.0010",
    error: "unable.to.replace.substream",
    message: "Unable to replace substream: {{error}}"
  },
  {
    code: "002.020.0001",
    error: "cronjob.not.found",
    message: "Given cronjob not found"
  },
  {
    code: "002.020.0002",
    error: "cronjob.invalid.expression",
    message: "Given cronjob expression is either not a valid quartz format, uses advanced expressions that are not supported or holds a value other than 0 for the 'seconds' field (seconds are currently not allowed)"
  },
  {
    code: "002.020.0003",
    error: "cronjob.log.not.found",
    message: "Given cronjob log not found"
  },
  {
    code: "002.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "002.024.0001",
    error: "secret.not.found",
    message: "Secret not found."
  },
  {
    code: "002.024.0002",
    error: "secret.already.exists",
    message: "Secret already exists."
  },
  {
    code: "002.025.0001",
    error: "execution.log.not.found",
    message: "Execution log not found."
  },
  {
    code: "002.025.0002",
    error: "execution.result.not.found",
    message: "Execution result object not found."
  },
  {
    code: "002.025.0003",
    error: "execution.not.found",
    message: "Execution object not found."
  },
  {
    code: "002.025.0004",
    error: "execution.cancel",
    message: "Cancel execution failed 'message'"
  },
  {
    code: "002.031.0001",
    error: "join.token.already.exists",
    message: "Join token with the same already exists."
  },
  {
    code: "002.031.0002",
    error: "join.token.not.found",
    message: "Join token not found."
  },
  {
    code: "002.032.0001",
    error: "license.quota.exceeded",
    message: "You have exceeded the assigned quota for this action."
  },
  {
    code: "002.033.0001",
    error: "pool.name.in.use",
    message: "Pool name {{name}} is already in use"
  },
  {
    code: "002.033.0002",
    error: "pool.not.found",
    message: "Pool not found"
  },
  {
    code: "002.035.0001",
    error: "database.not.found",
    message: "Given database not found"
  },
  {
    code: "002.035.0002",
    error: "database.name.in.use",
    message: "Given database name is already in use"
  },
  {
    code: "002.036.0001",
    error: "document.type.mismatch",
    message: "Data type of the value does not match the existing documents data type"
  },
  {
    code: "002.036.0002",
    error: "document.not.found",
    message: "Given document not found"
  },
  {
    code: "002.036.0003",
    error: "document.already.exists",
    message: "Document with given key already exists within a space"
  },
  {
    code: "002.036.0004",
    error: "array.item.not.found",
    message: "Given array item not found"
  },
  {
    code: "002.036.0005",
    error: "object.keys.not.found",
    message: "Given object keys not found"
  },
  {
    code: "002.053.0001",
    error: "apikey.not.found",
    message: "API key not found"
  },
  {
    code: "002.053.0002",
    error: "apikey.name.in.use",
    message: "Given API key name is already in use"
  },
  {
    code: "003.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "003.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "003.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "003.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "003.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "003.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "003.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "003.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "003.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "003.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "003.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "003.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "004.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "004.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "004.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "004.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "004.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "004.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "004.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "004.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "004.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "004.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "004.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "004.019.0001",
    error: "template.not.found",
    message: "Given template not found"
  },
  {
    code: "004.019.0002",
    error: "mailjet.generic",
    message: "mailjetgeneric  error"
  },
  {
    code: "004.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "005.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "005.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "005.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "005.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "005.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "005.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "005.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "005.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "005.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "005.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "005.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "005.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "005.027.0001",
    error: "context.already.exists",
    message: "Context already exists"
  },
  {
    code: "005.027.0002",
    error: "context.not.found",
    message: "No context found"
  },
  {
    code: "005.027.0003",
    error: "context.not.connected",
    message: "The context seems not to be connected to hcloud"
  },
  {
    code: "005.027.0004",
    error: "context.already.connected",
    message: "The is already connected"
  },
  {
    code: "005.051.0001",
    error: "module.already.exists",
    message: "Module already exists"
  },
  {
    code: "005.051.0002",
    error: "module.not.found",
    message: "Given module not found"
  },
  {
    code: "005.052.0001",
    error: "log.collector.registration.failed",
    message: "Failed to register the external logging collector"
  },
  {
    code: "005.052.0002",
    error: "log.collector.not.found",
    message: "External log collector with the specified name '::name::' was not found"
  },
  {
    code: "006.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "006.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "006.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "006.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "006.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "006.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "006.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "006.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "006.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "006.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "006.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "006.001.0005",
    error: "missing.auth.interceptor",
    message: "auth interceptor missing"
  },
  {
    code: "006.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "006.028.0001",
    error: "invalid.json",
    message: "failed to encode return-value to json"
  },
  {
    code: "006.028.0002",
    error: "feature.already.exists",
    message: "feature with given name does already exists"
  },
  {
    code: "006.028.0003",
    error: "feature.not.found",
    message: "feature with given name does not exist"
  },
  {
    code: "006.028.0004",
    error: "feature.creation.failed",
    message: "<generic error>"
  },
  {
    code: "006.028.0005",
    error: "feature.update.failed",
    message: "<generic error>"
  },
  {
    code: "006.028.0006",
    error: "feature.listing.failed",
    message: "<generic error>"
  },
  {
    code: "006.028.0007",
    error: "feature.deletion.failed",
    message: "<generic error>"
  },
  {
    code: "007.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "007.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "007.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "007.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "007.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "007.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "007.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "007.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "007.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "007.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "007.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "007.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "007.026.0001",
    error: "invalid.filesize",
    message: "The maximum allowed file size is :filesize: kb"
  },
  {
    code: "007.026.0002",
    error: "invalid.mimetype",
    message: "File type ':mimetype:' is not allowed"
  },
  {
    code: "007.026.0003",
    error: "image.processing.error",
    message: "custom message"
  },
  {
    code: "007.026.0004",
    error: "file.transfer.error",
    message: "custom message"
  },
  {
    code: "008.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "008.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "008.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "008.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "008.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "008.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "008.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "008.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "008.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "008.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "008.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "008.002.0001",
    error: "organization.member.not.found",
    message: "User is not member of the organization"
  },
  {
    code: "008.007.0001",
    error: "organization.not.found",
    message: "Organization not found"
  },
  {
    code: "008.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "008.030.0001",
    error: "agent.not.found",
    message: "Agent not found"
  },
  {
    code: "008.030.0002",
    error: "agent.offline",
    message: "Agent is offline"
  },
  {
    code: "008.030.0003",
    error: "agent.online",
    message: "Agent is online"
  },
  {
    code: "008.030.0004",
    error: "agent.already.connected",
    message: "Agent already connected to this organization."
  },
  {
    code: "008.030.0005",
    error: "agent.not.connected",
    message: "Agent not connected"
  },
  {
    code: "008.032.0001",
    error: "license.quota.exceeded",
    message: "You have exceeded the assigned quota for this action."
  },
  {
    code: "009.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "009.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "009.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "009.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "009.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "009.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "009.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "009.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "009.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "009.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "009.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "009.005.0001",
    error: "user.not.found",
    message: "User not found in the space"
  },
  {
    code: "009.008.0001",
    error: "team.not.found",
    message: "Team does not exist"
  },
  {
    code: "009.010.0001",
    error: "space.not.found",
    message: "Given space not found"
  },
  {
    code: "009.010.0002",
    error: "space.name.in.use",
    message: "Given space name is already in use"
  },
  {
    code: "009.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "009.037.0001",
    error: "item.not.found",
    message: "Item not found"
  },
  {
    code: "009.037.0002",
    error: "item.in.trash",
    message: "Item is in trash"
  },
  {
    code: "009.037.0003",
    error: "new.parent.inside.item",
    message: "The item is being copied/moved into one of its own children"
  },
  {
    code: "009.038.0001",
    error: "asset.not.found",
    message: "Asset not found"
  },
  {
    code: "009.038.0002",
    error: "operation.not.permitted",
    message: "Operation not permitted on asset - '{{reason}}'"
  },
  {
    code: "009.039.0001",
    error: "folder.not.found",
    message: "Folder not found"
  },
  {
    code: "009.039.0002",
    error: "folder.not.empty",
    message: "Folder not empty"
  },
  {
    code: "009.040.0001",
    error: "namespace.not.found",
    message: "Namespace not found"
  },
  {
    code: "009.040.0002",
    error: "namespace.exists",
    message: "Namespace already exists"
  },
  {
    code: "009.041.0001",
    error: "media.not.found",
    message: "Media not found"
  },
  {
    code: "009.042.0001",
    error: "location.not.found",
    message: "Location not found"
  },
  {
    code: "009.043.0001",
    error: "comment.not.found",
    message: "Comment not found"
  },
  {
    code: "009.045.0001",
    error: "share.not.found",
    message: "Share not found"
  },
  {
    code: "009.045.0002",
    error: "empty.share",
    message: "A share must contain at least one asset or folder on creation."
  },
  {
    code: "009.045.0003",
    error: "invalid.password",
    message: "The provided password does not match the share's password."
  },
  {
    code: "009.045.0004",
    error: "invalid.share.hmac",
    message: "The HMAC supplied is incorrect."
  },
  {
    code: "009.045.0005",
    error: "share.expired",
    message: "Share expired"
  },
  {
    code: "009.045.0006",
    error: "not.linked.to.share",
    message: "Impossible to access shared assets if not linked to share"
  },
  {
    code: "009.045.0007",
    error: "invitation.to.share.not.found",
    message: "Invitation to share not found"
  },
  {
    code: "009.045.0008",
    error: "share.not.available",
    message: "Share not avaiable yet"
  },
  {
    code: "009.045.0009",
    error: "share.inactive",
    message: "Share is inactive"
  },
  {
    code: "009.047.0001",
    error: "tag.max.count.reached",
    message: "Maximum number of tags reached for namespace"
  },
  {
    code: "009.047.0002",
    error: "tag.exists",
    message: "Tag already exists in the namespace"
  },
  {
    code: "009.047.0003",
    error: "tag.not.found",
    message: "Tag not found in the namespace"
  },
  {
    code: "009.047.0004",
    error: "tag.name.protected",
    message: "Tag name is protected"
  },
  {
    code: "009.047.0005",
    error: "tag.reorder.mismatch",
    message: "Provided tag IDs do not match the tags in this namespace"
  },
  {
    code: "009.048.0001",
    error: "role.already.exists",
    message: "A role with the same name already exists in the space"
  },
  {
    code: "009.048.0002",
    error: "permission.category.mismatch",
    message: "A permission was assigned to an entity that does not match the permission category. {{name}}: {{incoming}} assigned to {{actual}}"
  },
  {
    code: "009.048.0003",
    error: "role.not.found",
    message: "Role not found"
  },
  {
    code: "009.049.0001",
    error: "bunny.library.not.found",
    message: "Bunny Stream library not found"
  },
  {
    code: "009.050.0001",
    error: "hc.uploader.library.not.found",
    message: "Hc Uploader Stream library not found"
  },
  {
    code: "009.050.0002",
    error: "hc.uploader.waveform.not.found",
    message: "Hc Uploader Video waveform not found"
  },
  {
    code: "009.054.0001",
    error: "stack.not.found",
    message: "Stack not found"
  },
  {
    code: "009.054.0002",
    error: "asset.not.in.stack",
    message: "One or more specified assets are not part of the stack"
  },
  {
    code: "009.054.0003",
    error: "asset.already.in.stack",
    message: "One or more specified assets are already part of the stack"
  },
  {
    code: "009.054.0004",
    error: "stack.must.have.multiple.assets",
    message: "A stack cannot be composed of a single asset"
  },
  {
    code: "009.055.0001",
    error: "storage.space.not.empty",
    message: "Cannot change storage of a space that contains media assets"
  },
  {
    code: "009.055.0003",
    error: "storage.not.found",
    message: "Storage not found"
  },
  {
    code: "009.055.0004",
    error: "storage.invalid",
    message: "Invalid storage configuration. Please run test in idp in order to validate. If still invalid, please recheck the storage configuration and/or contact your cloud storage administrator."
  },
  {
    code: "010.000.0002",
    error: "internal.server.error",
    message: "Specific message describing the problem"
  },
  {
    code: "010.000.0003",
    error: "invalid.parameter",
    message: "Failed to validate 'type' parameter 'paramKey' - specificMessage"
  },
  {
    code: "010.000.0004",
    error: "invalid.body",
    message: "Detailed message"
  },
  {
    code: "010.000.0005",
    error: "payload.too.large",
    message: "Payload sent is too large. Maximum is {{maxSize}}"
  },
  {
    code: "010.000.0006",
    error: "not.implemented",
    message: "Feature not implemented"
  },
  {
    code: "010.000.0007",
    error: "empty.update",
    message: "Update with no changes attempted"
  },
  {
    code: "010.000.0008",
    error: "unsupported",
    message: "Unsupported: {{message}}"
  },
  {
    code: "010.001.0001",
    error: "unauthorized",
    message: "You're not authorized"
  },
  {
    code: "010.001.0002",
    error: "missing.auth.token",
    message: "Expected an authentication token that has not been provided"
  },
  {
    code: "010.001.0003",
    error: "wrong.auth.token",
    message: "Your authentication token is invalid"
  },
  {
    code: "010.001.0004",
    error: "insufficient.rights",
    message: "You have not enough rights to access/manipulate this resource"
  },
  {
    code: "010.023.0001",
    error: "search.invalid.filter",
    message: "The value of the filter property 'field' is invalid"
  },
  {
    code: "010.046.0001",
    error: "short.not.found",
    message: "Given short URL not found"
  }
] as const;

export type ErrorCode = (typeof ErrorCodes)[number]["code"];

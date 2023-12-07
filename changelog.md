# Changelog

## 0.0.77

-   **BREAKING**: Rename totalMembersCount to totalMemberCount in Team interface

## 0.0.76

-   Add option to retrieve additional properties when requesting teams via searchTeams
-   **BREAKING**: Remove listTeams function (use searchTeams instead)

## 0.0.75

-   Add ability to start an empty Design operation queue

## 0.0.74

-   **BREAKING**: Mothership methods no longer use Node.js APIs to populate missing values. All the parameters are now required

## 0.0.73

-   **BREAKING**: Rename design.design to design.content

## 0.0.72

-   **BREAKING**: Update mothership connect method to require a user's email

## 0.0.71

-   Add option to retrieve additional properties (membersSample, totalMemberCount, ...) when searching users organizations

## 0.0.70

-   Add service to manage design snapshots

## 0.0.69

-   Add the ability to apply operations to stream designs
-   Add the designHash property to the Design interface

## 0.0.68

-   **BREAKING**: Update High5 createDesign required design shape to match SDS

## 0.0.67

-   **BREAKING**: Update High5 streams to have only one design

## 0.0.66

-   Add High5 endpoint to exchange a join token for user info and credentials

## 0.0.65

-   Add IDP endpoint to manage user connection settings

## 0.0.64

-   Add IDP internal endpoint to create agent users

## 0.0.63

-   Add High5 endpoints to manage join tokens

## 0.0.62

-   **BREAKING**: Update Mothership helloAgain and hello parameters and return values
-   Add Mothership register endpoint

## 0.0.61

-   **BREAKING**: Remove Agent `status` property
-   Add `_id` and `ip` property to Agent interface

## 0.0.60

-   **BREAKING**: Remove Mothership goodbye

## 0.0.59

-   Update Mothership helloAgain's required parameters

## 0.0.58

-   Add endpoint to manage notification settings of user
-   **BREAKING**: Fix interface GeneralSettings: Will return a ReducedUser instead of a userId

## 0.0.57

-   Add mothership service to hcloud client

## 0.0.56

-   Add mothership product

## 0.0.55

-   Add method to obtain pre-login info

## 0.0.54

-   Add Nats subject for notification settings

## 0.0.53

-   **BREAKING**: Remove addOrganizationMember from organization.members
-   Add organization.members.invitations to manage invitations

## 0.0.52

-   **BREAKING**: Rework Organization interfaces: Combine all Organization interfaces into a single one with optional fields
-   **BREAKING**: Properties 'role' and 'teams' have been renamed to 'roleOfUser' and 'teamsOfUser'
-   **BREAKING**: Update function getOrganization() to reflect these changes and also to reflect new query options to retrieve totalMemberCount and
    membersSample

## 0.0.51

-   Add searchStreamsOfSpace method

## 0.0.50

-   Adapt NATS interfaces to not have settings in their paths when working with secrets

## 0.0.49

-   **BREAKING**: Move class High5Secret out of settings and delete settings folder and class

## 0.0.48

-   **BREAKING**: Rename OrganizationPermission to OrganizationRole. Update all organization related objects and fields to hold role instead of
    permission

## 0.0.47

-   helmut.cloud Bouncer support

## 0.0.46

-   **BREAKING**: When the backends respond with a 400/500 we throw HCloudError instead of AxiosError

## 0.0.45

-   **BREAKING**: Update interface 'Secret' to hold a creator

## 0.0.44

-   **BREAKING**: Update interfaces to hold reduced objects

## 0.0.43

-   Add getAxios method to additional custom interceptors
-   Add optional comparator to SearchFilters
-   Add rest parameters to HcloudLogger
-   Fix response interceptor will forward errors correctly

## 0.0.42

-   Add package version to build number

## 0.0.41

-   Update type/interface definitions to be more robust

## 0.0.40

-   **BREAKING**: Update creator field of OrganizationWithPermission interface to hold a reducedUser

## 0.0.39

-   introduce patch wave engine endpoint for high5 spaces

## 0.0.38

-   **BREAKING**: Update Stream interface to contain ReducedSpace instead of just the space name

## 0.0.37

-   Rename interface Scopes to Scope to match with interface defined in backend-core

## 0.0.36

-   Rewrite JsDoc comments to have a consisten structure

## 0.0.35

-   **BREAKING**: Re-organize interface folder structure and delete interfaces that don't belong in SDK
-   **BREAKING**: Re-organize service folder structure and use index files to avoid duplicate namings
-   Enable no-unused-vars and delete all unused vars

## 0.0.34

-   Fix return type of getCronjobLog() / getCronjobLogs() and also return total number of results

## 0.0.33

-   Remove hcloud.getNatsService()

## 0.0.32

-   Add missing endpoints related to stream-execution-logs

## 0.0.31

-   Update reduced interfaces to contain avatarUrl

## 0.0.30

-   Update webhook interfaces. Endpoints remain the same
-   Rework nats to not behave as a singleton
-   Add new query parameter to cronjob endpoints and corresponding property to the interface that exposes the next cron execution as unix timestamp

## 0.0.29

-   Update AuditLog interface. "organization" was replaced with "organizationId"

## 0.0.28

-   fix: team users are now returned as ReducedUsers and no more as id array

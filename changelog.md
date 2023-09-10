# Changelog

## 0.0.43

- Add getAxios method to additional custom interceptors
- Add optional comparator to SearchFilters
- Add rest parameters to HcloudLogger
- Fix response interceptor will forward errors correctly

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

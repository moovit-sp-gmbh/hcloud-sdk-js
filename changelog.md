# Changelog
## 0.0.31

- Enable no-unused-vars and delete all unused vars

## 0.0.34

- Fix return type of getCronjobLog() / getCronjobLogs() and also return total number of results

## 0.0.33

- Remove hcloud.getNatsService()

## 0.0.32

- Add missing endpoints related to stream-execution-logs

## 0.0.31

- Update reduced interfaces to contain avatarUrl

## 0.0.30

- Update webhook interfaces. Endpoints remain the same
- Rework nats to not behave as a singleton
- Add new query parameter to cronjob endpoints and corresponding property to the interface that exposes the next cron execution as unix timestamp

## 0.0.29

- Update AuditLog interface. "organization" was replaced with "organizationId"

## 0.0.28

- fix: team users are now returned as ReducedUsers and no more as id array

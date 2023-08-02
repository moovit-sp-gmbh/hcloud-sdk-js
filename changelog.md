# Changelog

## 0.0.30

- Update webhook interfaces. Endpoints remain the same
- Rework nats to not behave as a singleton
- Add new query parameter to cronjob endpoints and corresponding property to the interface that exposes the next cron execution as unix timestamp

## 0.0.29

- Update AuditLog interface. "organization" was replaced with "organizationId"

## 0.0.28

- fix: team users are now returned as ReducedUsers and no more as id array

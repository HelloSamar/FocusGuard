# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-09-17

### Security
- Once a settings password is set, the "Set Password" control is now
  permanently removed. There is no remaining in-app way to change,
  disable, or clear an existing password — previously it could be
  silently overwritten at any time, locked or unlocked, without knowing
  the current one.

### Fixed
- `declarativeNetRequest` rule IDs no longer collide once more than 1,000
  domains are blocked while a keyword rule also exists; keyword rule IDs
  now start at a much higher offset.
- Blocked domains embedded via `<iframe>` (`sub_frame` requests) are now
  redirected too, not just direct top-level navigation to them.

### Changed
- Domain/keyword validation (`normalizeDomain`, `normalizeKeyword`,
  `isValidDomain`, `uniqueClean`) is consolidated into a single shared.js
  module used by both the settings page and the background service
  worker, instead of being duplicated in each.

## [1.0.0] - 2026-08-22

### Added
- Block sites by domain or by keyword, matched against the URL.
- One-click "Block Site" from the toolbar popup.
- Password-protected settings page (SHA-256 hashed, 3-attempt lockout with a
  30s cooldown, 5-minute inactivity auto-lock).
- Tab timers: auto-close a tab, or just pause its video, after a set duration.
- Progress dashboard: total blocks, current/best streak, last-7-days chart,
  most-tempting sites.
- Import/export your blocklist and keywords as JSON.
- Dark mode for the settings page.

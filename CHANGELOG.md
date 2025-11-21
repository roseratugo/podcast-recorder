# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [v0.3.11] - 2025-11-21

### Changed

- Renamed project from Podcast Recorder to Okarin

## [v0.3.10] - 2025-11-20

### Fixed

- CI Cloudflare Workers deployment with direct wrangler CLI
- Renamed signaling worker to 'signaling'

## [v0.3.5] - 2025-11-20

### Fixed

- Use bash shell for version scripts on Windows CI
- Update version from git tag in CI builds

## [v0.3.3] - 2025-11-20

### Added

- Cloudflare Workers auto-deploy workflow after release

## [v0.3.2] - 2025-11-20

### Fixed

- Updater capabilities moved to tauri.conf.json inline format
- Updater and process plugin permissions

## [v0.3.1] - 2025-11-20

### Fixed

- Release workflow gets version from git tags instead of package.json

## [v0.3.0] - 2025-11-20

### Added

- Auto-updater with GitHub Releases integration
- Founder member authentication service
- JWT-based room creation authorization

## [v0.2.0] - 2025-11-20

### Added

- Multi-platform CI builds (macOS, Windows, Linux)
- Generated Tauri icons for all platforms

### Fixed

- Use aarch64-apple-darwin target for macOS build

## [v0.1.0] - 2025-11-09

### Added

- Multi-track recording with separate audio/video files per participant
- Room creation and joining via signaling server
- Real-time WebRTC communication via Cloudflare Calls SFU
- Pre-join screen with device selection and preview
- Audio/video quality presets (low, medium, high, ultra)
- Recording pause/resume controls
- Keyboard shortcuts (Space to toggle, R to start, P to pause)
- Dark/Light/System theme support
- Device persistence across sessions
- Error boundary for crash recovery
- WebSocket handling for real-time signaling
- Room TTL and automatic cleanup
- Peer connection management for mesh topology
- ICE candidate exchange with trickle ICE
- Offer/answer negotiation flow
- Media device enumeration and selection
- Zustand state management
- Tauri store for persistent user preferences

### Infrastructure

- Tauri 2.9 desktop application (macOS)
- Cloudflare Workers signaling server
- Durable Objects for WebSocket room management
- KV Storage for room metadata
- GitHub Actions CI/CD

### Fixed

- Memory leak in PeerManager setInterval
- TypeScript errors in useCloudfareCalls hook
- Video toggle not working after disable/enable

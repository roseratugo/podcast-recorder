<div align="center">
  <h1>Okarin</h1>
  <p>Local-first podcast recording for distributed teams</p>
</div>

<br />

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-2.9-24C8D8?logo=tauri&logoColor=white)](https://tauri.app/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

<br />

## Why Okarin?

Recording a podcast remotely usually means one compressed audio stream for everyone. Okarin captures each participant as a separate track, giving you individual files for professional post-production.

- **Multi-track recording** - Each participant recorded as a separate audio/video file
- **Full quality** - No compression from centralized recording
- **WebRTC SFU** - Scalable media routing via Cloudflare Calls
- **Edge signaling** - Sub-50ms latency with global Cloudflare Workers

## Installation

Download the latest release from [GitHub Releases](https://github.com/roseratugo/okarin/releases).

**macOS**: Download `.dmg`, drag to Applications
**Windows**: Coming soon
**Linux**: Coming soon

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 8
- Rust >= 1.70

### Setup

```bash
pnpm install
```

### Commands

```bash
# Development
pnpm dev:desktop      # Desktop app with hot reload
pnpm dev:signaling    # Local signaling server

# Build
pnpm build            # All packages
pnpm tauri:build      # Desktop distributable

# Quality
pnpm lint             # Check code
pnpm typecheck        # Type validation
```

## Architecture

```
apps/
├── desktop/       # Tauri + React
├── signaling/     # Cloudflare Worker (WebSocket rooms)
└── auth/          # Cloudflare Worker (JWT auth)

packages/
└── ui/            # Shared components
```

### Stack

**Desktop**: Tauri, React 19, Zustand, Tailwind CSS
**Backend**: Cloudflare Workers, Durable Objects, KV
**Media**: Cloudflare Calls SFU, WebRTC

## Deployment

### Signaling Server

```bash
cd apps/signaling

# Set secrets
npx wrangler secret put JWT_SECRET
npx wrangler secret put CLOUDFLARE_APP_SECRET

# Deploy
npx wrangler deploy -c wrangler.jsonc
```

### Desktop App

Releases are built automatically via GitHub Actions when pushing to `main`.

## Configuration

### Desktop

Create `apps/desktop/.env`:

```env
VITE_SIGNALING_SERVER_URL=https://your-worker.workers.dev
VITE_AUTH_SERVER_URL=https://auth.your-domain.com
```

### Signaling

Edit `apps/signaling/wrangler.jsonc`:

```json
{
  "vars": {
    "CLOUDFLARE_APP_ID": "your-cloudflare-calls-app-id"
  }
}
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT + Commons Clause](LICENSE)

Free to use, modify, and distribute. Commercial sale prohibited.

# CozyTube

A small Chrome extension that opens YouTube videos in a **new tab** on a normal **left click**, so the page you were browsing stays exactly where you left it.

No more middle-click gymnastics. No more losing your feed when you go back.

## The problem

YouTube opens videos in the same tab. That sounds fine until it isn’t.

You scroll the home feed, spot something interesting, click it, watch for a bit, hit back — and the feed has reshuffled. Videos you had in view are gone. The moment you wanted to return to is gone with them.

The workaround is middle-click (or Ctrl/Cmd + click) every time. It works, but it’s awkward if you do it dozens of times a day.

This extension started as a fix for that personal annoyance. If you’ve felt the same friction, it might help you too.

**[Read the full problem write-up →](docs/the-problem.md)**

## What it does

- Intercepts left clicks on YouTube video links (`/watch`, `/shorts/…`)
- Opens them in a new tab instead of navigating in place
- Leaves Ctrl/Cmd + click, Shift + click, and middle-click unchanged
- Configurable scope: home only, watch page, Shorts viewer, or off entirely

## Install (load unpacked)

1. Clone or download this repository
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

After updates: click **Reload** on the extension, then refresh any open YouTube tabs.

**[Detailed installation guide →](docs/installation.md)**

## Settings

| Option | Default | Description |
|--------|---------|-------------|
| Extension enabled | On | Master on/off switch |
| Language | English | Popup UI — 32 languages + Auto (browser) |
| Home page only | Off | Only intercept clicks on `youtube.com/` |
| Include `/watch` page | Off | Also open related/suggested videos in new tabs |
| Include Shorts viewer | Off | Also intercept while watching a Short full-screen |

All settings are in the **extension popup** — click the toolbar icon.

**[Settings reference →](docs/settings.md)**

## How it works

A content script runs on `*.youtube.com`, listens for left clicks in the capture phase (before YouTube’s SPA router), and calls `window.open()` on video links when the current page matches your settings.

```
defaults.js   shared default settings
i18n.js       popup translations (32 languages)
content.js    click interception on YouTube
background.js initializes settings on first install
popup.*       settings UI (toggle, scope, language)
```

**[Development notes →](docs/development.md)**

## Browser support

Built for **Chrome** (Manifest V3). It may work in Chromium-based browsers (Edge, Brave, etc.) when loaded as an unpacked extension, but only Chrome is actively tested.

## Contributing

Issues and pull requests are welcome. See [docs/development.md](docs/development.md) for project layout and local workflow.

## License

MIT — see [LICENSE](LICENSE).

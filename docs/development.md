# Development

## Project layout

```
yt-click/
├── manifest.json      Manifest V3 entry point
├── defaults.js        Shared default settings object
├── content.js         YouTube click interception
├── background.js      Service worker; seeds settings on install
├── popup.html/js/css  Toolbar popup (quick toggle)
├── options.html/js/css Full settings page
└── docs/              Documentation
```

## Architecture

### Content script (`content.js`)

- Injected at `document_start` on `*://*.youtube.com/*`
- Loads settings from `chrome.storage.sync` and listens to `chrome.storage.onChanged`
- Registers a **capture-phase** click listener on `document`
- On matching left clicks: `preventDefault`, stop propagation, `window.open(href, '_blank')`

Capture phase runs before YouTube’s own handlers, which is required for SPA navigation.

### Page matching (`shouldInterceptOnPage`)

Logic depends on stored settings:

1. If disabled → never intercept
2. If **home only** → only `pathname === '/'`
3. If on `/watch` → intercept only if **include watch page**
4. If on Shorts viewer → intercept only if **include Shorts viewer**
5. Otherwise → intercept on browse pages

### Video link detection (`isVideoHref`)

Matches:

- `/watch?v=…`
- `/shorts/…` (path longer than `/shorts/`)

Only same-origin YouTube URLs are considered.

### Background worker (`background.js`)

On `chrome.runtime.onInstalled`, writes any missing keys from `DEFAULT_SETTINGS` into `chrome.storage.sync`.

### Shared defaults (`defaults.js`)

Loaded by the content script (via manifest `js` array), popup, options page, and background worker (`importScripts`).

Keep this file as the single source of default values.

## Local workflow

1. Edit source files
2. `chrome://extensions` → **Reload** the extension
3. Refresh open YouTube tabs when changing `content.js` or `defaults.js`

Popup and options changes only need an extension reload, not a YouTube refresh.

## Debugging

- **Content script:** YouTube tab → DevTools → Console. Filter by the extension name or set breakpoints in the **Content scripts** section of Sources.
- **Popup / options:** Right-click inside the popup or options page → **Inspect**.
- **Service worker:** `chrome://extensions` → **Inspect views: service worker** on this extension.

## Permissions

| Permission | Why |
|------------|-----|
| `storage` | Persist user settings via `chrome.storage.sync` |

Host access is declared through `content_scripts.matches` (`*.youtube.com`), not broad host permissions.

## Possible improvements

- Chrome Web Store packaging
- Icons for the toolbar and store listing
- Optional per-site exclude list
- Keyboard shortcut to toggle enabled state

Pull requests for any of the above are welcome.

## Code style

- Vanilla JS, no build step
- Minimal scope — avoid unrelated refactors in PRs
- Match existing naming and file structure

# Development

## Project layout

```
cozytube/
├── manifest.json      Manifest V3 entry point
├── icon.png           Source artwork (regenerate sizes from this)
├── icons/             PNG icons for Chrome (16, 32, 48, 128 px)
├── defaults.js        Shared default settings object
├── i18n.js            Popup translations (32 languages)
├── content.js         YouTube click interception
├── background.js      Service worker; seeds settings on install
├── popup.html/js/css  Toolbar popup (all settings)
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

Loaded by the content script (via manifest `js` array), popup, and background worker (`importScripts`).

Keep this file as the single source of default values.

### Internationalization (`i18n.js`)

- Stores UI strings for **32 languages** in `MESSAGES`
- `language` setting: `en` (default), any supported code, or `auto`
- `auto` resolves from `navigator.language` (with locale aliases for `pt-BR`, `zh-TW`, `nb`→`no`), falling back to `en`
- RTL layout for Arabic and Hebrew (`dir="rtl"`)
- Popup uses `data-i18n` attributes; `applyTranslations()` fills them at runtime

To add a language: add a locale key to `MESSAGES` and `SUPPORTED_LANGUAGES` in `i18n.js`.

## Local workflow

1. Edit source files
2. `chrome://extensions` → **Reload** the extension
3. Refresh open YouTube tabs when changing `content.js` or `defaults.js`

Popup changes only need an extension reload, not a YouTube refresh.

## Debugging

- **Content script:** YouTube tab → DevTools → Console. Filter by the extension name or set breakpoints in the **Content scripts** section of Sources.
- **Popup:** Right-click inside the popup → **Inspect**.
- **Service worker:** `chrome://extensions` → **Inspect views: service worker** on this extension.

## Permissions

| Permission | Why |
|------------|-----|
| `storage` | Persist user settings via `chrome.storage.sync` |

Host access is declared through `content_scripts.matches` (`*.youtube.com`), not broad host permissions.

## Possible improvements

- Chrome Web Store packaging
- Optional per-site exclude list
- Keyboard shortcut to toggle enabled state

Pull requests for any of the above are welcome.

## Icons

Chrome requires **PNG** files at fixed sizes — not `.ico`.

| File | Use |
|------|-----|
| `icons/icon16.png` | Toolbar, favicon-scale |
| `icons/icon32.png` | Toolbar (HiDPI) |
| `icons/icon48.png` | Extensions management page |
| `icons/icon128.png` | Install dialog, Chrome Web Store |

Source: `icon.png` at the repo root. To regenerate after editing the artwork (PowerShell on Windows):

```powershell
$src = "icon.png"
$outDir = "icons"
Add-Type -AssemblyName System.Drawing
function Export-Icon($size) {
  $img = [System.Drawing.Image]::FromFile($src)
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $size, $size)
  $bmp.Save("$outDir/icon$size.png", [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
16,32,48,128 | ForEach-Object { Export-Icon $_ }
```

## Code style

- Vanilla JS, no build step
- Minimal scope — avoid unrelated refactors in PRs
- Match existing naming and file structure

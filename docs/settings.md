# Settings reference

Settings are stored in `chrome.storage.sync` and apply across Chrome profiles that sync extensions.

Changes take effect immediately on open YouTube tabs — no refresh required.

## Where to change settings

Click the extension icon in the Chrome toolbar. All options live in the popup — nothing opens in a new tab.

---

## Language

**Default:** English

Controls the popup UI only. YouTube itself is not affected.

| Value | UI language |
|-------|-------------|
| English | English (default) |
| … | 31 more languages — see list below |
| Auto (browser) | Matches your browser language when supported; falls back to English |

**Supported languages:** Arabic, Czech, Danish, Dutch, English, Filipino, Finnish, French, German, Greek, Hebrew, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Malay, Norwegian, Polish, Portuguese, Portuguese (Brazil), Romanian, Russian, Spanish, Swedish, Thai, Turkish, Ukrainian, Vietnamese, Chinese (Simplified), Chinese (Traditional).

To add another language, extend `MESSAGES` and `SUPPORTED_LANGUAGES` in `i18n.js`.

---

## Extension enabled

**Default:** on

Master switch. When off, the extension does nothing and YouTube behaves normally.

Use the popup to temporarily disable interception without uninstalling.

---

## Home page only

**Default:** off

When **on**, left-click interception applies **only** on `youtube.com/` (the home feed).

When **off**, interception applies on browse pages such as:

- Home
- Search results
- Subscriptions feed
- Channel video grids
- Playlists and other listing views

It still does **not** apply on `/watch` or the Shorts full-screen viewer unless you enable those options below.

When **Home page only** is on, the watch-page and Shorts options are disabled in the UI and ignored at runtime.

---

## Include `/watch` page

**Default:** off

When **on**, video links on the watch page (related videos, suggestions in the sidebar, etc.) also open in a new tab on left click.

Useful if you want to keep the current video playing while opening another.

When **off**, left click on `/watch` behaves like stock YouTube.

---

## Include Shorts viewer

**Default:** off

When **on**, left clicks on Short links while you are in the full-screen Shorts viewer (`/shorts/VIDEO_ID`) open the next Short in a new tab instead of replacing the current view.

When **off**, Shorts navigation stays default inside the viewer.

---

## Unchanged browser behavior

These are never intercepted:

| Input | Result |
|-------|--------|
| Middle-click | Browser default (typically new tab) |
| Ctrl + left click / Cmd + left click | Browser default (new tab) |
| Shift + left click | Browser default (often new window) |
| Right-click → Open in new tab | Context menu (unchanged) |

Links that already have `target="_blank"` are skipped.

---

## Default behavior summary

With factory defaults (extension on, all scope options off):

```
Home, search, subscriptions, channels  →  left click opens new tab
/watch page                            →  normal YouTube behavior
Shorts full-screen viewer              →  normal YouTube behavior
```

---

## Resetting settings

There is no in-app reset button. To restore defaults:

1. Open `chrome://extensions`
2. Find **YouTube Click → New Tab** → **Details**
3. Scroll to **Site settings** / **Storage** and clear extension data,  
   **or** remove and re-load the unpacked extension

On reinstall, `background.js` seeds missing keys from `defaults.js`.

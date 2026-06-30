# Installation

## Requirements

- Google Chrome (or a Chromium-based browser with Manifest V3 support)
- A local copy of this repository

## Load as an unpacked extension

1. **Get the code**
   - Clone: `git clone https://github.com/YOUR_USERNAME/yt-click.git`
   - Or download and extract the ZIP from GitHub

2. **Open the extensions page**
   - Navigate to `chrome://extensions`
   - Or: Chrome menu → **Extensions** → **Manage Extensions**

3. **Enable Developer mode**
   - Toggle **Developer mode** in the top-right corner

4. **Load the extension**
   - Click **Load unpacked**
   - Select the folder that contains `manifest.json` (the repo root)

5. **Confirm it is active**
   - You should see **YouTube Click → New Tab** in the list
   - Ensure the extension is enabled (toggle on)

## Pin the icon (optional)

Click the puzzle piece in Chrome’s toolbar → pin **YouTube Click → New Tab** for quick access to the on/off popup.

## After updating the code

Chrome does not hot-reload unpacked extensions when files change on disk.

1. Go to `chrome://extensions`
2. Click **Reload** on this extension
3. Refresh any tabs that already had YouTube open

Content scripts are injected when a page loads. Existing YouTube tabs need a refresh to pick up new `content.js` logic.

## Uninstall

On `chrome://extensions`, click **Remove** on the extension.

Your settings are stored in `chrome.storage.sync` and are removed with the extension.

## Chrome Web Store

This repository is distributed as source for sideloading. A Web Store listing may be added later; until then, use **Load unpacked** as described above.

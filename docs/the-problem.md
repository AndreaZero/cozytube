# The problem this extension solves

## What happens on YouTube today

When you left-click a video on YouTube — from the home feed, search results, subscriptions, or a channel page — the site navigates **in the same tab**.

That is the default behavior for almost every link on the web. YouTube is not doing anything unusual. The frustration comes from what you lose when you leave and come back.

## The feed does not wait for you

YouTube’s home feed is dynamic. It is personalized, re-ranked, and refreshed as you browse. When you open a video in the same tab:

1. You leave the feed page entirely.
2. You watch (or skim) the video.
3. You press **Back**.
4. You expect to land where you were — same scroll position, same videos in view.

Often, you don’t. The feed may reload, reorder, or replace items. Videos you noticed but had not opened yet can vanish. Your mental map of “what was on screen” breaks.

This is especially annoying when you are browsing casually: opening one video to check something, intending to continue scrolling where you left off.

## The usual workaround

Power users already know the answer:

- **Middle-click** the video → opens in a new tab, feed stays put.
- **Ctrl + click** (Windows/Linux) or **Cmd + click** (macOS) → same result.

That works perfectly. It is also easy to forget, easy to miss on a laptop trackpad, and tiring if you click through dozens of thumbnails per session.

## Why an extension

This project does one thing: make the **normal left click** behave like middle-click for YouTube video links, only where you want it.

It is a personal productivity fix first. The author built it because middle-clicking every thumbnail got old. If you have hit the same wall — losing your place on the feed, re-scrolling to find something that was right there a minute ago — this extension is for you.

## What it does *not* try to fix

- YouTube’s recommendation algorithm or feed refresh logic
- Playback, ads, or UI inside the video player
- Replacing YouTube’s built-in “Open in new tab” context menu item

It only changes **how left-click opens video links**, with settings so you can limit when that happens.

## Related scenarios

The same pattern applies beyond the home page:

| Page | What you might lose |
|------|---------------------|
| Home | Scroll position and visible recommendations |
| Search results | Result list context after back navigation |
| Subscriptions | Feed slice you were scanning |
| Channel uploads | Grid you were browsing |

By default, the extension helps on all of these “browse” pages. You can narrow it to **home only** in settings if you prefer normal behavior elsewhere.

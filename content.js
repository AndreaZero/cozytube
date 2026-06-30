(function () {
  "use strict";

  let settings = { ...DEFAULT_SETTINGS };

  chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
    settings = items;
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    for (const key of Object.keys(changes)) {
      if (key in DEFAULT_SETTINGS) {
        settings[key] = changes[key].newValue;
      }
    }
  });

  function shouldInterceptOnPage() {
    if (!settings.enabled) return false;

    const path = location.pathname;
    const isHome = path === "/" || path === "";
    const isWatch = path === "/watch";
    const isShortsViewer = path.startsWith("/shorts/") && path.length > "/shorts/".length;

    if (settings.homeOnly) return isHome;
    if (isWatch) return settings.includeWatchPage;
    if (isShortsViewer) return settings.includeShortsViewer;

    return true;
  }

  function isVideoHref(href) {
    if (!href) return false;
    try {
      const url = new URL(href, location.origin);
      const host = url.hostname.replace(/^www\./, "");
      if (host !== "youtube.com" && !host.endsWith(".youtube.com")) return false;

      if (url.pathname === "/watch" && url.searchParams.has("v")) return true;
      if (url.pathname.startsWith("/shorts/") && url.pathname.length > "/shorts/".length) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function findVideoAnchor(target) {
    const anchor = target.closest("a[href]");
    if (!anchor || anchor.target === "_blank") return null;
    return isVideoHref(anchor.href) ? anchor : null;
  }

  document.addEventListener(
    "click",
    (event) => {
      if (!shouldInterceptOnPage()) return;
      if (event.button !== 0) return;
      if (event.defaultPrevented) return;
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

      const anchor = findVideoAnchor(event.target);
      if (!anchor) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      window.open(anchor.href, "_blank", "noopener,noreferrer");
    },
    true
  );
})();

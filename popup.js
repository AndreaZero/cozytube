const enabledInput = document.getElementById("enabled");
const statusEl = document.getElementById("status");
const openOptionsLink = document.getElementById("open-options");

function showStatus(message) {
  statusEl.textContent = message;
  statusEl.hidden = false;
  window.setTimeout(() => {
    statusEl.hidden = true;
  }, 1200);
}

chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
  enabledInput.checked = items.enabled;
});

enabledInput.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: enabledInput.checked }, () => {
    showStatus(enabledInput.checked ? "Attivata" : "Disattivata");
  });
});

openOptionsLink.addEventListener("click", (event) => {
  event.preventDefault();
  chrome.runtime.openOptionsPage();
});

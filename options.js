const fields = {
  enabled: document.getElementById("enabled"),
  homeOnly: document.getElementById("homeOnly"),
  includeWatchPage: document.getElementById("includeWatchPage"),
  includeShortsViewer: document.getElementById("includeShortsViewer"),
};

const savedEl = document.getElementById("saved");
let saveTimer;

function updateDependentFields() {
  const homeOnly = fields.homeOnly.checked;
  fields.includeWatchPage.disabled = homeOnly;
  fields.includeShortsViewer.disabled = homeOnly;
}

function readForm() {
  return {
    enabled: fields.enabled.checked,
    homeOnly: fields.homeOnly.checked,
    includeWatchPage: fields.includeWatchPage.checked,
    includeShortsViewer: fields.includeShortsViewer.checked,
  };
}

function writeForm(items) {
  for (const key of Object.keys(fields)) {
    fields[key].checked = Boolean(items[key]);
  }
  updateDependentFields();
}

function showSaved() {
  savedEl.hidden = false;
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    savedEl.hidden = true;
  }, 1500);
}

function save() {
  updateDependentFields();
  chrome.storage.sync.set(readForm(), showSaved);
}

chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
  writeForm(items);
});

for (const input of Object.values(fields)) {
  input.addEventListener("change", save);
}

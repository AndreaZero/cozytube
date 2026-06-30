const fields = {
  enabled: document.getElementById("enabled"),
  homeOnly: document.getElementById("homeOnly"),
  includeWatchPage: document.getElementById("includeWatchPage"),
  includeShortsViewer: document.getElementById("includeShortsViewer"),
};

const languageSelect = document.getElementById("language");
const savedEl = document.getElementById("saved");
let saveTimer;

function updateDependentFields() {
  const homeOnly = fields.homeOnly.checked;
  fields.includeWatchPage.disabled = homeOnly;
  fields.includeShortsViewer.disabled = homeOnly;

  fields.includeWatchPage.closest(".field").classList.toggle("field-disabled", homeOnly);
  fields.includeShortsViewer.closest(".field").classList.toggle("field-disabled", homeOnly);
}

function readForm() {
  return {
    enabled: fields.enabled.checked,
    homeOnly: fields.homeOnly.checked,
    includeWatchPage: fields.includeWatchPage.checked,
    includeShortsViewer: fields.includeShortsViewer.checked,
    language: languageSelect.value,
  };
}

function writeForm(items) {
  for (const key of Object.keys(fields)) {
    fields[key].checked = Boolean(items[key]);
  }
  updateDependentFields();
}

function applyLanguage(storedLanguage) {
  const lang = I18N.resolveLanguage(storedLanguage);
  I18N.applyTranslations(lang);
  I18N.populateLanguageSelect(languageSelect, storedLanguage, lang);
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
  const form = readForm();
  chrome.storage.sync.set(form, () => {
    applyLanguage(form.language);
    showSaved();
  });
}

I18N.init((_lang, items) => {
  writeForm(items);
  I18N.populateLanguageSelect(languageSelect, items.language, I18N.getCurrentLang());
});

languageSelect.addEventListener("change", save);

for (const input of Object.values(fields)) {
  input.addEventListener("change", save);
}

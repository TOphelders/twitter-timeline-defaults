const DEFAULTS = {
  follow: true,
  hide: false,
  blockPromo: false,
};

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    follow: document.querySelector("#follow").checked,
    hide: document.querySelector("#hide").checked,
    blockPromo: document.querySelector("#blockPromo").checked,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#follow").checked = result.follow;
    document.querySelector("#hide").checked = result.hide;
    document.querySelector("#blockPromo").checked = result.blockPromo;
  }

  function onError(error) {
    console.error(`Error: ${error}`);
  }

  const getting = browser.storage.sync.get(DEFAULTS);
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#follow").addEventListener("change", saveOptions);
document.querySelector("#hide").addEventListener("change", saveOptions);
document.querySelector("#blockPromo").addEventListener("change", saveOptions);

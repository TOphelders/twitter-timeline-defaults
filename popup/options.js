const DEFAULTS = {
  follow: true,
  hide: false,
  hideSidebar: false,
  blockPromo: false,
};

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    follow: document.querySelector("#follow").checked,
    hide: document.querySelector("#hide").checked,
    hideSidebar: document.querySelector("#hideSidebar").checked,
    blockPromo: document.querySelector("#blockPromo").checked,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#follow").checked = result.follow;
    document.querySelector("#hide").checked = result.hide;
    document.querySelector("#hideSidebar").checked = result.hideSidebar;
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
document.querySelector("#hideSidebar").addEventListener("change", saveOptions);
document.querySelector("#blockPromo").addEventListener("change", saveOptions);

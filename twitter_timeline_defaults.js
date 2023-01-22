function getElementsByText(str, tag = "a") {
  return Array.prototype.slice.call(document.getElementsByTagName(tag))
    .filter(el => el.textContent.trim() === str.trim());
};

function hideTab() {
  const following = getElementsByText("Following", "span");
  if (!following.length) {
    console.error("Unable to find For you/Following tab");
    return;
  }

  const nav = following[0]
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement;

  nav.style.display = "none";
};

function setForYou() {
  const forYou = getElementsByText("For you", "span");
  if (!forYou.length) {
    console.error("Unable to switch to For you tab");
    return;
  }

  const button = forYou[0].parentElement.parentElement.parentElement;
  button.click();
};

function setFollowing() {
  const following = getElementsByText("Following", "span");
  if (!following.length) {
    console.error("Unable to switch to Following tab");
    return;
  }

  const button = following[0].parentElement.parentElement.parentElement;
  button.click();
};

window.setTimeout(() => {
  const getting = browser.storage.sync.get(["follow", "hide"]);
  getting.then((result) => {
    result.follow && setFollowing();
    result.hide && hideTab();
  }, (e) => { console.error(e) });
}, 200);

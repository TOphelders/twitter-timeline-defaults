function getElementsByText(str, tag = "a") {
  return Array.prototype.slice.call(document.getElementsByTagName(tag))
    .filter(el => el.textContent.trim() === str.trim());
};

// https://stackoverflow.com/questions/34863788/how-to-check-if-an-element-has-been-loaded-on-a-page-before-running-a-script
function waitForElement(queryFunction, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;

    if (queryFunction().length) {
      return resolve();
    }

    const observer = new MutationObserver(() => {
      if (queryFunction().length) {
        observer.disconnect();
        timer && clearTimeout(timer);
        return resolve();
      }
    });

    const config = { subtree: true, childList: true };
    observer.observe(document.body, config);

    if (timeout) {
      timer = setTimeout(() => {
        observer.disconnect();
        reject();
      }, timeout);
    }
  });
}

/*
*  Call a function on navigation to pages in the locations array
*  @param {() => void} callback  - function to be called on page navigation
*  @param {[String]}   locations - list of locations to trigger callback
*/
function watchLocations(callback, locations) {
  let locationRef = window.location.href;

  const observer = new MutationObserver(() => {
    if (window.location.href !== locationRef) {
      locationRef = window.location.href;
      if (locations.includes(locationRef)) callback();
    }
  });

  const config = { subtree: true, childList: true };
  observer.observe(document, config);
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

const HOME_HREFS = ["https://twitter.com/home", "http://twitter.com/home", "twitter.com/home"];
const DEFAULTS = {
  follow: true,
  hide: false,
  blockPromo: false,
};

function main() {
  const getting = browser.storage.sync.get(DEFAULTS);
  getting.then((result) => {
    waitForElement(() => getElementsByText("Following", "span"), 10000).then(() => {
      result.follow && setFollowing();
      result.hide && hideTab();
    }).catch(() => {
      console.log("Twitter Timeline Defaults: Unable to find For you / Following tab");
    })
  }, (e) => {
    console.error(`Twitter Timeline Defaults: ${e}`);
  });
};

if (HOME_HREFS.includes(window.location.href)) main();
watchLocations(main, HOME_HREFS);

/*!
 * Night mode toggle for Charlie'z personal site.
 * Applies a `night-mode` class on <html> and remembers the choice
 * in localStorage. Falls back to the OS preference on first visit.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "charliez-night-mode";

  function systemPrefersDark() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function readStored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeStored(enabled) {
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch (e) {
      /* storage unavailable (e.g. private mode) - ignore */
    }
  }

  function apply(enabled) {
    var root = document.documentElement;
    if (enabled) {
      root.classList.add("night-mode");
    } else {
      root.classList.remove("night-mode");
    }
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.checked = enabled;
    }
  }

  // Resolve the initial state and apply it immediately to avoid a flash.
  var stored = readStored();
  var enabled = stored === null ? systemPrefersDark() : stored === "1";
  apply(enabled);

  function init() {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) {
      return;
    }
    toggle.checked = enabled;
    toggle.addEventListener("change", function () {
      enabled = toggle.checked;
      apply(enabled);
      writeStored(enabled);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

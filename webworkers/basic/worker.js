/*
 * worker.js
 * Copyleft (ↄ) 2020 jkirchartz <me@jkirchartz.com>
 *
 * Distributed under terms of the NPL (Necessary Public License) license.
 */
onmessage = function (e) {
  console.log("worker onmessage", e);
  console.log("worker data:", e.data);
  console.log("waiting 3 seconds to complete");
  setTimeout(function() { postMessage("done"); }, 3000);
}


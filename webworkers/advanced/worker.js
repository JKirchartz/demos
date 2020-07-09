/*
 * worker.js
 * Copyleft (ↄ) 2020 jkirchartz <me@jkirchartz.com>
 *
 * Distributed under terms of the NPL (Necessary Public License) license.
 */


hashCode = function(str) {
  return new Promise(resolve => {
    setTimeout(()=>{
      var hash = 0;
      if (str.length == 0) {
          return hash;
      }
      for (var i = 0; i < str.length; i++) {
          var char = str.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
      }
      resolve(hash);
    }, 3000, resolve);
  });
}

onmessage = function (e) {
  console.log("worker onmessage", e);
  console.log("worker data:", e.data);
  var reader = new FileReader();
  reader.onload = function (data) {
    hashCode(this.result).then((hash) => {
      postMessage(e.data.name + " :: " + new Date(e.data.lastModified) + " :: " + hash);
    })
  }
  reader.readAsBinaryString(e.data)
}


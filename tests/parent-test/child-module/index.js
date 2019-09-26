module.exports = function() {
  let p = require('path');
  // the module.parent contains information about the file this is called from, unfortunately it doesn't directly contain package.json information so we'll have to find it ourselves
  let pkgPath = p.join(p.dirname(module.parent.filename), "package.json");
  // dynamically require the root package
  let rootPackage = require(pkgPath);
  // prove that we got the parent's package.json
  console.log(rootPackage.parentMessage);
  console.log(rootPackage.parentMessage.replace("parent package.json", "child module, modified from the message in parent package.json"));
}
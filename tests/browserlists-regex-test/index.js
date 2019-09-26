require('colors');
const BUR = require("browserslist-useragent-regexp");
const jsdiff = require('diff');

const def = String(BUR.getUserAgentRegExp({}));
const pkg = String(BUR.getUserAgentRegExp({ browsers: require('./package.json').browserslist }));

var diff = jsdiff.diffChars(def, pkg);

diff.forEach(function (part) {
    // green for additions, red for deletions
    // grey for common parts
    var color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
    process.stderr.write(part.value[color]);
});

console.log("\n\nsupplying package.json returns same regex as {}?", def == pkg);
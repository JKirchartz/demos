import { Terminal } from './node_modules/xterm/dist/xterm';
import { webLinks } from 'xterm-addon-web-links';
import { fit } from 'xterm-addon-fit';

// see https://codercat.tk/terminal-prints.html for inspiration
const xterm = new Terminal();  // Instantiate the terminal
let command = ""; // is there a better way to collect commands than char-by-char?
let history = [];
xterm.loadAddon(new webLinks());
xterm.loadAddon(fit);
xterm.open(document.getElementById('terminal'));
xterm.fit();
xterm.prompt = () => {
  xterm.write('\r\n$> ');
};
xterm.writeln('Welcome to JKirchartz.com');
xterm.writeln('type \"help\" for more information');
xterm.prompt();

xterm.on('key', (key, ev) => {
  const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
  console.log(xterm);
  if (ev.keyCode === 13) {
    runCommand(command);
    xterm.prompt();
    command = "";
  } else if (ev.keyCode === 8) {
    // Do not delete the prompt
    if (xterm._core.buffer.x > 2) {
      xterm.write('\b \b');
    }
  } else if (printable) {
    command += key;
    xterm.write(key);
  }
});

xterm.on('paste', function(data) {
  xterm.write(data);
  command += data;
});

const runCommand = (command) => {
  xterm.writeln("");
  if (command === "help") {
    xterm.writeln("this doesn't do anything yet - check back soon!");
    return;
  }
  return command + " unknown!"
};



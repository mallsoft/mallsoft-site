import { goto } from '$app/navigation';
import { writable } from 'svelte/store';
import { commands } from './commands';

function createLineStore(maxLen?: number) {
  const { set, update, subscribe } = writable([]);
  const write = (v: string[] | string) => {
    update((n) => {
      return Array.isArray(v) ? [...n, ...v] : [...n, v].slice(-maxLen);
    });
  };
  const clear = () => {
    set([]);
  };
  return {
    subscribe,
    write,
    clear
  };
}

const history = createLineStore(10);
const lines = createLineStore();

let bad = 0;
const bad_lines = [
  // thought this was the thing that tagget template literals was supposed to fix??
  (name) => `command "${name}" not recognized`,
  (name) => `idk what "${name}" is supposed to do...`,
  (name) => `command "${name}" not recognized!!!`,
  (name) => `this is hard huh?`,
  (name) => `migh as well give up then...`,
  (name) => `imma be straight, your not doing great`,
  (name) => `*you're`,
  (name) => `Ok soo imma just say this...type HELP`,
  (name) => `😑`,
  (name) => `Can't do that huh? I will google how to use a command line for you if you don't...`,
  (name) => {
    setTimeout(() => {
      goto('https://letmegooglethat.com/?q=I+am+stupid+and+cant+use+%20a+terminal');
    }, 1500);
    return `ok here we go...`;
  }
];

function run(str: string) {
  if (!str) return lines.write('');
  const input = str.trim();

  history.write(input);

  const matches = input.match(/(^\w+)(?:$| )(.*)?/i);
  if (!matches || !matches.length) return lines.write([str, 'Invalid command!']);

  const [_, NAME, rest] = matches;
  const name = NAME.toLocaleLowerCase();

  const command = commands.find((c) => c.name === name);

  if (!command) {
    return lines.write(bad_lines[bad <= bad_lines.length ? bad++ : 0](name));
  }

  bad = 0;

  if (!command.cb(rest)) {
    lines.write('what? ' + rest);
  }
}

export { lines, history, run };

import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { history, lines } from './terminus';

class Command {
  constructor(
    public name: string,
    public cb: (param: string) => boolean,
    public help: {
      short: string;
      long?: string[] | null;
    }
  ) {
    Command.commands.push(this);
  }
  static commands = [];
}

export const commands = Command.commands;

new Command(
  'help',
  (param) => {
    if (param) {
      const [_, p] = param.match(/(^\w+)/);
      const command = commands.find((c) => c.name === p);

      if (!p) lines.write('Huh ' + p);
      if (!command) {
        lines.write(`No commant matches "${p}"`);
      } else {
        const txt = command.help.long ? command.help.long : command.help.short;
        lines.write('');
        lines.write(p);
        lines.write(txt);
        lines.write('');
      }
    } else {
      const hlep = commands.find((c) => c.name === 'help');
      lines.write(['--- HELP ---', ...hlep.help.long, '']);

      commands.forEach((c) => {
        lines.write(c.name + ' - ' + c.help.short);
      });
    }
    return true;
  },
  {
    short: 'Prints this message',
    long: ['To get specifics on a command', 'use help <command>']
  }
);

new Command(
  'to',
  (param) => {
    if (!param) {
      lines.write('missing param "route", use "to <route>".');
      return;
    }

    const validRoute = ['about', 'stuff', 'contact'];
    const r = param.trim();
    if (validRoute.includes(r)) {
      lines.write(`navigatig to => "${r}".`);
      goto(r);
      return true;
    } else {
      lines.write(`Invalid route "${r}"`);
      return true;
    }
  },
  {
    short: 'Navigates to <route>',
    long: ['TO <route> command navigates to valid routes', '-> about / stuff / contact ']
  }
);

new Command(
  'clear',
  () => {
    lines.clear();
    lines.write('console cleared, exept this message 🤣');
    return true;
  },
  { short: 'Clears console' }
);

new Command(
  'history',
  (param) => {
    const entries = get(history);
    if (!param) {
      lines.write(entries.length + ' entries');
      lines.write(entries.map((entry) => `-> ${entry}`));
      return true;
    }

    if (param.match(/^-c$/)) {
      history.clear();
      lines.write('History cleared!');
      return true;
    }

    return false;
  },
  { short: 'Shows command history', long: ['Show history', '-c Clears entries in history'] }
);

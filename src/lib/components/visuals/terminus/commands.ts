import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { history, lines } from './terminus';

import { confett } from '$lib/components/visuals/Confettu.svelte';

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
  static commands: Command[] = [];
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
        lines.write(['', p, txt, '']);
      }
    } else {
      const hlep = commands.find((c) => c.name === 'help');
      lines.write(['--- HELP ---', ...hlep.help.long]);

      commands
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((c) => {
          lines.write(`${c.name.padEnd(10, ' ')} ${c.help.short}`);
        });
    }
    return true;
  },
  {
    short: 'Prints this message',
    long: ['help <command> for specifics']
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

new Command(
  'req',
  (param) => {
    const timeSent = Date.now();
    fetch('/api/info')
      .then((res) => res.json())
      .then((data) => {
        const roundTrip = Date.now() - timeSent;
        lines.write([
          `${data.agent.toLocaleLowerCase()} ${data.platform} ${data.os} [${
            data.ip
          }] / ${roundTrip}ms`
        ]);
      })
      .catch((e) => {
        lines.write('error: Request failed failed');
      });

    return true;
  },
  {
    short: 'Request info',
    long: ['Client request timing and (os/platform/client/adress) info']
  }
);

new Command(
  'confetti',
  () => {
    confett();
    lines.write('Confetti time! 🎊');
    return true;
  },
  {
    short: 'confetti   ¯\\_(ツ)_/¯',
    long: [`Sprinkles happy`]
  }
);

new Command(
  'stats',
  () => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        const keys = Object.keys(data[0]);

        const values = Object.values(data);

        const columnIsFinite = keys.map((k) => values.every((v) => isFinite(v[k])));
        const columnWidths = keys.map((k) =>
          Math.max(k.length, ...values.map((row) => String(row[k]).length))
        );

        const head = keys.map((key, idx) => key.padEnd(columnWidths[idx])).join(' | ');
        const middleLine = columnWidths.map((w) => '-'.repeat(w)).join('-|-');
        const body = values.flatMap((row) =>
          keys
            .map((k, idx) =>
              columnIsFinite[idx]
                ? String(row[k]).padStart(columnWidths[idx], ' ')
                : String(row[k]).padEnd(columnWidths[idx], ' ')
            )
            .join(' | ')
        );

        lines.write(head);
        setTimeout(() => {
          lines.write(middleLine);
          body.forEach((line, idx) => {
            setTimeout(() => lines.write(line), 20 * idx);
          });
        }, 150);
      });
    return true;
  },
  {
    short: 'Achivementlytics',
    long: ['Shows stats', 'Achivements, navigations, etc..']
  }
);

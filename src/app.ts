import {fetchXKCD} from './xkcd';
import {defaultMessage, postMessage} from './message';
import {mutate} from './mutate';
import {lock} from './lock';
import * as yargs from 'yargs';

async function tick(lockfile : string, token : string, channel : string, user? : string, avatar? : string) {
    let info = await fetchXKCD();
    let newer = await lock(lockfile, info.num);
    if (newer) {
        let message = defaultMessage(token, channel, user, avatar);
        let mutated = mutate(info, message);
        await postMessage(mutated);
    }
}

async function main(args : any) {
    tick(args.l, args.t, args.c, args.n, args.a);

    if(args.w) {
        setInterval(tick, 1000 * 60 * 30, args.l, args.t, args.c, args.n, args.a)
    }
}

let args = yargs
    .option('l', {
        alias: 'lock',
        default: './xkcd.lock',
        describe: 'bot lock file',
        type: 'string',
    })
    .option('t', {
        alias: 'token',
        demand: true,
        describe: 'slack API token',
        type: 'string',
    })
    .option('c', {
        alias: 'channel',
        demand: true,
        describe: 'slack channel to post in',
        type: 'string',
    })
    .option('n', {
        alias: 'name',
        default: 'xkcd',
        describe: 'bot name in channel',
        type: 'string',
    })
    .option('a', {
        alias: 'avatar',
        default: 'https://imgs.xkcd.com/static/terrible_small_logo.png',
        describe: 'bot avatar url',
        type: 'string',
    })
    .option('w', {
        alias: 'watch',
        default: false,
        describe: 'watch for changes',
        type: 'boolean',
    })
    .help()
    .argv;

main(args);
import {readFile, writeFile, stat} from 'fs';

function readLock(path : string) : Promise<number> {
    return new Promise<number>((res, rej) => {
        readFile(path, 'utf8', (err, data) => {
            if(err) {
                if (err.code == 'ENOENT') {
                    res(0);
                } else {
                    rej(err);
                }
            }else {
                let num = parseInt(data);
                res(num);
            }
        })
    });
}

function writeLock(path : string, num : number) : Promise<void>{
    return new Promise<void>((res, rej) => {
        writeFile(path, `${num}`, (err) => {
            if (err) {
                rej(err);
            } else {
                res();
            }
        });
    });
}

export async function lock(path : string, num? : number) : Promise<boolean> {
    let current = await readLock(path);

    if (num && num > current) {
        await writeLock(path, num);
        return true;
    } else {
        return false;
    }
}
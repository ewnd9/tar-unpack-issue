'use strict';

const fs = require('fs');
const tar = require('tar');
const { execSync } = require('child_process');

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  execSync('rm -rf demo-out && mkdir demo-out');
  // 31745 is breaking;
  writeFile(Number(process.argv[2]));

  await run();
  await run();
}

async function run(opts = {}) {
  await wait(
    tar
      .c(
        {
          strict: opts.strict,
          gzip: true,
          cwd: process.cwd(),
        },
        [`demo-in`]
      )
      .pipe(fs.createWriteStream('arch.tgz'))
  );

  await wait(
    fs.createReadStream('arch.tgz').pipe(
      tar.x({
        strict: opts.strict,
        cwd: 'demo-out',
      })
    )
  );

  console.log('complete');
}

function writeFile(len) {
  execSync('rm -rf demo-in && mkdir demo-in');

  const path = 'demo-in/input.txt';
  const output = new Array(len).fill('0').join('');

  fs.writeFileSync(path, output);
  execSync(`chmod 444 ${path}`);

  console.log(`${len} written in ${path}`);
}

async function wait(stream) {
  return new Promise((resolve, reject) => {
    stream
      .on('close', () => {
        resolve();
      })
      .on('warn', (msg, error) => {
        // console.error(msg, error);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

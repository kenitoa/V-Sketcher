const readline = require('node:readline');
const mode = process.argv[2];
readline.createInterface({ input: process.stdin }).on('line', line => {
  const { operation, ...identity } = JSON.parse(line);
  if (mode === 'malformed') { process.stdout.write('{bad\n'); return; }
  if (operation === 'ping') {
    process.stderr.write('private-worker-path-and-token');
    process.stdout.write(JSON.stringify({ ...identity, revision: identity.revision + 1, ok: true, result: { unexpected: true } }) + '\n');
  }
  process.stdout.write(JSON.stringify({ ...identity, ok: true, result: { workerVersion: '0.1.0' } }) + '\n', () => {
    if (operation === 'shutdown') process.exit(0);
  });
});

const readline = require('node:readline');
readline.createInterface({ input:process.stdin }).once('line',line => {
  const request = JSON.parse(line);
  if (process.argv[2] === 'hang') { setInterval(() => {},1000); return; }
  if (process.argv[2] === 'bad') request.identity.generation++;
  process.stdout.write(JSON.stringify({ identity:request.identity,value:{ inputRevision:request.inputRevision } }));
  process.exitCode = 0;
});

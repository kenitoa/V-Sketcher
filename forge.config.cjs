module.exports = {
  packagerConfig: {
    asar: true,
    executableName: '2DSketcher',
    prune: true,
    extraResource: ['.local/build/worker', 'dist/notices', 'dist/release'],
    ignore: (path) =>
      path !== '' &&
      !/^\/(dist|node_modules)(\/|$)/.test(path) &&
      !/^\/(package\.json|LICENSE|NOTICE\.md)$/.test(path),
  },
  makers: [{ name: '@electron-forge/maker-zip', platforms: ['win32'] }],
  hooks: {
    postPackage: async (_config, result) => {
      const { copyFileSync } = require('node:fs'),
        { join } = require('node:path');
      for (const path of result.outputPaths)
        copyFileSync('dist/release/START-HERE.txt', join(path, 'START-HERE.txt'));
    },
  },
};

module.exports = {
  packagerConfig: {
    asar: true, executableName: '2DSketcher', prune: true,
    extraResource: ['.local/build/worker', 'dist/notices'],
    ignore: (path) => path !== '' && !/^\/(dist|node_modules)(\/|$)/.test(path) && !/^\/(package\.json|LICENSE|NOTICE\.md)$/.test(path)
  },
  makers: [{ name: '@electron-forge/maker-zip', platforms: ['win32'] }]
};

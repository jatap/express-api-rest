module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  retainLines: true,
  sourceMaps: 'inline',
  ignore: ['node_modules', '.compiled'],
};

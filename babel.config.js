module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: [
              'last 2 major versions',
              'not dead',
            ],
          },
          useBuiltIns: 'usage',
          corejs: '3',
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        }
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ]
  }
}
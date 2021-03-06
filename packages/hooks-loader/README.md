# @midwayjs/hooks-loader

The Webpack Loader for integrated calls, which converts calls to backend Api from code into frontend SDK calls.

> [中文文档](./README.zh-cn.md)

## Version Requirements

- Webpack 4+

## Usage

### Webpack Chain

```typescript
function useWebpackChain(config) {
  const MidwayHooksLoader = require.resolve('@midwayjs/hooks-loader')
  ;['jsx', 'tsx'].forEach((type) => {
    config.module.rule(type).use('midway-hooks').loader(MidwayHooksLoader)
  })
  return config
}
```

### react-app-rewired

```typescript
module.exports = {
  webpack: function (config, env) {
    config.module.rules.unshift({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: [
        {
          loader: require.resolve('@midwayjs/hooks-loader'),
        },
      ],
    })

    return config
  },
}
```

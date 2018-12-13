[![github tag](https://img.shields.io/github/tag/d3dc/babel-plugin-pipe-backward.svg?maxAge=2592000)]()
[![npm version](https://badge.fury.io/js/babel-plugin-pipe-backward.svg)](https://badge.fury.io/js/babel-plugin-pipe-backward)
[![npm license](https://img.shields.io/npm/l/babel-plugin-pipe-backward.svg?maxAge=2592000)]()
[![build status](https://travis-ci.org/d3dc/babel-plugin-pipe-backward.svg?branch=master)](https://travis-ci.org/d3dc/babel-plugin-pipe-backward)
[![known vulnerabilities](https://snyk.io/test/npm/babel-plugin-pipe-backward/badge.svg)](https://snyk.io/test/npm/babel-plugin-pipe-backward)

# babel-plugin-pipe-backward

Add F# like pipe backward behavior with `<|`

This mirrors the existing proposed pipeline operator allowing for some great syntax.

From [an issue on the forward pipeline operator](https://github.com/tc39/proposal-pipeline-operator/issues/3#issuecomment-317105736)

> ```js
> const add = a => b => b + a
> const mul = a => b => b * a
> const div = a => b => b / a
> ```
>
> instead of writing this
>
> ```js
> const f2c = x => div(9)(mul(5)(add(-32)(x)))
> ```
>
> We could just write
>
> ```js
> const f2c = x => div(9) <| mul(5) <| add(-32) <| x
> ```
>
> In chaining together data processing `pipe` is more natural, include the example I gave here.
>
> ```js
> const f2c = x => x |> add(-32) |> mul(5) |> div(9)
> ```
>
> Whereas when dealing with embedded components like those in react, `compose` is more natural than `pipe`, i.e.
>
> ```js
> const updateSiteCart = template <| page <| cart
> ```
>
> ```
> <template>
>   <page>
>     <cart />
>   </page>
> </template>
> ```

## Installation

```sh
$ npm install --save-dev babel-plugin-pipe-backward
```

## Usage

### Via `.babelrc` (Recommended)

```json
{
  "plugins": ["pipe-backward"]
}
```

### Via CLI

```sh
$ babel --plugins pipe-backward script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['pipe-backward'],
})
```

# License

MIT

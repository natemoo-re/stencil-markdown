# stencil-markdown

This package allows you to import the content of a Markdown file into Stencil Components.

Under the hood, it converts your Markdown to JSX.


First, npm install within the project:

```
npm install stencil-markdown --save-dev
```

Next, within the project's `stencil.config.js` file, import the plugin and add it to the config's `plugins` config:

#### stencil.config.ts
```ts
import { Config } from '@stencil/core';
import { markdown } from 'stencil-markdown';

export const config: Config = {
  plugins: [
    makdown()
  ]
};
```

During development, this plugin will kick-in for **explicitly imported** `.md` or `.markdown` files, and convert them to JSX.


## Options

Marked options can be passed to the plugin within `stencil.config.js`, which are used directly by `marked`. Please reference [marked documentation](https://www.npmjs.com/package/marked) for all available options.


## Related

* [marked](https://www.npmjs.com/package/marked)
* [@stencil/sass](https://www.npmjs.com/package/@stencil/sass)
* [Stencil](https://stenciljs.com/)
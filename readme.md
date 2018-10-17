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
    markdown()
  ]
};
```

During development, this plugin will kick-in for **explicitly imported** `.md` or `.markdown` files, and convert them to a FunctionalComponent.

#### my-component.ts
```tsx
import { Component } from '@stencil/core';
import Content from '../../docs/hello-world.md';

@Component({
  tag: 'my-component'
})
export class MyComponent {
  render() {
    return (
      <div>
        <Content/>
      </div>
    )
  }
}
```

In order to allow Typescript to import .md or .markdown files, please add the following file to your project in the `src/` directory.
#### index.d.ts
```ts
import 'stencil-markdown';
```

## Frontmatter
Stencil Markdown parses YAML Frontmatter—no configuration needed.

#### hello-world.md
```md
---
title: Hello world!
---
## Hey, world!
```



#### my-component.ts
```tsx
import { Component } from '@stencil/core';
import Content, { frontmatter } from '../../docs/hello-world.md';

@Component({
  tag: 'my-component'
})
export class MyComponent {

  componentWillLoad() {
    console.log(frontmatter);
  }
  
  render() {
    return (
      <div>
        <Content/>
      </div>
    )
  }
}
```

## Options

Marked options can be passed to the plugin within `stencil.config.js`, which are used directly by `marked`. Please reference [marked documentation](https://www.npmjs.com/package/marked) for all available options.


## Related

* [marked](https://www.npmjs.com/package/marked)
* [@stencil/sass](https://www.npmjs.com/package/@stencil/sass)
* [Stencil](https://stenciljs.com/)

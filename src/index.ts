import * as ts from 'typescript';
import * as marked from 'marked';
import frontmatter from 'frontmatter';
import * as d from './declarations';
import * as util from './util';

export { MarkdownFile } from './declarations';
export function markdown(_opts: d.PluginOptions = {}): d.Plugin {
  return {
    name: 'markdown',
    transform(sourceText: string, fileName: string) {
      if (!util.usePlugin(fileName)) { return null; }

      const fileId = util.createResultsId(fileName);
      const parsedMarkdown = frontmatter(sourceText);
      const data = parsedMarkdown.data || null;
      const content = marked.parse(parsedMarkdown.content);

      const file = `export const data = ${JSON.stringify(data)}
export const { vchildren: content } = (() => (
  <div>
    ${content}
  </div>)
)();
export default content;`;

      const code = ts.transpileModule(file, {
        compilerOptions: {
          jsx: ts.JsxEmit.React,
          jsxFactory: 'h',
          module: ts.ModuleKind.ES2015,
          target: ts.ScriptTarget.ESNext
        }
      }).outputText;

      const results: d.PluginTransformResults = { id: fileId, code };

      return Promise.resolve(results);
    }
  };
}

import * as d from './declarations';
import * as ts from 'typescript';
import { MarkedOptions } from 'marked';
// import * as path from 'path';


export function usePlugin(fileName: string) {
  return /(\.md|\.markdown)$/i.test(fileName);
}

export function getTSXOutput({ data, content }: { data: any, content: string }) {
  const file = `export const frontmatter = ${JSON.stringify(data)};
export const { vchildren: content } = (() => (
  <div>
    ${content}
  </div>)
)();
export default () => content;`;

  const tsModule = ts.transpileModule(file, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      jsxFactory: 'h',
      module: ts.ModuleKind.ES2015,
      target: ts.ScriptTarget.ESNext
    }
  });

  return tsModule.outputText;
}


export function getRenderOptions(opts: d.PluginOptions): MarkedOptions {
  // create a copy of the original sass config so we don't change it
  const renderOpts = Object.assign({}, opts);
  return renderOpts;
}


export function createResultsId(fileName: string) {
  const pathParts = fileName.split('.');
  pathParts[pathParts.length - 1] = 'js';
  return pathParts.join('.');
}

export function normalizePath(str: string) {
  // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
  // https://github.com/sindresorhus/slash MIT
  // By Sindre Sorhus
  if (typeof str !== 'string') {
    throw new Error(`invalid path to normalize`);
  }
  str = str.trim();

  if (EXTENDED_PATH_REGEX.test(str) || NON_ASCII_REGEX.test(str)) {
    return str;
  }

  str = str.replace(SLASH_REGEX, '/');

  // always remove the trailing /
  // this makes our file cache look ups consistent
  if (str.charAt(str.length - 1) === '/') {
    const colonIndex = str.indexOf(':');
    if (colonIndex > -1) {
      if (colonIndex < str.length - 2) {
        str = str.substring(0, str.length - 1);
      }

    } else if (str.length > 1) {
      str = str.substring(0, str.length - 1);
    }
  }

  return str;
}

const EXTENDED_PATH_REGEX = /^\\\\\?\\/;
const NON_ASCII_REGEX = /[^\x00-\x80]+/;
const SLASH_REGEX = /\\/g;

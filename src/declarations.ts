import { MarkedOptions } from 'marked';

export interface MarkdownFile {
  headers: { text: string, level: number, id: string }[];
  content: any;
}

export interface Plugin {
  load?: (id: string, context?: PluginCtx) => Promise<string>;
  name: string;
  resolveId?: (importee: string, importer: string, context?: PluginCtx) => Promise<string>;
  transform?: (sourceText: string, id: string, context: PluginCtx) => Promise<PluginTransformResults>;
}

export interface MarkedTransform {
  src?: string;
  dest?: string;
}

export interface PluginOptions extends MarkedOptions {
  transform?: MarkedTransform[];
}

export interface PluginTransformResults {
  code?: string;
  id?: string;
}

export interface PluginCtx {
  config: {
    rootDir?: string;
    srcDir?: string;
  };
  fs: any;
  diagnostics: Diagnostic[];
}

export interface Diagnostic {
  level: 'error' | 'warn' | 'info' | 'log' | 'debug';
  type: 'typescript' | 'bundling' | 'build' | 'runtime' | 'hydrate' | 'css';
  header?: string;
  language?: string;
  messageText: string;
  code?: string;
  absFilePath?: string;
  relFilePath?: string;
  lineNumber?: number;
  columnNumber?: number;
  lines?: PrintLine[];
}

export interface PrintLine {
  lineIndex: number;
  lineNumber: number;
  text?: string;
  errorCharStart: number;
  errorLength?: number;
}

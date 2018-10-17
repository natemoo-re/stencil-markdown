import * as d from './declarations';
import * as util from './util';
import parse from './parse';

export function markdown(opts: d.PluginOptions = {}): d.Plugin {
  return {
    name: 'markdown',
    async transform(sourceText: string, fileName: string) {
      if (!util.usePlugin(fileName)) { return null; }

      const markedOptions = util.getRenderOptions(opts);
      let results: d.PluginTransformResults = null;

      try {
        const id = util.createResultsId(fileName);
        const { data, content } = await parse(sourceText, markedOptions);
        const code = util.getTSXOutput({ data, content });
        results = { id, code };
      } catch (error) {
        console.log('Markdown parse error');
        console.error(error);
      }

      return Promise.resolve(results);
    }
  };
}

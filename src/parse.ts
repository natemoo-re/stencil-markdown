import * as marked from 'marked';
import frontmatter from 'frontmatter';

function parse(sourceText: string, opts?: marked.MarkedOptions): Promise<{ data: any, content: string }> {
    return new Promise((resolve, reject) => {
        const parsedMarkdown = frontmatter(sourceText);
        const data = parsedMarkdown.data || null;

        marked.parse(parsedMarkdown.content, opts, (error, result) => {
            if (error) { reject(error); }
            return resolve({ data, content: result });
        });
    });
}

export default parse;

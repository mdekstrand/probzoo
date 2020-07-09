import Metalsmith from 'metalsmith';
import pandoc from 'metalsmith-pandoc';
import layouts from 'metalsmith-layouts';
import collections from 'metalsmith-collections';
import metadata from 'metalsmith-collection-metadata';

export function buildPages() {
  let ms = Metalsmith('.');
  ms = ms.metadata({
    sitename: 'Probability Zoo',
    siteurl: 'https://probably.ekstrandom.net',
    description: 'Notes and Examples of Proability Theory'
  })
  .source('./pages')
  .destination('./build/site')
  .clean(false)
  .use(collections({
    distributions: 'distributions/*.md'
  }))
  .use(metadata({
    distributions: {
      layout: 'distribution.njk'
    }
  }))
  .use(pandoc({
    args: ['--mathjax']
  }))
  .use(layouts());

  return new Promise((ok, fail) => {
    ms.build((err) => {
      if (err) fail(err)
      else ok()
    });
  });
}

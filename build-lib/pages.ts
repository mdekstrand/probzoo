import {dirname} from 'path';
import * as Metalsmith from 'metalsmith';
import * as pandoc from 'metalsmith-pandoc';
import * as layouts from 'metalsmith-layouts';
import * as collections from 'metalsmith-collections';
import * as metadata from 'metalsmith-collection-metadata';

export function buildPages() {
  let dir = dirname(__dirname);
  let ms = Metalsmith(dir);
  ms = ms.metadata({
    sitename: 'Probability Zoo',
    siteurl: 'https://probably.ekstrandom.net',
    description: 'Notes and Examples of Proability Theory'
  })
  .source('./pages')
  .destination('./build/site')
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

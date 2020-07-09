import {spawn} from 'child_process';
import gulp from 'gulp';
import del from 'del';
import { buildPages } from './build-lib/pages';
import webpack from 'webpack';

export function pack(done) {
  let config = require("./webpack.config");
  return webpack(config, (err, stats) => {
    if (err) {
      done(err);
    } else if (stats.hasErrors()) {
      done('webpack failed');
    } else {
      console.log(stats.toString({
        colors: true
      }));
      done();
    }
  });
}

export function pages() {
  return buildPages();
}

export const build = gulp.parallel(pack, pages);

export function testRust() {
  return spawn('cargo', ['test'], {
    stdio: 'inherit'
  });
}
export function testJS() {
  return spawn('yarn', ['mocha'], {
    shell: true,
    stdio: 'inherit'
  });
}

export const test = gulp.series(
  testRust,
  testJS
);

function cleanJS() {
  return del(['wasm', 'build', 'pkg']);
}

function cleanRust() {
  return spawn('cargo', ['clean'], {
    stdio: 'inherit'
  });
}

export const clean = gulp.parallel(cleanRust, cleanJS);

export function watch() {
  gulp.watch(['layouts/*.njk', 'pages/**'], pages);
}

export default build;

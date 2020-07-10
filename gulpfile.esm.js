import {spawn} from 'child_process';
import gulp from 'gulp';
import del from 'del';
import { buildPages } from './build-lib/pages';
import webpack from 'webpack';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

function productionMode() {
  if (process.env.NODE_ENV === 'production') {
    return true;
  } else if (args.production) {
    return true;
  } else {
    return false;
  }
}

export function pack(done) {
  let config = require("./webpack.config");
  config.mode = productionMode() ? 'production' : 'development';
  return webpack(config, (err, stats) => {
    if (err) {
      done(err);
    } else {
      console.log(stats.toString({
        colors: true
      }));
      if (stats.hasErrors()) {
        done('webpack failed');
      } else {
        done();
      }
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

export function clean() {
  return del(['wasm', 'build', 'pkg']);
}

function cleanRust() {
  return spawn('cargo', ['clean'], {
    stdio: 'inherit'
  });
}

export const cleanAll = gulp.parallel(cleanRust, clean);

export function watchPages() {
  gulp.watch(['layouts/*.njk', 'pages/**'], pages);
}

export function watchPack() {
  gulp.watch(['js/*.js', 'src/**', 'Cargo.toml'], pack);
}

export default build;

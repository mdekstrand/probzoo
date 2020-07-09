import {spawn} from 'child_process';
import * as gulp from 'gulp';
import * as del from 'del';

export function wasm() {
  return spawn('wasm-pack', ['build', '-d', 'wasm', '-t', 'nodejs', '--dev'], {
    stdio: 'inherit'
  });
}

export function wasmRelease() {
  return spawn('wasm-pack', ['build', '-d', 'build/wasm', '-t', 'nodejs'], {
    stdio: 'inherit'
  });
}

export function tsc() {
  return spawn('yarn', ['tsc'], {
    shell: true,
    stdio: 'inherit'
  });
}

export const build = gulp.series(wasm, wasmRelease, tsc);

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
  gulp.parallel(testRust, wasm),
  testJS
);

function cleanJS() {
  return del(['wasm', 'build']);
}

function cleanRust() {
  return spawn('cargo', ['clean'], {
    stdio: 'inherit'
  });
}

export const clean = gulp.parallel(cleanRust, cleanJS);

export default build;

import {spawn} from 'child_process';
import * as gulp from 'gulp';

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

export default build;

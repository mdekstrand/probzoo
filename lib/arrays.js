"use strict";
exports.__esModule = true;
exports.axpy = exports.makeRandom = exports.empty = void 0;
function empty() {
    return new Float64Array(0);
}
exports.empty = empty;
function makeRandom(size) {
    var arr = new Float64Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = Math.random();
    }
    return arr;
}
exports.makeRandom = makeRandom;
function axpy(a, x, y) {
    var n = x.length;
    for (var i = 0; i < n; i++) {
        y[i] = y[i] + x[i] * a;
    }
}
exports.axpy = axpy;

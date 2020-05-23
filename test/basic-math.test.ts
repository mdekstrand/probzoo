import {expect} from 'chai';
import * as jsa from '../lib/arrays';
import * as rsa from '../wasm/probzoo';

function testAXPY(src, mode) {
  return describe(`${mode} array math`, () => {
    describe("AXPY", () => {
      it("AXPI work on empty arrays", () => {
        let x = jsa.empty();
        let y = jsa.empty();
        src.axpy(2, x, y);
      });

      it("should work on random arrays", () => {
        let x = jsa.makeRandom(10);
        let y = jsa.makeRandom(10);
        let y2 = Float64Array.from(y);
        src.axpy(2, x, y);
        for (let i = 0; i < 10; i++) {
          expect(y[i]).to.equal(y2[i] + x[i] * 2);
          expect(y[i]).to.not.equal(y2[i]);
        }
      });
    });

    describe("ADD", () => {
      it("should work on empty arrays", () => {
        let x = jsa.empty();
        let y = jsa.empty();
        let z = src.add(2, x, y);
        expect(z.length).to.equal(0);
      });

      it("should work on random arrays", () => {
        let x = jsa.makeRandom(10);
        let y = jsa.makeRandom(10);
        let z = src.add(2, x, y);
        for (let i = 0; i < 10; i++) {
          expect(z[i]).to.equal(y[i] + x[i] * 2);
          expect(z[i]).to.not.equal(y[i]);
        }
      });
    });
  });
}

testAXPY(jsa, 'JS');
testAXPY(rsa, 'Rust');

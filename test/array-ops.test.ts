import {expect} from 'chai';
import * as fc from 'fast-check';

import * as jsa from '../lib/arrays';
import * as rsa from '../pkg/probzoo';

describe('empty', () => {
  it("should return an empty array", () => {
    let a = jsa.empty();
    expect(a).to.be.empty;
  });
});

describe('makeRandom', () => {
  it("should return a properly-sized array", () => {
    fc.assert(fc.property(fc.nat(4096), n => jsa.makeRandom(n).length == n));
  });
});

describe('linspace', function() {
  this.timeout(15000);

  it("should return an empty array with 0", () => {
    let ls = jsa.linspace(0, 1, 0);
    expect(ls).to.be.empty;
  });

  it("should space 0 to 1", () => {
    let ls = jsa.linspace(0, 1, 11);
    expect(ls).to.have.length(11);
    expect(ls[0]).to.equal(0);
    expect(ls[10]).to.equal(1);
    for (let i = 0; i < 11; i++) {
      expect(ls[i]).to.be.closeTo(i * 0.1, 1.0e-10);
    }
  });

  it("should space arrays", () => {
    fc.assert(fc.property(fc.float(), fc.float(), fc.integer(2, 10000), (s, e, n) => {
      let ls = jsa.linspace(s, e, n);
      expect(ls).to.have.length(n);
      expect(ls[0]).to.closeTo(s, 1.0e-10);
      expect(ls[n-1]).to.be.closeTo(e, 1.0e-10);
      for (let i = 1; i < n; i++) {
        let x = ls[i];
        if (e > s) {
          expect(x).to.be.within(s, e);
          expect(x).to.be.greaterThan(ls[i-1]);
        } else if (s > e) {
          expect(x).to.be.within(e, s);
          expect(x).to.be.lessThan(ls[i-1]);
        } else {
          // degenerate case, s = e
          expect(x).to.equal(s);
        }
      }
    }))
  })
})

describe('Rust linspace', function() {
  this.timeout(15000);

  it("should return an empty array with 0", () => {
    let ls = rsa.linspace(0, 1, 0);
    expect(ls).to.be.empty;
  });

  it("should space 0 to 1", () => {
    let ls = rsa.linspace(0, 1, 11);
    expect(ls).to.have.length(11);
    expect(ls[0]).to.equal(0);
    expect(ls[10]).to.equal(1);
    for (let i = 0; i < 11; i++) {
      expect(ls[i]).to.be.closeTo(i * 0.1, 1.0e-10);
    }
  });

  it("should space arrays", () => {
    fc.assert(fc.property(fc.float(), fc.float(), fc.integer(2, 10000), (s, e, n) => {
      let ls = rsa.linspace(s, e, n);
      expect(ls).to.have.length(n);
      expect(ls[0]).to.closeTo(s, 1.0e-10);
      expect(ls[n-1]).to.be.closeTo(e, 1.0e-10);
      for (let i = 1; i < n; i++) {
        let x = ls[i];
        if (e > s) {
          expect(x).to.be.within(s, e);
          expect(x).to.be.greaterThan(ls[i-1]);
        } else if (s > e) {
          expect(x).to.be.within(e, s);
          expect(x).to.be.lessThan(ls[i-1]);
        } else {
          // degenerate case, s = e
          expect(x).to.equal(s);
        }
      }
    }))
  })
})

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

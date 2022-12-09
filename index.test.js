const index = require('./index')
const assert = require('assert').strict;

describe('nextHeadPosition', () => {
  it('works', () => {
    assert.deepEqual(index.nextHeadPosition({ x: 0, y: 0 }, { direction: 'R', num: 4 }), { x: 4, y: 0 })
  })
})

describe('nextTailPosition', () => {
  it('works', () => {
    // stays
    assert.deepEqual(index.nextTailPosition({ hx: 1, hy: 0 }, { tx: 0, ty: 0 }), { x: 0, y: 0 })
    assert.deepEqual(index.nextTailPosition({ hx: 0, hy: 1 }, { tx: 0, ty: 0 }), { x: 0, y: 0 })
    assert.deepEqual(index.nextTailPosition({ hx: 0, hy: -1 }, { tx: 0, ty: 0 }), { x: 0, y: 0 })
    assert.deepEqual(index.nextTailPosition({ hx: -1, hy: 0 }, { tx: 0, ty: 0 }), { x: 0, y: 0 })

    // moves horizontal
    assert.deepEqual(index.nextTailPosition({ hx: 2, hy: 0 }, { tx: 0, ty: 0 }), { x: 1, y: 0 })
    assert.deepEqual(index.nextTailPosition({ hx: -2, hy: 0 }, { tx: 0, ty: 0 }), { x: -1, y: 0 })

    // moves vertical
    assert.deepEqual(index.nextTailPosition({ hx: 0, hy: 2 }, { tx: 0, ty: 0 }), { x: 0, y: 1 })
    assert.deepEqual(index.nextTailPosition({ hx: 0, hy: -2 }, { tx: 0, ty: 0 }), { x: 0, y: -1 })

    // moves diagonal horizontal
    assert.deepEqual(index.nextTailPosition({ hx: 2, hy: 1 }, { tx: 0, ty: 0 }), { x: 1, y: 1 })
    assert.deepEqual(index.nextTailPosition({ hx: 2, hy: -1 }, { tx: 0, ty: 0 }), { x: 1, y: -1 })

    assert.deepEqual(index.nextTailPosition({ hx: -2, hy: 1 }, { tx: 0, ty: 0 }), { x: -1, y: 1 })
    assert.deepEqual(index.nextTailPosition({ hx: -2, hy: -1 }, { tx: 0, ty: 0 }), { x: -1, y: -1 })

    // moves diagonal vertical
    assert.deepEqual(index.nextTailPosition({ hx: 1, hy: 2 }, { tx: 0, ty: 0 }), { x: 1, y: 1 })
    assert.deepEqual(index.nextTailPosition({ hx: -1, hy: 2 }, { tx: 0, ty: 0 }), { x: -1, y: 1 })

    assert.deepEqual(index.nextTailPosition({ hx: 1, hy: -2 }, { tx: 0, ty: 0 }), { x: 1, y: -1 })
    assert.deepEqual(index.nextTailPosition({ hx: -1, hy: -2 }, { tx: 0, ty: 0 }), { x: -1, y: -1 })
  })
})

describe('parseStep', () => {
  it('works', () => {
    assert.deepEqual(index.parseStep('R 4'), [
      { direction: 'R', num: 1 },
      { direction: 'R', num: 1 },
      { direction: 'R', num: 1 },
      { direction: 'R', num: 1 }
    ])
  })
})
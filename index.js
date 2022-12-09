const fs = require('fs')

const solution = moveHead()
console.log(solution)

function moveHead() {
  const steps = fs.readFileSync('steps-full.txt', 'utf-8')
  const parsedSteps = steps.split('\n').map(x => parseStep(x)).flat()

  let headPosition = { x: 0, y: 0 }
  let tailPosition = { x: 0, y: 0 }
  const positions = ['0,0']

  parsedSteps.map(step => {
    headPosition = nextHeadPosition(headPosition, step)

    tailPosition = nextTailPosition(
      { hx: headPosition.x, hy: headPosition.y },
      { tx: tailPosition.x, ty: tailPosition.y }
    )

    positions.push(`${tailPosition.x},${tailPosition.y}`)
  })

  return [...new Set(positions)].length
}

exports.moveHead = moveHead

function nextHeadPosition({ x, y }, { direction, num }) {
  switch (direction) {
    case 'R':
      x = x + num
      break

    case 'L':
      x = x - num
      break

    case 'U':
      y = y + num
      break

    case 'D':
      y = y - num
      break
  }

  return ({x, y})
}

exports.nextHeadPosition = nextHeadPosition

function nextTailPosition({ hx, hy }, { tx, ty }) {
  const xdiff = hx - tx
  const ydiff = hy - ty

  // same position
  if (xdiff === 0 && ydiff === 0) {
    return ({ x: tx, y: ty })
  }

  // strictly horizontal move
  if (Math.abs(xdiff) > 1 && ydiff === 0) {
    return ({ x: tx + step(xdiff), y: ty })
  }

  // strictly vertical move
  if (Math.abs(ydiff) > 1 && xdiff === 0) {
    return ({ x: tx, y: ty + step(ydiff) })
  }

  // diagonal horizontal move
  if (Math.abs(xdiff) > 1 && Math.abs(ydiff) === 1) {
    return ({ x: tx + step(xdiff), y: ty + ydiff })
  }

  // diagonal vertical move
  if (Math.abs(xdiff) === 1 && Math.abs(ydiff) > 1) {
    return ({ x: tx + xdiff, y: ty + step(ydiff) })
  }

  return ({ x: tx, y: ty })
}

exports.nextTailPosition = nextTailPosition

function step(diff) {
  return diff > 0 ? diff - 1 : diff + 1
}

function parseStep(str) {
  const [direction, num] = str.split(' ')
  return Array(parseInt(num)).fill({ direction, num: 1 })
}

exports.parseStep = parseStep
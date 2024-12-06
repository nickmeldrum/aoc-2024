import * as utils from '../utils/index.mjs'

const newLine = (original, index) =>
    original.substring(0, index) + 'X' + original.substring(index + 1)

utils.run(import.meta.url, 'input', (day, input, lines) => {
  const linesSplit = utils.parseSpacedToArrayInAllLines(lines)

  // part 1
  ////////////////////////

  const part1 = () => {
    console.time('part1')
    let total = 0


    const up = '^'
    const down = 'V'
    const left = '<'
    const right = '>'
    const block = '#'
    const gap = '.'

    let curPosH = undefined
    let curPosV = undefined
    let curDir = undefined

    for(let i = 0; i < linesSplit.length; i += 1) {
      const line = linesSplit[i][0]

      const upIndex = line.indexOf(up)
      const downIndex = line.indexOf(down)
      const leftIndex = line.indexOf(left)
      const rightIndex = line.indexOf(right)

      if (upIndex > -1) {
        curPosH = upIndex
        curPosV = i
        curDir = up
        break
      }
      if (downIndex > -1) {
        curPosH = downIndex
        curPosV = i
        curDir = down
        break
      }
      if (leftIndex > -1) {
        curPosH = leftIndex
        curPosV = i
        curDir = left
        break
      }
      if (rightIndex > -1) {
        curPosH = rightIndex
        curPosV = i
        curDir = right
        break
      }
    }

    const height = linesSplit.length
    const width = linesSplit[0][0].length
    const positions = {
    }

    do {
      // are we outside?
      if (curDir === up && curPosV < 0) break
      if (curDir === down && curPosV > height) break
      if (curDir === left && curPosH < 0) break
      if (curDir === right && curPosH > width) break

      // move
      if (curDir === up) {
        curPosV -= 1
      }
      if (curDir === down) {
        curPosV += 1
      }
      if (curDir === left) {
        curPosH -= 1
      }
      if (curDir === right) {
        curPosH += 1
      }

      let curSpot = linesSplit[curPosV][0][curPosH]

      // if now in block - move back and turn clockwise and move
      if (curSpot === block) {
        if (curDir === up) {
          curPosV += 1
          curDir = right
          curPosH += 1
        } else if (curDir === down) {
          curPosV -= 1
          curDir = left
          curPosH -= 1
        } else if (curDir === left) {
          curPosH += 1
          curDir = up
          curPosV -= 1
        } else if (curDir === right) {
          curPosH -= 1
          curDir = down
          curPosV += 1
        }
      }

      console.log(curDir, curPosV, curPosH, curSpot)
      if (positions[`${curPosV}${curPosH}`] === undefined) {
        positions[`${curPosV}${curPosH}`] = true
        total += 1
        //linesSplit[curPosV][0] = newLine(linesSplit[curPosV][0], curPosH)
        //console.log(linesSplit)
      }
    } while (true)

    //console.log(positions)

    console.timeEnd('part1')
    console.log(`part1: ${total}`)
  }
  part1()

  // part 2
  /////////////////////////////
  

  const part2 = () => {
    console.time('part2')
    let total = 0

    for(let i = 0; i < linesSplit.length; i += 1) {
      const line = linesSplit[i]
    }

    console.timeEnd('part2')
    console.log(`part2: ${total}`)
  }
  part2()
})

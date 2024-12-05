import * as utils from '../utils/index.mjs'

utils.run(import.meta.url, 'input', (day, input, lines) => {
  const linesSplit = utils.parseSpacedToArrayInAllLines(lines)

  // part 1
  ////////////////////////

  const count = str => (str.match(/XMAS/g) || []).length

  let total = 0
  const verLines = new Array(linesSplit[0][0].length).fill('')

  // forwards and backwards
  for(let i = 0; i < linesSplit.length; i += 1) {
    const line = linesSplit[i]

    total += count(line[0])

    const reversed = line[0].split('').reverse().join('')

    total += count(reversed)

    for(let j =0; j < line[0].length; j += 1) {
      verLines[j] += line[0][j]
    }
  }

  // vertical
  for(let i = 0; i < linesSplit.length; i += 1) {
    total += count(verLines[i])
    const reversed = verLines[i].split('').reverse().join('')
    total += count(reversed)
  }

  for (let i = 0; i < linesSplit[0][0].length; i += 1) {
    for (let j = 0; j < linesSplit.length; j += 1) {
      // check left down
      let leftDown = linesSplit[i][0][j]
      if (i + 1 >= 0 && i + 1 < linesSplit.length) leftDown += linesSplit[i + 1][0][j + 1]
      if (i + 2 >= 0 && i + 2 < linesSplit.length) leftDown += linesSplit[i + 2][0][j + 2]
      if (i + 3 >= 0 && i + 3 < linesSplit.length) leftDown += linesSplit[i + 3][0][j + 3]
      if (leftDown === 'XMAS') total += 1

      // check left up
      let leftUp = linesSplit[i][0][j]
      if (i - 1 >= 0 && i - 1 < linesSplit.length) leftUp += linesSplit[i - 1][0][j + 1]
      if (i - 2 >= 0 && i - 2 < linesSplit.length) leftUp += linesSplit[i - 2][0][j + 2]
      if (i - 3 >= 0 && i - 3 < linesSplit.length) leftUp += linesSplit[i - 3][0][j + 3]
      if (leftUp === 'XMAS') total += 1

      // check right down
      let rightDown = linesSplit[i][0][j]
      if (i - 1 >= 0 && i - 1 < linesSplit.length) rightDown += linesSplit[i - 1][0][j - 1]
      if (i - 2 >= 0 && i - 2 < linesSplit.length) rightDown += linesSplit[i - 2][0][j - 2]
      if (i - 3 >= 0 && i - 3 < linesSplit.length) rightDown += linesSplit[i - 3][0][j - 3]
      if (rightDown === 'XMAS') total += 1

      // check right up
      let rightUp = linesSplit[i][0][j]
      if (i + 1 >= 0 && i + 1 < linesSplit.length) rightUp += linesSplit[i + 1][0][j - 1]
      if (i + 2 >= 0 && i + 2 < linesSplit.length) rightUp += linesSplit[i + 2][0][j - 2]
      if (i + 3 >= 0 && i + 3 < linesSplit.length) rightUp += linesSplit[i + 3][0][j - 3]
      if (rightUp === 'XMAS') total += 1
    }
  }
  

  console.log(total)

  // part 2
  /////////////////////////////
  

  let total2 = 0

  for (let i = 1; i < linesSplit[0][0].length - 1; i += 1) {
    for (let j = 1; j < linesSplit.length - 1; j += 1) {
      const middle = linesSplit[j][0][i]
      const topL = linesSplit[j - 1][0][i - 1]
      const topR = linesSplit[j - 1][0][i + 1]
      const botL = linesSplit[j + 1][0][i - 1]
      const botR = linesSplit[j + 1][0][i + 1]

      if (
        middle === 'A' &&
        ((topL === 'M' && botR === 'S') || (topL === 'S' && botR === 'M')) &&
        ((topR === 'M' && botL === 'S') || (topR === 'S' && botL === 'M'))
      )
        total2 += 1
    }
  }

  console.log(total2)
})

/*
M M  S S  M S  S M
 A    A    A    A
S S  M M  M S  S M
*/

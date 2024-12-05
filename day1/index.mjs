import * as utils from '../utils/index.mjs'

utils.run(import.meta.url, 'input', (day, input, lines) => {
  const linesSplit = utils.parseSpacedToArrayInAllLines(lines)
  const left = linesSplit.map(l => l[0])
  const right = linesSplit.map(l => l[3])

  // part 1
  ////////////////////////
  //
  left.sort((a, b) => a - b)
  right.sort((a, b) => a - b)

  let cumulativeDistance = 0

  for(let i = 0; i < left.length; i += 1) {
    cumulativeDistance += Math.abs(left[i] - right[i])
  }

  console.log(`total distance: ${cumulativeDistance}`)


  // part 2
  ////////////////////////

  let cumulativeSum = 0

  for(let i = 0; i < left.length; i += 1) {
    let times = 0
    for(let j = 0; j < right.length; j += 1) {
      if (right[j] === left[i]) {
        times += 1
      }
    }
    cumulativeSum += left[i] * times
  }

  console.log(`total sum: ${cumulativeSum}`)
})

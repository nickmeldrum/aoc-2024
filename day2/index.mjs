import * as utils from '../utils/index.mjs'

utils.run(import.meta.url, (day, input, lines) => {
  const linesSplit = utils.parseSpacedToArrayInAllLines(lines)

  // part 1
  ////////////////////////

  let safeCount = 0;

  for(let i = 0; i < linesSplit.length; i += 1) {
    const line = linesSplit[i]

    let increasing = false
    let decreasing = false
    let safe = true
    
    for(let j = 1; j < line.length; j += 1) {
      const last = parseInt(line[j - 1], 10)
      const cur = parseInt(line[j], 10)
      const difference = Math.abs(last - cur)

      if (cur > last) increasing = true
      if (cur < last) decreasing = true
      if (difference > 3 || difference < 1) safe = false
    }
    if (increasing && decreasing) safe = false
    if (safe) safeCount += 1
  }

  console.log(safeCount)

  // part 2
  /////////////////////////////
  

  let safeCount2 = 0;

  const isSafe = (line => {
    let increasing = false
    let decreasing = false
    let safe = true
    
    for(let j = 1; j < line.length; j += 1) {
      const last = parseInt(line[j - 1], 10)
      const cur = parseInt(line[j], 10)
      const difference = Math.abs(last - cur)

      if (cur > last) increasing = true
      if (cur < last) decreasing = true
      if (difference > 3 || difference < 1) safe = false
    }
    if (increasing && decreasing) safe = false
    return safe
  })

  for(let i = 0; i < linesSplit.length; i += 1) {
    const originalLine = linesSplit[i]
    let safe = isSafe(originalLine)

    let tolerateCount = 0
    while (tolerateCount < originalLine.length) {
      const newLine = [...originalLine]
      newLine.splice(tolerateCount, 1)
      const thisOneSafe = isSafe(newLine)
      tolerateCount += 1
      if (thisOneSafe) safe = true
    }

    if (safe) safeCount2 += 1
  }

  console.log(safeCount2)
})

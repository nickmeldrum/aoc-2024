import * as utils from '../utils/index.mjs'

utils.run(import.meta.url, (day, input, lines) => {
  const linesSplit = utils.parseSpacedToArrayInAllLines(lines)

  // part 1
  ////////////////////////

  const part1 = () => {
    let total = 0

    const rules = []
    const manuals = []
    let inRules = true
    let inManuals = false
    lines.forEach(item => {
      if (item === '') {
        inRules = false
        inManuals = false
      }
      if (inRules) rules.push(item.split('|'))
      if (inManuals) manuals.push(item.split(','))
   
      if (item === '') {
        inRules = false
        inManuals = true
      }
    })
   
    manuals.forEach(manual => {
      let valid = true
      manual.forEach((page, index) => {
        rules.forEach(rule => {
          if (page === rule[0]) {
            const right = manual.findIndex(x => x === rule[1])
            if (right > -1 && index > right) {
              valid = false
            }
          }
   
          if (page === rule[1]) {
            const left = manual.findIndex(x => x === rule[0])
            if (left > -1 && index < left) {
              valid = false
            }
          }
        })
      })
      if (valid) {
        const middle = Math.floor(manual.length/2)
        total += parseInt(manual.slice(middle, middle + 1)[0], 10)
      }
    })
   
    // 75,97,47,61,53 becomes 97,75,47,61,53.
    console.log(`part1: score = ${total}`)
  }
  part1()

  // part 2
  /////////////////////////////
  
  const manualIsValid = (manual, rules) => {
    let valid = true
    manual.forEach((page, index) => {
      rules.forEach(rule => {
        if (page === rule[0]) {
          const right = manual.findIndex(x => x === rule[1])
          if (right > -1 && index > right) {
            valid = false
          }
        }
 
        if (page === rule[1]) {
          const left = manual.findIndex(x => x === rule[0])
          if (left > -1 && index < left) {
            valid = false
          }
        }
      })
    })
    return valid
  }

  const sortBasedOnRules = (manual, rules) => {
    // 75,97,47,61,53 becomes 97,75,47,61,53.
    
    /*
    manual = [75,97,47,61,53]
    rules = [
      [ '47', '53' ], [ '97', '13' ],
      [ '97', '61' ], [ '97', '47' ],
      [ '75', '29' ], [ '61', '13' ],
      ...
    ]
    page = 75
    */

    rules.sort((a, b) => {
      return parseInt(a[0], 10) - parseInt(b[0], 10)
    })

    do {
      for (let i = 0; i < rules.length; i += 1) {
        const rule = rules[i]
        const leftPos = manual.findIndex(x => x === rule[0])
        const rightPos = manual.findIndex(x => x === rule[1])

        //console.log(manual, rule[0], rule[1], leftPos, rightPos)

        if (leftPos !== -1 && rightPos !== -1 && leftPos > rightPos) {
          const left = manual[leftPos]
          manual[leftPos] = manual[rightPos]
          manual[rightPos] = left
        }
      }
      // console.log(manual)
    } while (!manualIsValid(manual, rules))


    return manual
  }

  const part2 = () => {
    let total = 0

    const rules = []
    const manuals = []
    let inRules = true
    let inManuals = false
    lines.forEach(item => {
      if (item === '') {
        inRules = false
        inManuals = false
      }
      if (inRules) rules.push(item.split('|'))
      if (inManuals) manuals.push(item.split(','))
   
      if (item === '') {
        inRules = false
        inManuals = true
      }
    })
   
    manuals.forEach(manual => {
      const valid = manualIsValid(manual, rules)
      if (!valid) {
        // sort based on rules
        const sortedPart2 = sortBasedOnRules(manual, rules)
        const middle = Math.floor(sortedPart2.length/2)
        total += parseInt(sortedPart2.slice(middle, middle + 1)[0], 10)
      }
    })
   
    console.log(`part2: score = ${total}`)
  }
  part2()
})

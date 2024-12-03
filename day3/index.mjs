import * as utils from '../utils/index.mjs'

utils.run(import.meta.url, (day, input) => {

  // part 1
  ////////////////////////

  const part1 = () => {
    const lines = input.split('m')
    let total = 0

    for(let i = 0; i < lines.length; i += 1) {
      let valid = true
      const line = lines[i]

      if (line.substring(0, 3) !== 'ul(') {
        continue
      }

      const numbers = ['0','1','2','3','4','5','6','7','8','9']
      let num1 = ''
      let num2 = ''
      let tokenPos = 0

      // ul(331,186)331on't()]-
      //

      // tokenize:
      // 0 = in num1, 1 = in comma, 2 = in num2, 3 = valid
      for(let pos = 3; pos < line.length; pos += 1) {
        const chr = line[pos]

        if (tokenPos === 2) {
          // gathering num2
          if (numbers.includes(chr)) {
            num2 += chr
          } else if (chr === ')') {
            const int1 = parseInt(num1, 10)
            const int2 = parseInt(num2, 10)
            total +=  int1 * int2
            break
          } else {
            valid = false
          }
        }

        if (tokenPos === 1) {
          tokenPos = 2
          pos = pos - 1
        }

        if (tokenPos === 0) {
          // gathering num1
          if (numbers.includes(chr)) {
            num1 += chr
          } else if (chr === ',') {
            tokenPos = 1
          } else {
            valid = false
          }
        }

        if (!valid) {
          break
        }
      }
    }

    console.log(total)
  }
  part1()

  // part 2
  /////////////////////////////
  

  const part2 = () => {
    const lines = input.split(/[md]+/)
    let total = 0

    let operate = true
    for(let i = 0; i < lines.length; i += 1) {
      let valid = true
      const line = lines[i]

      if (line.substring(0, 3) === 'o()') {
        operate = true
      } else if (line.substring(0, 6) === "on't()") {
        operate = false
      } else if (line.substring(0, 3) === 'ul(') {
        // then we should go on and cal if operate is true
      } else {
        continue
      }

      if (operate === false) {
        continue
      }

      const numbers = ['0','1','2','3','4','5','6','7','8','9']
      let num1 = ''
      let num2 = ''
      let tokenPos = 0

      // ul(331,186)331on't()]-
      //

      // tokenize:
      // 0 = in num1, 1 = in comma, 2 = in num2, 3 = valid
      for(let pos = 3; pos < line.length; pos += 1) {
        const chr = line[pos]

        if (tokenPos === 2) {
          // gathering num2
          if (numbers.includes(chr)) {
            num2 += chr
          } else if (chr === ')') {
            const int1 = parseInt(num1, 10)
            const int2 = parseInt(num2, 10)
            total +=  int1 * int2
            break
          } else {
            valid = false
          }
        }

        if (tokenPos === 1) {
          tokenPos = 2
          pos = pos - 1
        }

        if (tokenPos === 0) {
          // gathering num1
          if (numbers.includes(chr)) {
            num1 += chr
          } else if (chr === ',') {
            tokenPos = 1
          } else {
            valid = false
          }
        }

        if (!valid) {
          break
        }
      }
    }

    console.log(total)
  }
  part2()
})

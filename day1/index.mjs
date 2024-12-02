import * as utils from '../utils/index.mjs'

utils.run(import.meta.url, (day, input, lines) => {
    const linesSplit = utils.parseSpacedToArrayInAllLines(lines)
    console.log(`day ${day}. oh hai, ${linesSplit[999][3]}`)
})

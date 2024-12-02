import * as utils from './utils/index.mjs'

const run = async () => {
  const day = process.argv[2]
  console.log(`setting up day ${day}...`,)
  await utils.setup(day)
}

run()

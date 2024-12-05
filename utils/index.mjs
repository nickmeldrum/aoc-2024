import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs/promises'
import fsSync from 'fs'
import fetch from 'node-fetch'
import { ProxyAgent } from 'proxy-agent'
import open from 'open'

export const setup = async (day) => {
  const dir = `day${day}`

  console.log(`making dir ${dir}...`)

  if (!fsSync.existsSync(dir)) {
    await fs.mkdir(dir)

    const agent = new ProxyAgent()

    // todo: need to oauth authenticate? for now - must update cookie session value below!
    const response = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
      agent,
      headers: {
        "cookie": "session=53616c7465645f5f896c98a8c4bf2e305d63398cf815a0a98df01bb54e41972a8f14749848749cc633e091d1ce40f15f0f85ca09223253e8558195a01b06aa8a;",
      },
    })
    const body = await response.text()
    await fs.writeFile(`./day${day}/input`, body, { encoding: 'utf8' })
    await fs.writeFile(`./day${day}/input_example`, '', { encoding: 'utf8' })

    // todo: update package.json

    await fs.copyFile('./index.mjs.template', `./day${day}/index.mjs`)

    await fs.writeFile(`./day${day}/README.md`, `# Day ${day}`, { encoding: 'utf8' })
    // todo: would be nice to scan the page we open below to fill the readme with instructions

    open(`https://adventofcode.com/2024/day/${day}`)

  } else {
    console.log('dir exists, quiting in case we overwrite unpushed work...')
  }
}

export const readInput = async (day, file = 'input') =>
  await fs.readFile(`./day${day}/${file}`, { encoding: 'utf8' })

export const parseLinesToArray = (input) => {
  const split = input.split('\n')
  split.length = split.length - 1
  return split
}

export const parseSpacedToArrayInAllLines = (split) => split.map(l => l.split(' '))

export const numberFromCurrentModule = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl)
  const day = parseInt(dirname(__filename).split('/').pop().replace( /^\D+/g, ''), 10)
  console.log(`aoc2024: day ${day}`)
  return day
}

export const run = async (url, file = 'input', func) => {
  try {
    const day = numberFromCurrentModule(url)
    const input = await readInput(day)
    const lines = parseLinesToArray(input)
    func(day, input, lines)
  } catch (err) {
    console.error(err)
  }
}

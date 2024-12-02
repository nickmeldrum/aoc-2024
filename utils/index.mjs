import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs/promises'
import fsSync from 'fs'
import fetch from 'node-fetch'
import open from 'open'

export const setup = async (day) => {
  const dir = `day${day}`

  console.log(`making dir ${dir}...`)

  if (!fsSync.existsSync(dir)) {
    await fs.mkdir(dir)

    const response = await fetch(`https://adventofcode.com/2024/day/${day}/input`)
    const body = await response.text()
    await fs.writeFile(`./day${day}/input`, body, { encoding: 'utf8' })

    // todo: update package.json

    await fs.copyFile('./index.mjs.template', `./day${day}/index.mjs`)

    await fs.writeFile(`./day${day}/README.md`, `# Day ${day}`, { encoding: 'utf8' })

    open(`https://adventofcode.com/2024/day/${day}`)

  } else {
    console.log('dir exists, quiting in case we overwrite unpushed work...')
  }
}

export const readInput = async (day) =>
  await fs.readFile(`./day${day}/input`, { encoding: 'utf8' })

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

export const run = async (url, func) => {
  try {
    const day = numberFromCurrentModule(url)
    const input = await readInput(day)
    const lines = parseLinesToArray(input)
    func(day, input, lines)
  } catch (err) {
    console.error(err)
  }
}

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs/promises'

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

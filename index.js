import { readFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import catalog from './catalog.json' with { type: 'json' }

export const name = 'elephant-goldfish-model'
export const inject = ['skills']

const candidates = catalog.map(({ name: skillName, description }) => {
  const path = fileURLToPath(new URL(`./upstream/skills/${skillName}/SKILL.md`, import.meta.url))
  return {
    name: skillName,
    description,
    path,
    invocation: { userInvocable: true, modelInvocable: false },
    resourceBase: { kind: 'directory', path: dirname(path) },
    source: 'bundled',
    provider: name,
    rank: 600, // Harness's bundled skill rank.
    locator: path,
  }
})

export function apply(ctx) {
  ctx.skills.registerProvider(() => ({
    name,
    async list() {
      return candidates
    },
    async get({ locator, ...summary }, { signal } = {}) {
      const markdown = await readFile(locator, { encoding: 'utf8', signal })
      return { ...summary, content: markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trimStart() }
    },
  }))
}

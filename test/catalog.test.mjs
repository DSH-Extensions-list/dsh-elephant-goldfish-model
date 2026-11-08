import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'
import { apply, inject, name } from '../index.js'

test('registers seven explicit EGM commands with local reviewer resources', async () => {
  assert.deepEqual(inject, ['skills'])
  let provider
  apply({ skills: { registerProvider: factory => { provider = factory() } } })
  assert.equal(provider.name, name)
  const candidates = await provider.list()
  assert.deepEqual(candidates.map(skill => skill.name), [
    'egm-bootstrap', 'egm-brainstorm', 'egm-draft', 'egm-drift-report',
    'egm-resolve', 'egm-review', 'egm-review-loop',
  ])
  for (const candidate of candidates) {
    const skill = await provider.get(candidate)
    assert.deepEqual(skill.invocation, { userInvocable: true, modelInvocable: false })
    assert.equal(skill.resourceBase.kind, 'directory')
    assert.match(skill.content, /^# /)
    assert.match(skill.content, /DeepSeek Harness integration/)
    assert.ok(!skill.content.startsWith('---'))
    assert.ok(await readFile(join(skill.resourceBase.path, '../../docs/deepseek-harness.md'), 'utf8'))
  }
  const { resourceBase } = await provider.get(candidates.find(skill => skill.name === 'egm-review'))
  for (const file of ['agents/design_critic.md', 'resources/document_standards/feature-spec-standard.md']) {
    assert.ok(await readFile(join(resourceBase.path, '../..', file), 'utf8'))
  }
})

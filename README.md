# Elephant-Goldfish Model for DeepSeek Harness

This unofficial Apache-2.0 port packages Google's EGM skills, reviewer personas,
and standards for DeepSeek Harness 0.2.2-alpha.3. The pinned upstream commit is in
[upstream/REVISION](upstream/REVISION). The seven skill entry points add a Harness
integration note. The packaged personas and standards come directly from
[upstream](https://github.com/google/elephant-goldfish-model).

Download the tarball from [GitHub Releases](https://github.com/DSH-Extensions-list/dsh-elephant-goldfish-model/releases/latest).
In DeepSeek Harness, open **Plugin Hub → Add**, select the downloaded tarball,
and enable it. Open the composer slash menu in a preset with native skill support.

| Command | Purpose |
| --- | --- |
| `/egm-brainstorm` | Clarify an idea and develop a concept brief |
| `/egm-draft` | Draft a design from a brief or notes |
| `/egm-review` | Review a software design across five stages |
| `/egm-review-loop` | Review a document with selected personas and standards |
| `/egm-resolve` | Work through findings and apply approved edits |
| `/egm-bootstrap` | Document a repository subtree |
| `/egm-drift-report` | Compare design documents with the code |

The extension is self-contained and uses Harness’s built-in skill registry.
Goldfish reviews require a preset that exposes Harness’s native fresh-context
`subagent` tool. Each Goldfish receives its own task and selected file paths.
See the [Harness integration](upstream/docs/deepseek-harness.md) for reviewer
isolation and completion behavior.

Run `npm test` to check command registration and resource loading. Run
`npm pack` to build a tarball for the Plugin Hub.

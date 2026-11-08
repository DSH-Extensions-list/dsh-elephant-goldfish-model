# Elephant-Goldfish Model for DeepSeek Harness

<p align="center">
  <img src="assets/logo.png" alt="A blue elephant beside an orange goldfish" width="360">
</p>

Ever read a design doc and realized a crucial detail only made sense because you were there for the discussion? That’s the idea behind Elephant-Goldfish.

The Elephant is the DSH session you’ve been working in. It knows the tradeoffs you discussed and helps turn them into a design. The Goldfish are reviewers that each start in a fresh conversation. They get the draft and the files they need to review it, so they can spot gaps your original session might gloss over.

## Get started

1. Download the `.tgz` from the [latest release](https://github.com/DSH-Extensions-list/dsh-elephant-goldfish-model/releases/latest).
2. In DSH, open **Plugin Hub → Add**, choose the file, and enable the plugin.
3. Open the composer and type `/egm` to see the commands.

Already have a design doc? Try `/egm-review design.md`. For example, if you’re designing a background job that retries, see whether the draft explains what happens when a job runs twice or stops halfway through.

EGM works on its own inside DSH. You don’t need any other plugins. The commands were verified on DSH `0.2.2-alpha.3`. For Goldfish reviews, use a preset that exposes DSH’s built-in `subagent` tool with fresh conversations. [How reviews run in DSH](upstream/docs/deepseek-harness.md)

## The seven commands

| Command | When to use it |
| --- | --- |
| `/egm-brainstorm` | You have an idea and want to work out what to build. |
| `/egm-draft` | You have notes or a brief and want to turn them into a design doc. |
| `/egm-review` | You have a draft and want to put it through the five-stage review. |
| `/egm-review-loop` | You want to pick the reviewers and standards for a document review. |
| `/egm-resolve` | You have review findings and want to decide which changes to make. |
| `/egm-bootstrap` | You want to document how part of an existing repo works. |
| `/egm-drift-report` | You want to see where the code and design docs have diverged. |

## Working on the plugin

Run `npm test` to check command registration and bundled files. Run `npm pack` to build a tarball you can install in DSH.

This is my DSH port of [Google’s Elephant-Goldfish Model](https://github.com/google/elephant-goldfish-model). It includes the upstream reviewer personas and standards. [Upstream revision](upstream/REVISION) · [License](LICENSE)

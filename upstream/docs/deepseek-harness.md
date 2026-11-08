# DeepSeek Harness integration

Use the slash command for the workflow, for example `/egm-review design_draft.md`.
If a workflow calls another EGM skill in-thread, read its sibling
`../<skill-name>/SKILL.md` and apply it in the current conversation. Use Harness's
question tool when available and permitted, or ask one question in chat and wait
for the answer. Preserve the upstream checkpoints.

The skill's reported base directory is `<bundle>/skills/<skill>`. Resolve
`agents/`, `resources/`, and `docs/` from the bundle root, two directories above
that base. Resolve `references/` inside the active skill directory. Resolve the
user's target and output files in their workspace. Use absolute paths when
sending a reviewer to read bundled or workspace files.

## Goldfish reviewers

Use the native `subagent` tool only when its description says it starts a fresh
conversation. The standard Harness composition backs it with `spawn`. Do not use
`subagent_fork` or any tool that copies earlier messages. Use a separate fresh
child for each reviewer. Dispatch the reviewers directly from the parent and
synthesize their results there, even where upstream describes a synthesizer
subagent. This fits the usual one-level delegation limit.

Read each persona's frontmatter to map names to files. Give the child its persona
file, the exact review task, the target and any explicitly selected reading list
or standards. Tell it to read every supplied file, keep its work read-only, and
report any inaccessible input. Omit the parent transcript, private reasoning, and
answers the reviewer is expected to infer from the document. The child still
shares workspace access and may receive workspace or host instructions, so it
must avoid prior chat history, memory retrieval, and files outside its assigned
reading scope unless its review task specifically calls for repository evidence.

Wait for each matching child completion notice before synthesizing its report.
If fresh native delegation is unavailable or blocked by the current preset,
stop the Goldfish review and explain which capability is missing. Bootstrap can
still use its upstream inline scouting fallback.

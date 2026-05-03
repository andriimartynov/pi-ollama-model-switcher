# AGENT.md

## Tech Stack

- **TypeScript** (target: ES2022/ESNext)
- **pi-coding-agent**: Extension API for the pi harness.

## Entry Point: `index.ts`

- Exports a default function receiving `pi: ExtensionAPI`.
- Listens to `pi.on("model_select", ...)`.

### `index.ts` Logic

1. **Trigger**: On every model switch.
2. **Check**: If `previousModel.provider !== "ollama"`, do nothing.
3. **Action**: Run `pi.exec("ollama", ["stop", previousModelId], { signal: ctx.signal })` to clean up resources.
4. **Filter**: Don't stop if `next === prev`.

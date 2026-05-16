import type {ExtensionAPI} from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("model_select", async (event, ctx) => {
    const {model, previousModel} = event;

    if (!previousModel || previousModel.provider !== "ollama") {
      return;
    }

    const next = model.id;
    const prev = previousModel.id;

    if (next === prev) {
      return;
    }

    try {
      console.log(`[Ollama Switcher] Switching context: stopping model "${prev}".`);
      await pi.exec("ollama", ["stop", prev], {signal: ctx.signal});
      console.log(`[Ollama Switcher] Model "${prev}" stopped.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.warn(`[Ollama Switcher] Failed to stop "${prev}": ${msg}`);
    }
  });
}

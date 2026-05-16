export class OllamaClient {
  readonly host: string;

  constructor() {
    this.host = process.env.OLLAMA_HOST ?? "http://localhost:11434";
  }

  async generate<T = any>(options: object, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${this.host}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...options, stream: false}),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Stops a model by sending a generate request with `keep_alive: 0`.
   * Ollama does not have a dedicated "/api/stop" endpoint, so we leverage
   * the `/api/generate` endpoint: setting `keep_alive: 0` forces Ollama to
   * unload the model from memory immediately after processing the request.
   */
  async stopModel(modelName: string, signal?: AbortSignal): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unused: void = await this.generate({model: modelName, keep_alive: 0}, signal);
  }
}

# Ollama Model Switcher Extension

> Monitor and auto-manage Ollama model instances within the `pi` coding agent harness.

## Description

This extension monitors changes in the selected language model. Its primary purpose is to automatically manage and stop a previously running Ollama model instance when a new model is selected, ensuring that system resources are released efficiently.

The extension communicates directly with the [Ollama REST API](https://github.com/ollama/ollama/blob/main/docs/api.md) using HTTP requests instead of shell commands, making it safer and more portable.

## Prerequisites

*    [pi](https://pi.dev) coding agent harness must be installed.
*    [Ollama](https://ollama.com/) must be installed and running on your system.
*    Ollama API must be accessible (default: `http://localhost:11434`).

## Installation

### From Npm

```bash
pi install npm:@andriimartynov/pi-ollama-model-switcher
```

### From GitHub

```bash
pi install git:github.com/andriimartynov/pi-ollama-model-switcher
```

### FROM LOCAL PATH (DEVELOPMENT)

```bash
pi install /path/to/pi-ollama-model-switcher
```

## Configuration

### `OLLAMA_HOST`

By default, the extension connects to Ollama at `http://localhost:11434`. To use a different host or port, set the `OLLAMA_HOST` environment variable:

```bash
export OLLAMA_HOST="http://192.168.1.100:11434"
```

This is the same environment variable used by the [Ollama CLI](https://github.com/ollama/ollama/blob/main/docs/docs.md#custom-address-or-port).

## Features

*    **Model Change Detection:** Listens for the `model_select` event.
*    **Ollama Management:** If the selected model changes from a previous Ollama model, it safely stops the old instance via the Ollama REST API.
*    **Safe Operation:** No shell commands are executed — only HTTP requests to the Ollama API.
*    **Cancellation Support:** Integrates with `pi` harness cancellation signals.

## How it Works

1.  **Trigger:** A user changes the selected model in the harness.
2.  **Check:** The extension verifies if the previously active model was an Ollama model.
3.  **Action:** If so, it sends an HTTP POST request to `${OLLAMA_HOST}/api/generate` with `{ model: "<previous_model_id>", keep_alive: 0 }`, which forces Ollama to unload the model from memory immediately.

This ensures that resources tied to the old instance are released before new operations continue.

## Limitations

*    **Ollama Only:** It only manages cleanup for Ollama models; switching to/from non-Ollama models does not trigger cleanup.
*    **Stop Only:** This extension manages stopping existing processes; it does not handle starting new models.


## Changelog

See [CHANGELOG.md](CHANGELOG.md) for details.

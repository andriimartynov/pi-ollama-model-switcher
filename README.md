# Ollama Model Switcher Extension

> Monitor and auto-manage Ollama model instances within the `pi` coding agent harness.

## Description

This extension monitors changes in the selected language model. Its primary purpose is to automatically manage and stop a previously running Ollama model instance when a new model is selected, ensuring that system resources are released efficiently.

> **Security Note:** This extension executes shell commands (`ollama stop`) in the background. Ensure your environment is appropriately configured to allow these operations.

## Prerequisites

*   [pi](https://pi.dev) coding agent harness must be installed.
*   [Ollama](https://ollama.com/) must be installed and running on your system.
*   The `ollama` CLI must be available in your system `PATH`.

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

## Features

*   **Model Change Detection:** Listens for the `model_select` event.
*   **Ollama Management:** If the selected model changes from a previous Ollama model, it safely stops the old instance.

## How it Works

1.  **Trigger:** A user changes the selected model in the harness.
2.  **Check:** The extension verifies if the previously active model was an Ollama model.
3.  **Action:** If so, it executes `ollama stop [previous_model_id]` in the background.

This ensures that resources tied to the old instance are released before new operations continue.

## Limitations

*   **Ollama Only:** It only manages cleanup for Ollama models; switching to/from non-Ollama models does not trigger cleanup.
*   **Stop Only:** This extension manages stopping existing processes; it does not handle starting new models.


## Changelog

### v0.0.1
- Initial release.

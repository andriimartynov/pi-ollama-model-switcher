# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-07-13

### Added
- Direct Ollama REST API integration via `OllamaClient` class.
- `OLLAMA_HOST` environment variable support (default: `http://localhost:11434`).
- Cancellation support via `AbortSignal` integration with `pi` harness.
- Proper error handling with warning logs instead of crashes.

### Changed
- Replaced CLI-based `pi.exec` with HTTP `fetch` calls to Ollama REST API.
- Refactored `src/index.ts` to use `OllamaClient` for model management.

### Removed
- CLI shell command execution (`pi.exec`), improving portability and security.

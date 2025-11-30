# @arcanx/types

## 0.1.0

### Minor Changes

- d60c124: ### Feature: Introduce `@arcanx/types`: Architecture Foundation

  This is the initial **`v0.1.0`** release introducing the `@arcanx/types` package. This package serves as the **Single Source of Truth (S.S.O.T.)** for all data structures utilized across the entire **Arcanx** ecosystem (Core, Planner, Runner, Renderer).

  **Strategic Goal**: To enforce rigid separation of concerns, eliminate data ambiguity, and ensure the system is deterministic and fully testable.

  #### 1. 🏗️ Core Types

  Introduce core types definition, including:
  - Context types
  - Context Env types
  - Context IO types
  - Context Resource types
  - Context Runtime types

  #### 2. ⚙️ Loader Types

  Introduce loader types, including:
  - Action types
  - Config types
  - Config Hook types
  - Config Strategy types
  - Generator types
  - Generator Action types
  - Generator Prompt types

  #### 3. 📠 Renderer Types

  Introduce renderer types, including:
  - Engine types
  - Renderer Helper types
  - Renderer Partial types
  - Renderer Template types

  #### 4. 🏃 Runner Types

  Introduce runner types, including:
  - Artifact types
  - Plan types
  - Report types
  - Result types

  #### 5. 💡 Utilities

  Introduce some utility types, including:
  - Cache types
  - Error types
  - Filesystem types
  - Helper types
  - Log types
  - Path types
  - Result types

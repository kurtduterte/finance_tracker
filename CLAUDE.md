# CLAUDE.md

## Repository Overview

This repository is a **monorepo** containing multiple applications and shared packages.

Typical structure:

```
apps/
  web/
  mobile/
  backend/

packages/
  ui/
  utils/
  types/
  api-client/
```

Guidelines:

- `apps/` contain runnable applications.
- `packages/` contain shared reusable code.
- Always reuse existing packages before creating new code.

---

## General Principles

Claude should prioritize:

- Simplicity
- Readability
- Maintainability
- Strong typing
- Clear architecture

Avoid:

- duplicated logic
- unnecessary libraries
- premature abstractions

Prefer small composable functions and clear module boundaries.

---

## TypeScript Rules

- Use **strict TypeScript**
- Avoid `any`
- Define explicit types for data models
- Use runtime validation when necessary

Example:

```
type Expense = {
  id: string
  amount: number
  category: ExpenseCategory
  paymentType: PaymentType
  bank?: BankProvider
  date: string
}
```

---

## Architecture

Follow **layered architecture**:

```
UI
Application Logic
Domain Models
Data Access
External Services
```

Rules:

- UI must not access databases directly
- Business logic must be isolated
- External services should use adapters

---

## State Management

Client apps may use **Zustand**.

Guidelines:

- Keep state minimal
- Use selectors
- Avoid storing derived data

---

## Offline-First

Some apps follow **offline-first design**.

Rules:

1. Write data locally first
2. Mark records with `syncStatus`
3. Sync to backend when online
4. Retry failed sync operations

Example statuses:

```
pending
synced
failed
```

---

## Backend Structure

Backend services should follow:

```
controllers/
services/
repositories/
validators/
```

Responsibilities:

- Controllers → handle requests
- Services → business logic
- Repositories → database access

---

## API Standards

APIs should be:

- predictable
- validated
- consistently structured

Example response:

```
{
  success: true,
  data: ...
}
```

---

## Security

- Validate all input
- Never expose secrets
- Use environment variables for credentials

---

## When Generating Code

Claude should:

1. Identify the correct workspace
2. Reuse existing packages
3. Follow repository architecture
4. Avoid duplicate implementations
5. Keep code simple and maintainable

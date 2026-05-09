# tinynote

A tiny in-memory notes library: add, search, tag, and delete notes. No
storage, no UI, no dependencies — just functions over a `Note[]`.

## Use

```ts
import { addNote, searchNotes, tagsForNotes } from 'tinynote';

const n = addNote('Shopping', 'Buy milk and eggs', ['errand']);
const hits = searchNotes(allNotes, 'milk');
const tags = tagsForNotes(allNotes);
```

## Develop

```bash
npm install
npm test
```

## Status

Early. API may change. PRs welcome — please run the test suite and add
coverage for any behavior change.

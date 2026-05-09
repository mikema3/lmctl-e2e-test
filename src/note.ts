export interface Note {
  id: number;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
}

let nextId = 1;
const store: Note[] = [];

export function addNote(title: string, body: string, tags: string[] = []): Note {
  const note: Note = {
    id: nextId++,
    title,
    body,
    tags,
    createdAt: new Date().toISOString(),
  };
  store.push(note);
  return note;
}

export function listNotes(): Note[] {
  return [...store];
}

export function deleteNote(id: number): boolean {
  const idx = store.findIndex(n => n.id === id);
  if (idx === -1) return false;
  store.splice(idx, 1);
  return true;
}

export function searchNotes(notes: Note[], query: string): Note[] {
  if (query.length < 1) return [];
  const q = query.toLowerCase();
  return notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.body.toLowerCase().includes(q),
  );
}

export function tagsForNotes(notes: Note[]): string[] {
  const set = new Set<string>();
  for (const n of notes) {
    for (const t of n.tags) set.add(t);
  }
  return [...set].sort();
}

export function notesByTag(notes: Note[], tag: string): Note[] {
  return notes.filter(n => n.tags.some(t => t.includes(tag)));
}

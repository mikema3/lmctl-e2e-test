import { describe, it, expect } from 'vitest';
import { searchNotes, tagsForNotes, notesByTag, type Note } from '../src/note.js';

const sample: Note[] = [
  {
    id: 1,
    title: 'Shopping list',
    body: 'Buy milk and eggs',
    tags: ['errand', 'food'],
    createdAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 2,
    title: 'Books to read',
    body: 'TAOCP volume 4 fascicle 6',
    tags: ['reading'],
    createdAt: '2026-05-02T09:00:00Z',
  },
  {
    id: 3,
    title: 'Trip ideas',
    body: 'Maybe Iceland in autumn',
    tags: ['travel', 'wishlist'],
    createdAt: '2026-05-03T10:00:00Z',
  },
];

describe('searchNotes', () => {
  it('finds a note by title substring', () => {
    expect(searchNotes(sample, 'shopping').map(n => n.id)).toEqual([1]);
  });

  it('is case-insensitive', () => {
    expect(searchNotes(sample, 'BOOKS').map(n => n.id)).toEqual([2]);
  });

  it('matches body content', () => {
    expect(searchNotes(sample, 'iceland').map(n => n.id)).toEqual([3]);
  });

  it('returns empty array when no notes match', () => {
    expect(searchNotes(sample, 'nonsense')).toEqual([]);
  });

  it('matches single-character queries', () => {
    expect(searchNotes(sample, 'e').map(n => n.id)).toEqual([1, 2, 3]);
  });
});

describe('tagsForNotes', () => {
  it('returns sorted unique tags', () => {
    expect(tagsForNotes(sample)).toEqual(['errand', 'food', 'reading', 'travel', 'wishlist']);
  });

  it('returns empty for empty input', () => {
    expect(tagsForNotes([])).toEqual([]);
  });
});

describe('notesByTag', () => {
  it('returns notes with the given tag', () => {
    expect(notesByTag(sample, 'reading').map(n => n.id)).toEqual([2]);
  });

  it('returns multiple notes when several share a tag', () => {
    const extra: Note[] = [
      ...sample,
      { id: 4, title: 'Reading list extension', body: '...', tags: ['reading'], createdAt: '2026-05-04T10:00:00Z' },
    ];
    expect(notesByTag(extra, 'reading').map(n => n.id)).toEqual([2, 4]);
  });

  it('returns empty when no notes match', () => {
    expect(notesByTag(sample, 'unknown')).toEqual([]);
  });
});

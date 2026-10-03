/**
 * Chapter order for seamless boundary scroll navigation.
 *
 * Only the 8 primary routes participate. Project detail pages
 * (/work/<category>/<slug>) are explicitly OPT-OUT: they scroll like a
 * normal page and never auto-navigate on boundary.
 */

export const CHAPTERS = [
  '/',
  '/about',
  '/work',
  '/contact',
] as const;

function norm(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

/** True for project detail pages, which never take part in boundary navigation. */
export function isDetailPage(path: string): boolean {
  return /^\/work\/[^/]+\/[^/]+$/.test(norm(path));
}

/** Index of `path` in the chapter order, or -1 when it is not a chapter. */
export function chapterIndex(path: string): number {
  return CHAPTERS.indexOf(norm(path) as (typeof CHAPTERS)[number]);
}

/**
 * Neighbouring chapter in the given direction, or null at the ends.
 * `dir` is the scroll direction: 'down' → next chapter, 'up' → previous.
 */
export function chapterNeighbor(path: string, dir: 'up' | 'down'): string | null {
  const i = chapterIndex(path);
  if (i === -1) return null;
  const next = dir === 'down' ? i + 1 : i - 1;
  return CHAPTERS[next] ?? null;
}

/** Whether boundary scroll navigation is active on this path. */
export function isChapterRoute(path: string): boolean {
  return !isDetailPage(path) && chapterIndex(path) !== -1;
}

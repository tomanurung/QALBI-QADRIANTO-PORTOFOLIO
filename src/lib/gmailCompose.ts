/**
 * Email link behaviour, shared by Footer, About and Contact.
 *
 * Plain click  -> open Gmail compose in a new tab
 * Modifier key -> let the native `mailto:` href run (Ctrl/Cmd/Shift/Alt)
 * Popup blocked -> fall back to the element's own `mailto:` href
 * No JS        -> the `mailto:` href still works on its own
 *
 * Idempotent: each element is bound once via `data-emailBound`, so calling
 * bindEmailLinks() repeatedly (e.g. after an Astro view-transition swap) is
 * safe and never stacks duplicate listeners.
 */

function composeUrl(email: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

function bindOne(a: HTMLAnchorElement): void {
  if (a.dataset.emailBound) return;
  a.dataset.emailBound = 'true';

  a.addEventListener('click', (e) => {
    const email = a.dataset.email;
    if (!email) return; // no target email -> let native mailto: run
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    try {
      const w = window.open(composeUrl(email), '_blank', 'noopener,noreferrer');
      // Popup blocked -> fall back to the element's own mailto: href.
      if (!w || w.closed) window.location.href = a.href;
    } catch {
      window.location.href = a.href;
    }
  });
}

/**
 * Bind every `a.email-link[data-email]` under `root` (default: document).
 * Returns the number of links present.
 */
export function bindEmailLinks(root: ParentNode = document): number {
  const links = root.querySelectorAll<HTMLAnchorElement>('a.email-link[data-email]');
  links.forEach(bindOne);
  return links.length;
}

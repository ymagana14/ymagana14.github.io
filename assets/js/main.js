// Light/dark toggle — remembers the visitor's choice.
document.querySelector('.theme-toggle')?.addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.getAttribute('data-theme') === 'dark';
  if (dark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'dark');
  try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
});

// Project cards with a `preview:` video play it on hover (loaded only when needed).
document.querySelectorAll('.card').forEach((card) => {
  const video = card.querySelector('.card-preview');
  if (!video) return;
  card.addEventListener('mouseenter', () => {
    if (!video.src) video.src = video.dataset.src;
    video.play().then(() => video.classList.add('playing')).catch(() => {});
  });
  card.addEventListener('mouseleave', () => {
    video.pause();
    video.classList.remove('playing');
  });
});

// Click any image on a project page to view it full screen.
// Close with Esc, the × button, or a click on the dark background; ← / → step through images.
(() => {
  const images = [...document.querySelectorAll('.project-hero, .prose img')];
  if (!images.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.hidden = true;
  box.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close">×</button>
    <button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous image">‹</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lightbox-nav lightbox-next" type="button" aria-label="Next image">›</button>`;
  document.body.appendChild(box);

  const big = box.querySelector('img');
  const caption = box.querySelector('figcaption');
  let current = 0;

  const show = (i) => {
    current = (i + images.length) % images.length;
    const img = images[current];
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    caption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    box.hidden = true;
    document.body.style.overflow = '';
    images[current].focus?.();
  };

  images.forEach((img, i) => {
    img.classList.add('zoomable');
    img.tabIndex = 0;
    img.addEventListener('click', () => show(i));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter') show(i); });
  });

  box.addEventListener('click', (e) => { if (e.target === box || e.target.tagName === 'FIGURE') close(); });
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  box.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();

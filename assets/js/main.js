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

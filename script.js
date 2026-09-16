const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const menuLabel = document.querySelector('.menu-label');
const menuIcon = document.querySelector('.menu-icon');

const setMenuState = (open) => {
  if (!menuToggle || !navigation) return;
  navigation.classList.toggle('hidden', !open);
  navigation.classList.toggle('flex', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  if (menuLabel) menuLabel.textContent = open ? 'Close' : 'Menu';
  if (menuIcon) menuIcon.innerHTML = open
    ? '<path d="m6 6 12 12M18 6 6 18"/>'
    : '<path d="M4 7h16M4 12h16M4 17h16"/>';
};

const closeMenu = () => {
  setMenuState(false);
};

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuState(!expanded);
});

document.querySelectorAll('#main-nav a').forEach((link) => link.addEventListener('click', closeMenu));
document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

if (window.location.protocol.startsWith('http')) {
  const currentUrl = `${window.location.origin}${window.location.pathname}`;
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', currentUrl);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', currentUrl);
}

const carousel = document.querySelector('.project-carousel');
const cards = carousel ? [...carousel.querySelectorAll('.project-card')] : [];
const filters = [...document.querySelectorAll('.project-filter')];
let activeFilter = 'all';
let paused = false;

const visibleCards = () => cards.filter((card) => !card.hidden);
const nearestCard = () => visibleCards().reduce((closest, card) => {
  const distance = Math.abs(card.getBoundingClientRect().left - carousel.getBoundingClientRect().left);
  return distance < closest.distance ? { card, distance } : closest;
}, { card: visibleCards()[0], distance: Number.POSITIVE_INFINITY }).card;

const moveCarousel = (direction) => {
  if (!carousel) return;
  const currentCards = visibleCards();
  if (!currentCards.length) return;
  const currentIndex = Math.max(0, currentCards.indexOf(nearestCard()));
  const nextIndex = (currentIndex + direction + currentCards.length) % currentCards.length;
  carousel.scrollTo({ left: currentCards[nextIndex].offsetLeft, behavior: 'smooth' });
};

document.querySelector('.carousel-prev')?.addEventListener('click', () => moveCarousel(-1));
document.querySelector('.carousel-next')?.addEventListener('click', () => moveCarousel(1));

const applyFilter = (filter) => {
  activeFilter = filter;
  filters.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.setAttribute('aria-pressed', String(selected));
    button.classList.toggle('bg-slate-900', selected);
    button.classList.toggle('border-slate-900', selected);
    button.classList.toggle('text-white', selected);
    button.classList.toggle('hover:bg-teal-900', selected);
    button.classList.toggle('border-slate-300', !selected);
    button.classList.toggle('text-slate-600', !selected);
    button.classList.toggle('hover:border-teal-800', !selected);
    button.classList.toggle('hover:text-teal-800', !selected);
  });
  cards.forEach((card) => {
    card.hidden = filter !== 'all' && !card.dataset.kind.split(' ').includes(filter);
  });
  carousel?.scrollTo({ left: 0, behavior: 'smooth' });
};

filters.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
carousel?.addEventListener('mouseenter', () => { paused = true; });
carousel?.addEventListener('mouseleave', () => { paused = false; });
carousel?.addEventListener('focusin', () => { paused = true; });
carousel?.addEventListener('focusout', () => { paused = false; });
document.addEventListener('visibilitychange', () => { paused = document.hidden; });

if (carousel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    const bounds = carousel.getBoundingClientRect();
    const carouselVisible = bounds.top < window.innerHeight && bounds.bottom > 0;
    if (!paused && carouselVisible && activeFilter === 'all') moveCarousel(1);
  }, 6500);
}

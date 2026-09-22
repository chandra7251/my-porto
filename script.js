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

const carousel = document.querySelector('#featured-projects');
const otherProjects = document.querySelector('#other-projects');
const projects = window.PORTFOLIO_PROJECTS || [];
let cards = carousel ? [...carousel.querySelectorAll('.project-card')] : [];

if (carousel && otherProjects && projects.length) {
  const cardsById = new Map(cards.map((card) => [new URL(card.href).searchParams.get('project'), card]));
  projects.forEach((project) => {
    const card = cardsById.get(project.id);
    if (!card) return;
    card.dataset.kind = project.kind.join(' ');
    card.innerHTML = `<div class="flex justify-between text-xs tracking-[0.12em] text-slate-500 uppercase"><span>${project.number}</span><span>${project.category}</span></div><h3 class="mt-16 font-display text-3xl font-semibold tracking-tight">${project.title}</h3><p class="mt-4 min-h-20 text-sm leading-6 text-slate-600">${project.summary}</p><p class="mt-8 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-800">${project.stack.slice(0, 3).join(' · ')}</p>`;
    (project.featured ? carousel : otherProjects).append(card);
  });
  cards = [...carousel.querySelectorAll('.project-card')];
}
const filters = [...document.querySelectorAll('.project-filter')];
let activeFilter = 'all';
let paused = false;
let carouselIndex = 0;

const visibleCards = () => cards.filter((card) => !card.hidden && carousel?.contains(card));

const moveCarousel = (direction) => {
  if (!carousel) return;
  const currentCards = visibleCards();
  if (!currentCards.length) return;
  carouselIndex = Math.min(carouselIndex, currentCards.length - 1);
  const nextIndex = (carouselIndex + direction + currentCards.length) % currentCards.length;
  carouselIndex = nextIndex;
  carousel.scrollTo({ left: currentCards[nextIndex].offsetLeft, behavior: 'smooth' });
};

document.querySelector('.carousel-prev')?.addEventListener('click', () => moveCarousel(-1));
document.querySelector('.carousel-next')?.addEventListener('click', () => moveCarousel(1));

const applyFilter = (filter) => {
  activeFilter = filter;
  carouselIndex = 0;
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

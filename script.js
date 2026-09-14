const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const year = document.querySelector('#year');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  const icon = menuToggle.querySelector('span');
  if (icon) icon.textContent = isOpen ? '×' : '+';
});

document.querySelectorAll('#main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    const icon = menuToggle?.querySelector('span');
    if (icon) icon.textContent = '+';
  });
});

if (year) year.textContent = new Date().getFullYear();

const canonical = document.querySelector('link[rel="canonical"]');
const ogUrl = document.querySelector('meta[property="og:url"]');
if (canonical && location.pathname.endsWith('/index.html')) canonical.href = new URL('index.html', location.href).href;
if (ogUrl && location.pathname.endsWith('/index.html')) ogUrl.content = canonical?.href || location.href;

const projectCarousel = document.querySelector('.project-carousel');
const previousProject = document.querySelector('.carousel-prev');
const nextProject = document.querySelector('.carousel-next');
const projectCards = projectCarousel ? [...projectCarousel.querySelectorAll('.project-card')] : [];
let activeProject = 0;
const nearestProjectIndex = () => projectCards.reduce((closest, card, index) => {
  const cardLeft = card.offsetLeft - projectCarousel.offsetLeft;
  const distance = Math.abs(cardLeft - projectCarousel.scrollLeft);
  return distance < closest.distance ? { index, distance } : closest;
}, { index: activeProject, distance: Infinity }).index;
const updateCarouselControls = () => {
  if (!projectCarousel) return;
  const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
  if (projectCards.length) activeProject = nearestProjectIndex();
  if (previousProject) previousProject.disabled = projectCarousel.scrollLeft <= 1;
  if (nextProject) nextProject.disabled = projectCarousel.scrollLeft >= maxScroll - 1;
};
let moveProjects = (direction) => {
  if (!projectCarousel || !projectCards.length) return;
  activeProject = (activeProject + direction + projectCards.length) % projectCards.length;
  projectCards[activeProject].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
};
previousProject?.addEventListener('click', () => moveProjects(-1));
nextProject?.addEventListener('click', () => moveProjects(1));
projectCarousel?.addEventListener('scroll', updateCarouselControls, { passive: true });
window.addEventListener('resize', updateCarouselControls);
updateCarouselControls();

let carouselPaused = false;
const autoplay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? null : window.setInterval(() => {
  if (!projectCarousel || carouselPaused) return;
  if (window.innerWidth > 900) { moveProjects(1); return; }
  const atEnd = projectCarousel.scrollLeft >= projectCarousel.scrollWidth - projectCarousel.clientWidth - 2;
  if (atEnd) projectCarousel.scrollTo({ left: 0, behavior: 'smooth' });
  else moveProjects(1);
}, 6500);
projectCarousel?.addEventListener('mouseenter', () => { carouselPaused = true; });
projectCarousel?.addEventListener('mouseleave', () => { carouselPaused = false; });
projectCarousel?.addEventListener('focusin', () => { carouselPaused = true; });
projectCarousel?.addEventListener('focusout', () => { carouselPaused = false; });
document.addEventListener('visibilitychange', () => { carouselPaused = document.hidden; });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
window.requestAnimationFrame(() => window.setTimeout(() => document.querySelector('.fino-hero')?.classList.add('is-visible'), 60));

const syncProjectStack = () => {
  if (!projectCards.length || !projectCarousel || window.innerWidth <= 900) return;
  projectCards.forEach((card, index) => {
    card.classList.toggle('is-active', index === activeProject);
    card.classList.toggle('is-next', index === (activeProject + 1) % projectCards.length);
    card.classList.toggle('is-next-next', index === (activeProject + 2) % projectCards.length);
  });
};

const originalMoveProjects = moveProjects;
moveProjects = (direction) => {
  if (!projectCards.length) return;
  if (window.innerWidth > 900) {
    activeProject = (activeProject + direction + projectCards.length) % projectCards.length;
    syncProjectStack();
    return;
  }
  originalMoveProjects(direction);
};

projectCards.forEach((card, index) => card.addEventListener('click', () => {
  if (window.innerWidth > 900 && index !== activeProject) {
    activeProject = index;
    syncProjectStack();
  }
}));

syncProjectStack();
window.addEventListener('resize', syncProjectStack);





const projectFilters = [...document.querySelectorAll('.project-filter')];
let activeFilter = 'all';
const filteredProjectIndexes = () => projectCards.reduce((indexes, card, index) => {
  if (activeFilter === 'all' || card.dataset.kind?.split(' ').includes(activeFilter)) indexes.push(index);
  return indexes;
}, []);

const applyProjectFilter = (filter) => {
  activeFilter = filter;
  const visibleIndexes = filteredProjectIndexes();
  projectFilters.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  projectCards.forEach((card, index) => {
    card.hidden = !visibleIndexes.includes(index);
  });
  activeProject = visibleIndexes[0] ?? 0;
  projectCarousel?.scrollTo({ left: 0, behavior: 'smooth' });
  syncProjectStack();
};

projectFilters.forEach((button) => button.addEventListener('click', () => applyProjectFilter(button.dataset.filter)));

moveProjects = (direction) => {
  const visibleIndexes = filteredProjectIndexes();
  if (!visibleIndexes.length) return;
  const currentIndex = nearestProjectIndex();
  const currentPosition = Math.max(0, visibleIndexes.indexOf(currentIndex));
  activeProject = visibleIndexes[(currentPosition + direction + visibleIndexes.length) % visibleIndexes.length];
  const targetLeft = Math.max(0, projectCards[activeProject].offsetLeft - projectCarousel.offsetLeft);
  projectCarousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
  syncProjectStack();
};

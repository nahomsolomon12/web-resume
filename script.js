const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-navigation');
const navLinks = document.querySelectorAll('.nav-list a');
const sections = document.querySelectorAll('main section[id]');

function updateActiveRoute(routeId) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${routeId}`);
  });

  sections.forEach((section) => {
    section.classList.toggle('active-route', section.id === routeId);
  });
}

function handleRouteChange(hash) {
  const routeId = (hash || window.location.hash || '#home').replace('#', '') || 'home';
  const targetSection = document.getElementById(routeId);

  if (!targetSection) {
    window.history.replaceState(null, '', '#home');
    updateActiveRoute('home');
    return;
  }

  updateActiveRoute(routeId);

  targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const targetHash = link.getAttribute('href');
      const routeId = (targetHash || '#home').replace('#', '');

      window.history.pushState({ route: routeId }, '', `#${routeId}`);
      handleRouteChange(`#${routeId}`);

      if (navList.classList.contains('open')) {
        navToggle.click();
      }
    });
  });
}

window.addEventListener('popstate', () => {
  handleRouteChange(window.location.hash);
});

window.addEventListener('DOMContentLoaded', () => {
  handleRouteChange(window.location.hash);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveRoute(entry.target.id);
          window.history.replaceState({ route: entry.target.id }, '', `#${entry.target.id}`);
        }
      });
    },
    {
      rootMargin: '-40% 0px -45% 0px',
      threshold: 0.1,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

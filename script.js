const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-navigation');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('open')) {
        navToggle.click();
      }
    });
  });
}

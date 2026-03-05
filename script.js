const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

if (menuToggle && header) {
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealTargets = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const counter = entry.target;
      const target = Number(counter.dataset.target || 0);
      const duration = 1100;
      const start = performance.now();

      const step = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const sections = [...document.querySelectorAll('main section[id]')];
const updateActiveLink = () => {
  const scrollPoint = window.scrollY + 140;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPoint) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('resize', updateActiveLink);
updateActiveLink();

const roles = [
  'Network and Security Architecture',
  'Cloud and Data Center Solutions',
  'Customer-Facing Technical Consulting',
  'Scalable Infrastructure Implementation'
];

const typedRole = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = 0;
let removing = false;

const typeLoop = () => {
  if (!typedRole) {
    return;
  }

  const current = roles[roleIndex];

  if (!removing) {
    charIndex += 1;
    typedRole.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      removing = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex -= 1;
    typedRole.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      removing = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const pace = removing ? 32 : 58;
  setTimeout(typeLoop, pace);
};

typeLoop();

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const navLinks = document.querySelectorAll('nav li');
const mainElm = document.querySelector('main');
const sections = document.querySelectorAll('section[id]');

const toTopButton = document.querySelector('.to-top');

const options = {
  root: null,
  rootMargin: '-50% 0px',
  threshold: 0,
};

const mainElmObserver = new IntersectionObserver(doWhenMainElmIntersect, options);

mainElmObserver.observe(mainElm);

function doWhenMainElmIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      toTopButton.classList.add('show');
    } else {
      toTopButton.classList.remove('show');
    }
  });
}

const sectionObserver = new IntersectionObserver(doWhenSectionsIntersect, options);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

function doWhenSectionsIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const drawElm = document.querySelector(`section[id=${entry.target.id}] h2>span`);
      drawElm.classList.add('draw');

      const currentNavLink = document.querySelector('nav li.current');

      if (currentNavLink !== null) {
        currentNavLink.classList.remove('current');
      }

      const newCurrentNavLink = document.querySelector(`li:has(a[href="#${entry.target.id}"])`);
      newCurrentNavLink.classList.add('current');
    } else {
      const currentDrawElm = document.querySelector('.draw');
      const currentNavLink = document.querySelector('nav li.current');

      if (currentDrawElm) {
        currentDrawElm.classList.remove('draw');
      }
      if (currentNavLink) {
        currentNavLink.classList.remove('current');
      }
    }
  });
}

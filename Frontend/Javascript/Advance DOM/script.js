'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (value, index, nodeList) {
  value.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//buttons
const btnScrollTo = document.querySelector('.btn--scroll-to');

//elements

const section1 = document.querySelector('#section--1');

//scrolling

btnScrollTo.addEventListener('click', function (event) {
  // old way
  // const rect = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: rect.left + window.pageXOffset,
  //   top: rect.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //new way

  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//implementing tab

const tabContainer = document.querySelector('.operations__tab-container');
const operationsTab = document.querySelectorAll('.operations__tab ');
const operationContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const target = e.target.closest('.operations__tab');

  if (target) {
    operationsTab.forEach(function (childs) {
      childs.classList.remove('operations__tab--active');

      operationContent.forEach(function (childs) {
        childs.classList.remove('operations__content--active');
      });
    });
    target.classList.add('operations__tab--active');

    document
      .querySelector(`.operations__content--${target.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

//menu fade animation

const nav = document.querySelector('.nav');
const allNavLinkChilds = nav.querySelectorAll('.nav__link');
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const target = e.target;
    console.log(allNavLinkChilds);
    const img = nav.querySelector('img');
    img.style.opacity = '0.5';
    allNavLinkChilds.forEach(function (link) {
      if (target !== link) {
        link.style.opacity = '0.5';
      }
    });
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const target = e.target;
    console.log(allNavLinkChilds);
    const img = nav.querySelector('img');
    img.style.opacity = '1';
    allNavLinkChilds.forEach(function (link) {
      link.style.opacity = '1';
    });
  }
});

//sticky navigation using scroll

// const initialCord = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   console.log('window scroll ', window.scrollY);
//   console.log(initialCord.top);

//   if (window.scrollY > initialCord.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//sticky navigation using intersectionObserver API

const header = document.querySelector('.header');
function observerCallback(entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
}
const option = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};

const observer = new IntersectionObserver(observerCallback, option);
observer.observe(header);

///Reveal Sections

const allSections = document.querySelectorAll('.section');
const revealSectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('section--hidden');
        revealSectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.15,
  },
);

allSections.forEach(section => {
  section.classList.add('section--hidden');
  revealSectionObserver.observe(section);
});

//lazy loading images

const allImages = document.querySelectorAll('img[data-src]');

const lazyLoaderObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry, index, arr) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener('load', function () {
          entry.target.classList.remove('lazy-img');
        });
      }
    });
  },
  {
    root: null,
    threshold: 0, // for 0 , then value >0 and then again 0
  },
);

allImages.forEach(image => {
  lazyLoaderObserver.observe(image);
});

//building image slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const rightSliderButton = document.querySelector('.slider__btn--right');
const leftSliderButton = document.querySelector('.slider__btn--left');

const dotContainer = document.querySelector('.dots');

function createDotes() {
  slides.forEach((slide, index) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `
        <button class=dots__dot data-slide=${index}> </button>
      `,
    );
  });
}

createDotes();

const allDotes = [...dotContainer.children];
slides.forEach(function (slide, index) {
  console.log(slide.style.transform);
  slide.style.transform = `translateX(${100 * index}%)`;
  console.log(slide.style.transform);
});

let currentSlide = 0;
let totalSlides = slides.length;

function makeDotGood(dot) {
  allDotes.forEach(function (myDot) {
    myDot.classList.remove('dots__dot--active');
  });

  dot.classList.add('dots__dot--active');
}

makeDotGood(allDotes[currentSlide]);
rightSliderButton.addEventListener('click', function () {
  if (currentSlide === totalSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  slides.forEach(function (slide, index) {
    console.log(slide.style.transform);
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    console.log(slide.style.transform);
  });

  makeDotGood(allDotes[currentSlide]);
});

leftSliderButton.addEventListener('click', function () {
  if (currentSlide === 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide--;
  }

  slides.forEach(function (slide, index) {
    console.log(slide.style.transform);
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    console.log(slide.style.transform);
  });
  makeDotGood(allDotes[currentSlide]);
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slideNumber = e.target.dataset.slide;
    currentSlide = +slideNumber;
    console.log(currentSlide);
    slides.forEach(function (slide, index) {
      console.log(slide.style.transform);
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
      console.log(slide.style.transform);
    });

    makeDotGood(e.target);
  }
});

//////////----------------------------------------------------------------------------

// selecting an element
// console.log(document);
// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);
// console.log(document.doctype);

// console.log(document.querySelector('section'));
// const ref = document.querySelectorAll('section');

// document.body.insertAdjacentHTML(
//   'afterbegin',
//   `<section class='my-section'
//   </section>`,
// );

// const ref2 = document.querySelectorAll('section');

// console.log('references');
// console.log(ref);
// console.log(ref2);
// console.log(document.getElementsByTagName('button'));
// console.log(document.getElementsByClassName('section'));
// console.log(document.getElementById('section--1'));

/// creating an element

// const div = document.createElement('div');
// div.classList.add('coocie-message');
// div.innerHTML = `we use cookies
//   <button class='my-button'> </button>
// `;

// console.log(div);

// const header = document.querySelector('header');

// header.prepend(div);
// header.append(div);

// Event Propogation

// const randomNumber = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () =>
//   `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   const r = randomColor();
//   document.querySelector('.nav__link').style.backgroundColor = r;
//   console.log(e.target);
//   console.log(e.currentTarget);
//   console.log(this === e.target);
//   console.log(this === e.currentTarget);
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   document.querySelector('.nav__links').style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log(e.currentTarget);
//   console.log(this === e.target);
//   console.log(this === e.currentTarget);
// });
// document.querySelector('.header').addEventListener('click', function (e) {
//   document.querySelector('.header').style.backgroundColor = randomColor();
//   console.log(e.target);
//   console.log(e.currentTarget);
//   console.log(this === e.target);
//   console.log(this === e.currentTarget);

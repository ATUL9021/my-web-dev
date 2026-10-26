const yearSelector = document.querySelector(".year");
console.log(yearSelector);

yearSelector.textContent = new Date().getFullYear();

const header = document.querySelector(".header");
const headerNavButton = document.querySelector(".header-nav-button");

headerNavButton.addEventListener("click", function () {
  header.classList.toggle("open-nav");
});

// smooths scrolling impl

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (ele) {
  ele.addEventListener("click", function (e) {
    const href = ele.getAttribute("href");
    e.preventDefault();
    if (href == "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.charAt(0) == "#" && href.length > 1) {
      const eleToReach = document.querySelector(href);
      console.log(eleToReach);
      eleToReach.scrollIntoView({ behavior: "smooth" });
      header.classList.toggle("open-nav");
    }
  });
});

// implementing sticky navigation bar

const obs = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-92px",
  },
);

const sectionHero = document.querySelector(".hero-section");
obs.observe(sectionHero);

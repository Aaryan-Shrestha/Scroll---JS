// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically. (USE ".scrollY" PROPERTY INSTEAD OF "pageYOffset" BECAUSE IT IS DEPRECATED)
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // FIRST METHOD -> HARDCODE VALUE i.e. (IT'S NOT DYNAMIC)
  //   linksContainer.classList.toggle("show-links");

  // SECOND METHOD -> DYNAMICALLY CALCULATING THE HEIGHT OF THE "links" AND ASSIGNING IT TO THE "linksContainer"
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  //   console.log(linksHeight
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  //   console.log(window.scrollY);
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});
// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // PREVENT DEFAULT BROWSER SETTINGS
    e.preventDefault();

    // NAVIGATE TO SPECIFIC SPOTS
    const id = e.currentTarget.getAttribute("href").slice(1);
    // console.log(id);
    const element = document.getElementById(id);

    // CALCULATE THE HEIGHTS
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = links.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;
    // console.log(id, element, position); // "id" GIVES THE ID OF A LINK WHICH IS CLICKED, "element" GIVES THE PARTICULAR TAG AND "offsetTop" GIVES THE PARTICULAR ELEMENT WHICH IS CLICKED FROM THE TOP (in px)
    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });

    linksContainer.style.height = 0;
  });
});

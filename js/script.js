var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i) === ' ' ? '&nbsp;' : content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);

////////////// card hover efect
const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let raf;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / 10;
        mouseY = -(e.clientY - rect.top - rect.height / 2) / 10;

        if (!raf) {
            raf = requestAnimationFrame(update);
        }
    });

    card.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
        if (!raf) {
            raf = requestAnimationFrame(update);
        }
    });

    function update() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        card.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;

        if (Math.abs(currentX - mouseX) > 0.1 || Math.abs(currentY - mouseY) > 0.1) {
            raf = requestAnimationFrame(update);
        } else {
            raf = null;
        }
    }
});
// ///////////slider



const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.slide');
const indicators = document.getElementById('indicators');
let currentIndex = 0;

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => showSlide(index));
  indicators.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Autoplay every 4 seconds
setInterval(() => {
  nextSlide();
}, 4000);

// Initial display
showSlide(0);


// Open Popup
document.querySelectorAll('.open-popup').forEach(btn => {
btn.addEventListener('click', () => {
  const popupId = btn.getAttribute('data-popup');
  document.getElementById(popupId).style.display = 'flex';
});
});

// Close Popup
document.querySelectorAll('.close-popup').forEach(btn => {
btn.addEventListener('click', () => {
  btn.closest('.popup').style.display = 'none';
});
});

// Close when clicking outside content
document.querySelectorAll('.popup').forEach(popup => {
popup.addEventListener('click', e => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});
});

//  tab 

function openTab(evt, tabId) {
    const tabContents = document.querySelectorAll(".tab-content");
    const tabButtons = document.querySelectorAll(".tab-button");

    tabContents.forEach(content => content.classList.remove("active"));
    tabButtons.forEach(button => button.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
  }



  const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });



    // phone menu

    "use strict";

// Designed by: Mauricio Bucardo
// Original image: https://dribbble.com/shots/5619509-Animated-Tab-Bar

const body = document.body;
// const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"]; // Removed since no background change is needed
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item) {
    menu.style.removeProperty("--timeOut");

    if (activeItem === item) return;

    if (activeItem) {
        activeItem.classList.remove("active");
    }

    item.classList.add("active");
    // body.style.backgroundColor = bgColorsBody[index]; // Removed background color change
    activeItem = item;
    offsetMenuBorder(activeItem, menuBorder);
}

function offsetMenuBorder(element, menuBorder) {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(
        offsetActiveItem.left -
        menu.offsetLeft -
        (menuBorder.offsetWidth - offsetActiveItem.width) / 2
    ) + "px";
    menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item) => {
    item.addEventListener("click", () => clickItem(item));
});

window.addEventListener("resize", () => {
    offsetMenuBorder(activeItem, menuBorder);
    menu.style.setProperty("--timeOut", "none");
});







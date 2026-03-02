/* MODAL */
function openModal(id) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-img").src = document.getElementById(id).src;
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* SCROLL ANIMATION */
const elements = document.querySelectorAll("[data-animate]");
function scrollAnim() {
  elements.forEach((el) => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", scrollAnim);
scrollAnim();

//

const slides = document.querySelectorAll(".slide");
const dotsContainerd = document.getElementById("dotsAtas");
let current = 0;

// buat dots sebanyak slide
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add(
    "dot",
    "w-3",
    "h-3",
    "rounded-full",
    "bg-white/40",
    "cursor-pointer"
  );
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainerd.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function goToSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("opacity-100", "scale-100");
    slide.classList.add("opacity-0", "scale-110");
    dots[idx].classList.replace("bg-white", "bg-white/40");
  });
  slides[i].classList.add("opacity-100", "scale-100");
  dots[i].classList.replace("bg-white/40", "bg-white");
  current = i;
}

function nextSlide() {
  let next = (current + 1) % slides.length;
  goToSlide(next);
}

// mulai dari slide pertama
goToSlide(0);

// slide otomatis setiap 5 detik
setInterval(nextSlide, 5000);

//

const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;

function itemsPerView() {
  if (window.innerWidth >= 1024) return 3; // laptop
  if (window.innerWidth >= 640) return 2; // tablet
  return 1; // hp
}

function totalSlides() {
  return Math.ceil(slider.children.length / itemsPerView());
}

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function createDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides(); i++) {
    const dot = document.createElement("button");
    dot.className = "w-3 h-3 rounded-full bg-gray-300";
    dot.onclick = () => {
      index = i;
      updateSlider();
    };
    dotsContainer.appendChild(dot);
  }
  updateDots();
}

function updateDots() {
  [...dotsContainer.children].forEach((dot, i) => {
    dot.className =
      i === index
        ? "w-3 h-3 rounded-full bg-blue-600"
        : "w-3 h-3 rounded-full bg-gray-300";
  });
}

next.onclick = () => {
  if (index < totalSlides() - 1) {
    index++;
    updateSlider();
  }
};

prev.onclick = () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
};

window.addEventListener("resize", () => {
  index = 0;
  createDots();
  updateSlider();
});

createDots();
updateSlider();

//

const timelineItems = document.querySelectorAll(".timeline-item > div");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0");
        entry.target.classList.remove("translate-x-[-60px]");
        entry.target.classList.remove("translate-x-[60px]");
      }
    });
  },
  { threshold: 0.3 }
);

timelineItems.forEach((item) => observer.observe(item));

//
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("opacity-0");

  menuBtn.name = isOpen ? "menu" : "close";

  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("invisible");
  mobileMenu.classList.toggle("-translate-y-3");
});

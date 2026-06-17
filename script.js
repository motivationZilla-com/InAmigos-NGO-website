const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const galleryElement = document.querySelector("[data-gallery]");
const heroElement = document.querySelector(".hero");
const heroCaption = document.querySelector("[data-hero-caption]");

const galleryItems = [
  {
    title: "Learners collaborating",
    description: "Students explore digital tools together with mentor support.",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    alt: "Students working together on a laptop in a community classroom"
  },
  {
    title: "Community outreach",
    description: "Volunteers bring technology workshops to local neighborhoods.",
    src: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=80",
    alt: "Volunteer teaching a group of children in an informal learning space"
  },
  {
    title: "Creative skill-building",
    description: "Hands-on practice helps learners gain confidence and creativity.",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Young learners using paper and devices during a skill-building activity"
  }
];

const updateGallery = () => {
  if (!galleryElement) return;

  galleryElement.innerHTML = galleryItems
    .map(
      (item) => `
        <article class="gallery-card">
          <img class="gallery-image" src="${item.src}" alt="${item.alt}" />
          <div class="gallery-caption">
            <strong>${item.title}</strong>
            <span>${item.description}</span>
          </div>
        </article>
      `
    )
    .join("");
};

const rotateGallery = () => {
  galleryItems.push(galleryItems.shift());
  updateGallery();
};

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    caption: "Volunteers helping students access digital tools in a safe classroom."
  },
  {
    image: "https://smileindiatrust.org/wp-content/uploads/2022/10/involved5.jpg",
    caption: "A local mentor teaching children with care and encouragement."
  },
  {
    image: "https://dogexpress.in/wp-content/uploads/2021/08/animal-aid-unlimited.png",
    caption: "Community members protecting animals and building compassion together."
  }
];

let heroIndex = 0;

const updateHeroSlide = () => {
  if (!heroElement || !heroCaption) return;

  const slide = heroSlides[heroIndex];
  heroElement.style.backgroundImage = `linear-gradient(90deg, rgba(8, 55, 56, 0.84) 0%, rgba(8, 55, 56, 0.58) 44%, rgba(8, 55, 56, 0.12) 100%), url(${slide.image})`;
  heroCaption.textContent = slide.caption;
  heroIndex = (heroIndex + 1) % heroSlides.length;
};

updateGallery();
setInterval(rotateGallery, 6000);
updateHeroSlide();
setInterval(updateHeroSlide, 5500);

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const animateCounters = () => {
  const counters = document.querySelectorAll("[data-target]");

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const duration = 1700;
    const start = 0;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      counter.textContent = `${value}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  });
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", animateCounters);

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  formStatus.textContent = "Thanks. Your interest has been recorded for this demo website.";
});

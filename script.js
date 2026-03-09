// ===== TYPED TEXT EFFECT (Hero Section) =====
const phrases = ["a Developer", "a Cloud Learner", "an AWS Builder", "a Problem Solver"];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-name");

function typeEffect() {
  const phrase = phrases[currentPhrase];

  if (isDeleting) {
    typedEl.textContent = phrase.substring(0, currentChar - 1);
    currentChar--;
  } else {
    typedEl.textContent = phrase.substring(0, currentChar + 1);
    currentChar++;
  }

  if (!isDeleting && currentChar === phrase.length) {
    setTimeout(() => { isDeleting = true; }, 1500);
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

// Start typing effect
typeEffect();


// ===== SKILL BARS ANIMATION =====
// Animates the skill bars when they scroll into view
const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.getAttribute("data-width");
      entry.target.style.width = targetWidth;
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ===== COUNTER ANIMATION =====
// Counts up numbers when they scroll into view
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute("data-target"));
      let current = 0;
      const increment = target / 60;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          entry.target.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          entry.target.textContent = target;
        }
      };

      updateCounter();
      counterObserver.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


// ===== NAVBAR SCROLL EFFECT =====
// Makes navbar slightly more opaque when scrolled
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 20, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.4)";
  } else {
    navbar.style.background = "rgba(15, 15, 26, 0.95)";
    navbar.style.boxShadow = "none";
  }
});


// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===== CARD HOVER GLOW EFFECT =====
const cards = document.querySelectorAll(".about-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(129,140,248,0.08), rgba(255,255,255,0.02))`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "rgba(255, 255, 255, 0.04)";
  });
});


// ===== FADE-IN ANIMATION ON SCROLL =====
const sections = document.querySelectorAll(".section, .counter-section");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  fadeObserver.observe(section);
});


// ===== LOG TO CONSOLE =====
console.log("✅ Static website loaded successfully!");
console.log("☁️  Hosted on AWS S3 + CloudFront");
console.log("🚀 Part of Udacity / Accenture Cloud Learning Module");
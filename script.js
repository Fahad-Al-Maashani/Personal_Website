// script.js
document.addEventListener('DOMContentLoaded', () => {
  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // FADE-IN ON SCROLL
  const allSections = document.querySelectorAll('.section, .hero');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  allSections.forEach(sec => observer.observe(sec));

  // TESTIMONIAL SLIDER AUTO-PLAY
  const slides = document.querySelectorAll('.testimonial');
  let current = 0;
  const showSlide = idx => {
    slides.forEach((s,i) => s.classList.toggle('active', i === idx));
  };
  const nextSlide = () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  };
  showSlide(current);
  setInterval(nextSlide, 5000);
});

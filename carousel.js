const videos = document.querySelectorAll('.video-carousel video');
const carousel = document.querySelector('.video-carousel');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

function scrollByWidth(dir) {
  const video = carousel.querySelector('video');
  const gap = parseInt(getComputedStyle(carousel).gap);
  carousel.scrollBy({ left: dir * (video.offsetWidth + gap), behavior: 'smooth' });
}

prev.addEventListener('click', () => scrollByWidth(-1));
next.addEventListener('click', () => scrollByWidth(1));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      videos.forEach(v => { if (v !== entry.target) v.pause(); });
      entry.target.play();
    }
  });
}, {
  root: carousel,
  rootMargin: '0px',
  threshold: 0.6
});

videos.forEach(video => observer.observe(video));

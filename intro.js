const slides = Array.from(document.querySelectorAll('.slide'));
let currentSlide = 0;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = ((idx + 1) / slides.length * 100) + '%';
  }
}

document.getElementById('fullscreenBtn').onclick = function() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

document.getElementById('themeBtn').onclick = function() {
  document.body.classList.toggle('dark');
};

document.querySelector('.slideshow-container').addEventListener('click', function(e) {
  if (e.target.closest('.ppt-nav-btns')) return;
  if (currentSlide < slides.length - 1) {
    showSlide(++currentSlide);
  }
});

showSlide(currentSlide);

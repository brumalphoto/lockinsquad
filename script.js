document.addEventListener('DOMContentLoaded', () => {
  const docEl = document.documentElement;
  const splash = document.getElementById('splash');
  const prelockTitle = document.getElementById('prelock-title');
  const enterBtn = document.getElementById('enter-btn');
  const introAnim = document.getElementById('intro-animation');
  const bgVideo = document.getElementById('bg-video');
  const bgSource = document.getElementById('bg-source');
  const bgAudio = document.getElementById('bg-audio');
  const audioPlayer = document.getElementById('audio-player');
  const speakerToggle = document.getElementById('speaker-toggle');
  const hero = document.querySelector('.hero');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  // Start initial wine-up video
  bgVideo.muted = true;
  bgVideo.play().catch(() => {});

  // Hide scroll before reveal
  docEl.style.overflow = 'hidden';

  enterBtn.addEventListener('click', () => {
    // Fade splash out
    splash.classList.add('hidden');
    if (prelockTitle) {
      prelockTitle.classList.add('hidden');
      setTimeout(() => prelockTitle.remove(), 800);
    }

    // After splash fades, swap background to liquid.webm
    setTimeout(() => {
      bgSource.src = 'assets/liquid.webm';
      bgVideo.load();
      bgVideo.play().catch(() => {});

      // Instantly show main site content (under dragon)
      hero.classList.add('visible');
      main.classList.add('visible');
      footer.classList.add('visible');
      audioPlayer.style.display = 'flex';
      docEl.style.overflow = ''; // unlock scroll

      // Show dragon overlay last
      introAnim.style.display = 'flex';

      // Fade dragon away after 2s
      setTimeout(() => {
        introAnim.style.display = 'none';
      }, 2000);

      splash.remove();
    }, 600); // match splash fade time

    // Start music after user gesture
    bgAudio.muted = false;
    bgAudio.play().catch(() => {});
  });

  // Speaker toggle
  speakerToggle.addEventListener('click', () => {
    if (bgAudio.paused) bgAudio.play();
    else bgAudio.pause();
  });
});

// ─── Artist Hover Preview ───
const artistEls = document.querySelectorAll('.artist');
const preview = document.getElementById('artist-preview');
let hideTimeout;

artistEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    const imgSrc = el.getAttribute('data-img');
    preview.innerHTML = `<img src="${imgSrc}" alt="">`;
    preview.classList.add('visible');
  });

  el.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      preview.classList.remove('visible');
    }, 3000); // 3s after leaving hover
  });
});

// ─── Artist Slideshow ───
const slides = document.querySelectorAll('.artist-slide');
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].classList.add('exit');

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.remove('exit');
  slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
  slides[0].classList.add('active');
  setInterval(showNextSlide, 4000); // every 4 seconds
}
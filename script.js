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
  console.log("Script loaded:", window.location.pathname);

// 🧠 Skip splash if coming from a member page
if (window.location.search.includes('from=member')) {
  console.log("Bypassing splash (from member page)");

  const splash = document.getElementById('splash');
  const hero = document.querySelector('.hero');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const audioPlayer = document.getElementById('audio-player');

  if (splash) splash.style.display = 'none';

  [hero, main, footer].forEach(el => {
    if (el) {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    }
  });

  // Show the audio player too
  if (audioPlayer) audioPlayer.style.display = 'flex';

  // Unlock scroll immediately
  document.documentElement.style.overflow = '';

  // Smooth scroll to the members section after load
  window.addEventListener('load', () => {
    const membersSection = document.querySelector('#members');
    if (membersSection) {
      membersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Fallback: ensure footer visible if splash not found
if (!document.getElementById("splash")) {
  const footer = document.querySelector("footer");
  if (footer) {
    footer.style.opacity = "1";
    footer.style.visibility = "visible";
  }
}

// ✅ Autoplay logic for member pages
if (document.body.classList.contains('member-page')) {
  // Try to autoplay
  bgAudio.muted = false;
  bgAudio.play().then(() => {
    audioPlayer.classList.add('playing');
  }).catch(() => {
    // Show tap prompt if autoplay fails
    const tapPrompt = document.createElement('div');
    tapPrompt.textContent = '🔊 Tap to start audio';
    Object.assign(tapPrompt.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'cyan',
      fontFamily: "'Exo 2', sans-serif",
      fontSize: '1.4rem',
      textShadow: '0 0 12px cyan',
      zIndex: '999999',
      cursor: 'pointer',
      background: 'rgba(0, 0, 0, 0.75)',
      padding: '1rem 2rem',
      borderRadius: '12px',
      border: '1px solid cyan',
      boxShadow: '0 0 20px rgba(0,255,255,0.5)',
    });
    document.body.appendChild(tapPrompt);

    tapPrompt.addEventListener('click', () => {
      bgAudio.play().then(() => {
        audioPlayer.classList.add('playing');
        tapPrompt.remove();
      });
    });
  });
}

  // Start initial wine-up video
  bgVideo.muted = true;
  bgVideo.play().catch(() => {});

  // Hide scroll before reveal
  docEl.style.overflow = 'hidden';

// 🪄 Check if we should skip the splash
const urlParams = new URLSearchParams(window.location.search);
const skipSplash = urlParams.get('skipSplash') === 'true';

if (skipSplash && splash) {
  splash.style.opacity = '0';
  splash.style.pointerEvents = 'none';
  splash.style.transition = 'opacity 0.4s ease';

  if (prelockTitle) prelockTitle.remove();

  if (bgSource) {
    bgSource.src = 'assets/liquid.webm';
    bgVideo.load();
    bgVideo.addEventListener('loadeddata', () => {
      bgVideo.play().catch(() => {});
      if (hero) hero.classList.add('visible');
      if (main) main.classList.add('visible');
      if (footer) footer.classList.add('visible');
      if (audioPlayer) audioPlayer.style.display = 'flex';
      docEl.style.overflow = '';
    });
  }
}

if (enterBtn) {
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

splash.style.opacity = '0';
splash.style.pointerEvents = 'none';
splash.style.transition = 'opacity 0.4s ease';
    }); // match splash fade time

    // Start music after user gesture
    bgAudio.muted = false;
    bgAudio.play().catch(() => {});
  });
}

console.log("Loaded script for:", window.location.pathname);
console.log("Speaker toggle present:", !!document.querySelector("#speaker-toggle"));
console.log("Audio element present:", !!document.querySelector("#bg-audio"));

// ─── Speaker Toggle (works on all pages) ───
document.addEventListener("click", function (e) {
  const toggle = e.target.closest("#speaker-toggle");
  if (!toggle) return;

  const audio = document.querySelector("#bg-audio");
  const player = document.querySelector("#audio-player");

  if (!audio) {
    console.warn("No audio element found on this page.");
    return;
  }

  // Unmute always before playing
  audio.muted = false;

  if (audio.paused) {
    audio.play().then(() => {
      player.classList.add("playing");
      console.log("Audio started");
    }).catch((err) => console.error("Play blocked:", err));
  } else {
    audio.pause();
    player.classList.remove("playing");
    console.log("Audio paused");
  }
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

// Mark site as loaded once everything is visible (ensures footer always shows)
document.body.classList.add('loaded');
});
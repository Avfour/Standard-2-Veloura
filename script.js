/* ===== VELOURA — SCRIPT.JS ===== */

/* ===== LOADING SCREEN ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('hidden');
    }
  }, 1800);
});

/* ===== GATE — OPEN INVITATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  const btnOpen = document.getElementById('btn-open');
  const gateScreen = document.getElementById('gate-screen');
  const mainContent = document.getElementById('main-content');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      gateScreen.classList.add('hidden');
      mainContent.classList.add('visible');
      document.body.style.overflow = 'auto';

      // Trigger music
      tryPlayMusic();

      // Trigger reveal on visible elements after gate opens
      setTimeout(() => {
        triggerReveal();
      }, 100);
    });
  }

  // Lock scroll on gate
  document.body.style.overflow = 'hidden';
});

/* ===== COUNTDOWN TIMER ===== */
function updateCountdown() {
  const weddingDate = new Date('2026-12-12T08:00:00');
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const el = (id) => document.getElementById(id);
  if (el('cd-days')) el('cd-days').textContent = String(days).padStart(2, '0');
  if (el('cd-hours')) el('cd-hours').textContent = String(hours).padStart(2, '0');
  if (el('cd-mins')) el('cd-mins').textContent = String(mins).padStart(2, '0');
  if (el('cd-secs')) el('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ===== SCROLL REVEAL ===== */
function triggerReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', triggerReveal);

/* ===== MUSIC ===== */
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
let isMuted = false;

function tryPlayMusic() {
  if (!audio) return;
  audio.volume = 0.4;
  audio.loop = true;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        setMusicPlaying(true);
      })
      .catch(() => {
        setMusicPlaying(false);
      });
  }
}

function setMusicPlaying(playing) {
  if (!musicBtn) return;
  if (playing) {
    musicBtn.classList.add('playing');
    if (iconPlay) iconPlay.style.display = 'none';
    if (iconPause) iconPause.style.display = 'block';
  } else {
    musicBtn.classList.remove('playing');
    if (iconPlay) iconPlay.style.display = 'block';
    if (iconPause) iconPause.style.display = 'none';
  }
}

if (musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setMusicPlaying(true);
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  });
}

/* ===== GALLERY LIGHTBOX ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    if (lightboxImg) lightboxImg.src = src;
    if (lightbox) lightbox.classList.add('active');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox) lightbox.classList.remove('active');
});

/* ===== SMOOTH SCROLL for anchors ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== PARALLAX on couple photos ===== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Subtle parallax on gate bg
  const gateBg = document.querySelector('.gate-bg img');
  if (gateBg) {
    gateBg.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
});
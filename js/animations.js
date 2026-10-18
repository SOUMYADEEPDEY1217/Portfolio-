/**
 * SOUMYADEEP DEY — ADVANCED MOTION & INTERACTION ENGINE
 * Typewriter role switcher, scroll reveal observers, skill progress bars,
 * ambient particle background, and back-to-top controller.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. TYPEWRITER EFFECT
  const ROLES = [
    'Full-Stack Developer',
    'AI/ML Enthusiast',
    'Backend Developer',
    'Python Developer',
    'Cybersecurity Learner',
    'Cloud & AI Explorer'
  ];

  function initTypewriter() {
    const roleElem = document.getElementById('typewriter-role');
    if (!roleElem) return;

    if (prefersReducedMotion) {
      roleElem.textContent = ROLES[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentRole = ROLES[roleIndex];

      if (isDeleting) {
        roleElem.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        roleElem.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        typeSpeed = 400; // Pause before new word
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // 2. SCROLL REVEAL OBSERVER
  function initScrollReveals() {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Animate any skill bars inside
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach((bar) => {
              const width = bar.getAttribute('data-width') || '0%';
              bar.style.width = width;
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
  }

  // 3. AMBIENT BACKGROUND PARTICLES
  function initBackgroundParticles() {
    const canvas = document.getElementById('bg-particles-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    const particles = [];
    const NUM_PARTICLES = window.innerWidth < 768 ? 25 : 55;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.6 ? '#FF9800' : '#64748B'
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  // 4. BACK TO TOP BUTTON
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initialization
  function init() {
    initTypewriter();
    initScrollReveals();
    initBackgroundParticles();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

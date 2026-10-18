/**
 * SOUMYADEEP DEY — PORTFOLIO MAIN ORCHESTRATOR
 * Navigation glassmorphism, mobile drawer, section observer,
 * contact form handling with mailto fallback, and dynamic footer.
 */

(function () {
  'use strict';

  // 1. NAVBAR SCROLL GLASSMORPHISM & ACTIVE SECTION HIGHLIGHT
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // IntersectionObserver for active link highlight
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const currentId = entry.target.getAttribute('id');
              navLinks.forEach((link) => {
                if (link.getAttribute('href') === `#${currentId}`) {
                  link.classList.add('active');
                } else {
                  link.classList.remove('active');
                }
              });
            }
          });
        },
        { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' }
      );

      sections.forEach((sec) => sectionObserver.observe(sec));
    }
  }

  // 2. MOBILE NAVIGATION DRAWER
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    function toggleMenu() {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      navMenu.classList.add('open');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // 3. CONTACT FORM VALIDATION & SUBMISSION
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusMsg = document.getElementById('form-status-msg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      // Client-side validation
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please provide a valid email address.', 'error');
        return;
      }

      // Generate mailto fallback link to ensure message delivery
      const mailtoUrl = `mailto:rohan.dey1206@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${subject} - ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      showStatus('Launching your email client to dispatch the message...', 'success');

      setTimeout(() => {
        window.location.href = mailtoUrl;
        form.reset();
      }, 700);
    });

    function showStatus(msg, type) {
      if (!statusMsg) return;
      statusMsg.textContent = msg;
      statusMsg.className = `form-status ${type}`;
    }
  }

  // 4. CERTIFICATE PREVIEW MODAL
  function initCertificateModal() {
    const certButtons = document.querySelectorAll('.view-cert-btn');
    const modal = document.getElementById('cert-modal');
    const closeBtn = document.getElementById('cert-modal-close');
    const titleSlot = document.getElementById('cert-modal-title');
    const issuerSlot = document.getElementById('cert-modal-issuer');
    const dateSlot = document.getElementById('cert-modal-date');
    const descSlot = document.getElementById('cert-modal-desc');

    if (!modal) return;

    certButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title') || 'Certificate';
        const issuer = btn.getAttribute('data-issuer') || 'Authorized Issuer';
        const date = btn.getAttribute('data-date') || '2026';
        const desc = btn.getAttribute('data-desc') || 'Verified credential in technical domain.';

        if (titleSlot) titleSlot.textContent = title;
        if (issuerSlot) issuerSlot.textContent = issuer;
        if (dateSlot) dateSlot.textContent = `Issued: ${date}`;
        if (descSlot) descSlot.textContent = desc;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeCertModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCertModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeCertModal();
      }
    });
  }

  // 5. DYNAMIC FOOTER YEAR
  function initFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // Bootstrap
  function init() {
    initNavbar();
    initMobileMenu();
    initContactForm();
    initCertificateModal();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

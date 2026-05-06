// Cozy Cafe — JavaScript
(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Contact form validation ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Name validation
      const name = document.getElementById('name');
      const nameGroup = name.closest('.form-group');
      if (!name.value.trim()) {
        nameGroup.classList.add('error');
        isValid = false;
      } else {
        nameGroup.classList.remove('error');
      }

      // Email validation
      const email = document.getElementById('email');
      const emailGroup = email.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        emailGroup.classList.add('error');
        isValid = false;
      } else {
        emailGroup.classList.remove('error');
      }

      // Subject validation
      const subject = document.getElementById('subject');
      const subjectGroup = subject.closest('.form-group');
      if (!subject.value.trim()) {
        subjectGroup.classList.add('error');
        isValid = false;
      } else {
        subjectGroup.classList.remove('error');
      }

      // Message validation
      const message = document.getElementById('message');
      const messageGroup = message.closest('.form-group');
      if (!message.value.trim()) {
        messageGroup.classList.add('error');
        isValid = false;
      } else {
        messageGroup.classList.remove('error');
      }

      if (isValid) {
        // Show success message
        const successEl = document.getElementById('formSuccess');
        if (successEl) {
          successEl.classList.add('visible');
        }
        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Message Sent!';
        }
        // Reset form
        contactForm.reset();
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        this.closest('.form-group').classList.remove('error');
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Intersection Observer for fade-in animation ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for fade-in
  document.querySelectorAll('.feature-card, .popular-card, .value-card, .atmosphere-card, .menu-item, .contact-detail-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

})();
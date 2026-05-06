// Cozy Cafe — JavaScript
(function () {
  "use strict";

  // --- Scroll progress bar ---
  var progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.width = "0%";
  document.body.appendChild(progressBar);

  window.addEventListener(
    "scroll",
    function () {
      var scrollTop = window.pageYOffset;
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + "%";
    },
    { passive: true },
  );

  // --- Navbar scroll effect ---
  var navbar = document.getElementById("navbar");
  if (navbar) {
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(function () {
            if (window.pageYOffset > 50) {
              navbar.classList.add("scrolled");
            } else {
              navbar.classList.remove("scrolled");
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  // Create overlay for mobile nav
  var navOverlay = document.createElement("div");
  navOverlay.className = "nav-overlay";
  document.body.appendChild(navOverlay);

  function closeMobileNav() {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    navLinks.classList.add("open");
    navToggle.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    navOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      if (navLinks.classList.contains("open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileNav();
      });
    });

    navOverlay.addEventListener("click", closeMobileNav);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeMobileNav();
      }
    });
  }

  // --- Contact form validation ---
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var isValid = true;

      var name = document.getElementById("name");
      var nameGroup = name.closest(".form-group");
      if (!name.value.trim()) {
        nameGroup.classList.add("error");
        isValid = false;
      } else {
        nameGroup.classList.remove("error");
      }

      var email = document.getElementById("email");
      var emailGroup = email.closest(".form-group");
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        emailGroup.classList.add("error");
        isValid = false;
      } else {
        emailGroup.classList.remove("error");
      }

      var subject = document.getElementById("subject");
      var subjectGroup = subject.closest(".form-group");
      if (!subject.value.trim()) {
        subjectGroup.classList.add("error");
        isValid = false;
      } else {
        subjectGroup.classList.remove("error");
      }

      var message = document.getElementById("message");
      var messageGroup = message.closest(".form-group");
      if (!message.value.trim()) {
        messageGroup.classList.add("error");
        isValid = false;
      } else {
        messageGroup.classList.remove("error");
      }

      if (isValid) {
        var successEl = document.getElementById("formSuccess");
        if (successEl) {
          successEl.classList.add("visible");
        }
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Message Sent!";
          submitBtn.style.opacity = "0.7";
        }
        contactForm.reset();
        contactForm.querySelectorAll(".form-group").forEach(function (g) {
          g.classList.remove("error");
        });
      }
    });

    contactForm.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        this.closest(".form-group").classList.remove("error");
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- Staggered Intersection Observer ---
  function createStaggerObserver(selector, baseDelay) {
    baseDelay = baseDelay || 80;
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var parent = entry.target.parentElement;
            var siblings = parent
              ? Array.from(parent.querySelectorAll(selector))
              : [];
            var index = siblings.indexOf(entry.target);
            var delay = index >= 0 ? index * baseDelay : 0;

            setTimeout(function () {
              entry.target.classList.add("visible");
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Staggered card animations
  createStaggerObserver(".feature-card", 100);
  createStaggerObserver(".popular-card", 120);
  createStaggerObserver(".value-card", 100);
  createStaggerObserver(".atmosphere-card", 120);
  createStaggerObserver(".menu-item", 60);
  createStaggerObserver(".contact-detail-item", 100);

  // Single element reveal animations
  var singleElements = document.querySelectorAll(
    ".section-header, .story-image, .story-content, .cta-content, .menu-category-header, .contact-info, .contact-form-wrapper, .map-section, .menu-note, .footer",
  );
  var singleObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          singleObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  singleElements.forEach(function (el) {
    singleObserver.observe(el);
  });

  // --- Keyboard nav indicator ---
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });
  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-nav");
  });
})();

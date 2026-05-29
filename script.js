/* ==========================================================================
   Country Car Show — script.js
   --------------------------------------------------------------------------
   This file does only the small things plain HTML cannot:
     1. Marks the document as JS-enabled, then wires up the collapsible
        navigation (the hamburger menu) for small screens. With JS off, the
        nav stays visible — progressive enhancement, nothing breaks.
     2. Updates the copyright year in the footer.
     3. Validates the pre-registration form on submit (showing clear error
        messages above each invalid field), then shows a placeholder
        confirmation panel because the real backend is not wired up yet.
        When a real backend is added (Formspree / Netlify / Google Forms —
        see event-2026.html for setup notes), replace the placeholder branch
        with the appropriate submit logic.

   It is deliberately small. There are no third-party libraries.
   ========================================================================== */

(function () {
  "use strict";

  // ----- 1. Collapsible navigation (hamburger) ---------------------------
  // Add a marker class so the stylesheet can switch from "always visible nav"
  // (no-JS fallback) to "collapsed behind a button on small screens".
  document.body.classList.add("js-nav");

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("primary-nav");

  function closeNav() {
    if (!header || !navToggle) return;
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    if (!header || !navToggle) return;
    header.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  if (header && navToggle && siteNav) {
    // Start collapsed on small screens.
    navToggle.setAttribute("aria-expanded", "false");

    navToggle.addEventListener("click", function () {
      var isOpen = header.classList.contains("nav-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close when a nav link is clicked (so the menu doesn't stay open after
    // navigating to a section/page).
    siteNav.addEventListener("click", function (e) {
      if (e.target && e.target.closest("a")) {
        closeNav();
      }
    });

    // Close on Escape, and return focus to the toggle for keyboard users.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("nav-open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  // ----- 2. Copyright year ------------------------------------------------
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ----- 3. Form validation ----------------------------------------------
  var form = document.getElementById("registration-form");
  var placeholderPanel = document.getElementById("form-placeholder");
  var errorPanel = document.getElementById("form-error");

  // Friendlier wording than the browser's default validity messages.
  var FIELD_LABELS = {
    name: "your full name",
    email: "a valid email address",
    phone: "a phone number we can reach you at",
    "vehicle-year": "the year of your vehicle",
    "vehicle-make": "the make and model of your vehicle"
  };

  function setError(field, message) {
    var row = field.closest(".form-row");
    var errorEl = document.getElementById(field.id + "-error");
    if (row) row.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  }

  function validateField(field) {
    if (!field.willValidate) return true;
    if (field.checkValidity()) {
      setError(field, "");
      return true;
    }
    var label = FIELD_LABELS[field.name] || "this field";
    var msg;
    if (field.validity.valueMissing) {
      msg = "Please enter " + label + ".";
    } else if (field.validity.typeMismatch && field.type === "email") {
      msg = "Please enter a valid email address (for example, name@example.com).";
    } else if (field.validity.badInput) {
      msg = "Please enter a valid value for " + label + ".";
    } else {
      msg = "Please check this field.";
    }
    setError(field, msg);
    return false;
  }

  function showPlaceholder() {
    // Until the form's backend is wired up, surface a polite "email us
    // directly" message so visitors aren't left wondering what happened.
    if (errorPanel) errorPanel.hidden = true;
    if (placeholderPanel) {
      placeholderPanel.hidden = false;
      placeholderPanel.setAttribute("tabindex", "-1");
      placeholderPanel.focus({ preventScroll: true });
      placeholderPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  if (form) {
    // Validate each field as the visitor leaves it (only after first submit attempt).
    var hasAttemptedSubmit = false;
    form.addEventListener("input", function (e) {
      if (!hasAttemptedSubmit) return;
      if (e.target && e.target.matches("input, select, textarea")) {
        validateField(e.target);
      }
    }, true);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hasAttemptedSubmit = true;
      if (errorPanel) errorPanel.hidden = true;

      // Validate every required field. Focus the first invalid one.
      var fields = form.querySelectorAll("input, select, textarea");
      var firstInvalid = null;
      fields.forEach(function (field) {
        if (field.type === "hidden") return;
        var ok = validateField(field);
        if (!ok && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // All clear — but the real submit endpoint isn't set up yet, so show
      // the placeholder message. When you wire a real backend (Formspree,
      // Netlify, etc.), replace this branch with a fetch() to that endpoint.
      showPlaceholder();
    });
  }

})();

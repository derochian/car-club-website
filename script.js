/* ==========================================================================
   [CLUB_NAME] — script.js
   --------------------------------------------------------------------------
   This file does only the small things plain HTML cannot:
     1. Updates the copyright year in the footer.
     2. When a "Register for this event" button is clicked, pre-selects the
        matching event in the registration form's dropdown.
     3. Validates the registration form on submit (showing clear error
        messages above each invalid field) and submits via fetch() to
        Netlify Forms so the visitor stays on the page.
     4. If a visitor lands on the page with "?registered=true" in the URL
        (the no-JavaScript fallback for the form's action attribute), shows
        the same thank-you panel.

   It is deliberately small. There are no third-party libraries.
   ========================================================================== */

(function () {
  "use strict";

  // ----- 1. Copyright year ------------------------------------------------
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ----- 2. Pre-select event when "Register for this event" is clicked ---
  var eventSelect = document.getElementById("event");
  document.querySelectorAll("[data-event]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!eventSelect) return;
      var name = btn.getAttribute("data-event");
      var match = Array.prototype.find.call(eventSelect.options, function (opt) {
        return opt.value === name;
      });
      if (match) {
        eventSelect.value = name;
      }
    });
  });

  // ----- 3. Form validation + AJAX submit --------------------------------
  var form = document.getElementById("registration-form");
  var successPanel = document.getElementById("form-success");
  var errorPanel = document.getElementById("form-error");

  // Friendlier wording than the browser's default validity messages.
  var FIELD_LABELS = {
    name: "your full name",
    email: "a valid email address",
    phone: "a phone number we can reach you at",
    event: "which event you'd like to attend",
    attendees: "the number of attendees (1 to 10)"
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
    } else if (field.validity.rangeUnderflow || field.validity.rangeOverflow) {
      msg = "Please enter a number between 1 and 10.";
    } else if (field.validity.badInput) {
      msg = "Please enter a valid value for " + label + ".";
    } else {
      msg = "Please check this field.";
    }
    setError(field, msg);
    return false;
  }

  function clearAllErrors() {
    if (!form) return;
    form.querySelectorAll(".form-row.has-error").forEach(function (row) {
      row.classList.remove("has-error");
    });
    form.querySelectorAll(".field-error").forEach(function (el) {
      el.textContent = "";
    });
  }

  function showSuccess() {
    if (form) form.hidden = true;
    if (errorPanel) errorPanel.hidden = true;
    if (successPanel) {
      successPanel.hidden = false;
      // Move keyboard focus and scroll to the confirmation.
      successPanel.setAttribute("tabindex", "-1");
      successPanel.focus({ preventScroll: true });
      successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function showSubmitError() {
    if (errorPanel) {
      errorPanel.hidden = false;
      errorPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function encodeFormData(formEl) {
    var data = new FormData(formEl);
    var pairs = [];
    data.forEach(function (value, key) {
      pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    });
    return pairs.join("&");
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
        if (field.name === "bot-field" || field.type === "hidden") return;
        var ok = validateField(field);
        if (!ok && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // All clear — submit to Netlify in the background.
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting…";
      }

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(form)
      })
        .then(function (response) {
          if (response.ok) {
            showSuccess();
          } else {
            showSubmitError();
          }
        })
        .catch(function () {
          showSubmitError();
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Registration";
          }
        });
    });
  }

  // ----- 4. No-JS fallback: show success when arriving with ?registered=true
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "true") {
      showSuccess();
    }
  } catch (e) { /* old browser — silently ignore */ }

})();

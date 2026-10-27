/* =========================================
   NAYAE WEBSITE — SHARED JAVASCRIPT
   Navigation, footer and form submissions
   ========================================= */

/* ---------- HEADER AND NAVIGATION ---------- */

const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");

if (header) {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const links = [
    ["Home", "index.html"],
    ["About Us", "about.html"],
    ["AI Security Solutions", "solutions.html"],
    ["Pipeline Protection", "pipeline.html"],
    ["Industries", "industries.html"],
    ["Our Services", "services.html"],
    ["Contact Us", "contact.html"]
  ];

  header.innerHTML = `
    <header class="site-header">
      <div class="navbar">

         <a href="index.html" class="logo" aria-label="Nayae home">
  <span class="logo-symbol">N</span>

  <span class="logo-text">
    <strong>NAYAE</strong>
    <span>CONSULTING & ENERGY</span>
    <span>PROJECTS LTD.</span>
  </span>
</a>

        <button
          class="menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          ☰
        </button>

        <nav class="nav-links" aria-label="Main navigation">
          ${links.map(([label, href]) => `
            <a
              href="${href}"
              ${currentPage === href ? 'aria-current="page"' : ""}
            >${label}</a>
          `).join("")}
        </nav>

        <a class="nav-cta" href="contact.html">
          Request a Consultation
        </a>

      </div>
    </header>
  `;

  /* Mobile navigation */

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".nav-links");

  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));

    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    toggle.textContent = isOpen ? "✕" : "☰";
  });
}


/* ---------- FOOTER ---------- */

if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">

        <div class="footer-grid">

          <div>
            <a class="footer-brand" href="index.html">
              NAYAE
              <span>CONSULTING & ENERGY PROJECTS LTD.</span>
            </a>

            <p>
              Intelligent security and critical infrastructure protection.
            </p>
          </div>

          <div>
            <h3>Explore</h3>

            <div class="footer-links">
              <a href="about.html">About Us</a>
              <a href="solutions.html">AI Security Solutions</a>
              <a href="pipeline.html">Pipeline Protection</a>
              <a href="industries.html">Industries We Serve</a>
              <a href="services.html">Our Services</a>
            </div>
          </div>

          <div>
            <h3>Get in touch</h3>

            <div class="footer-links">
              <a href="contact.html">Contact Us</a>
              <a href="demo.html">Request a Demo</a>
              <a href="privacy.html">Privacy Policy</a>
            </div>

            <p class="small-note">
              Email:
              <a href="mailto:nayaeconsult@gmail.com">
                nayaeconsult@gmail.com
              </a>
              <br>
              Telephone: +1 905-462-7349
            </p>
          </div>

        </div>

        <div class="footer-bottom">
          © <span id="year"></span>
          Nayae Consulting & Energy Projects Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  `;

  const year = footer.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}


/* ---------- FORM SUBMISSIONS ---------- */

/*
  Both forms submit to Formspree.
  The success message appears only after a successful HTTP response.
*/

function setupForm(formId, statusId, successMessage) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);

  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Check required fields and input formats.
    if (!form.reportValidity()) return;

    const submitButton = form.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    const originalButtonText = submitButton
      ? submitButton.textContent
      : "";

    // Clear any previous message.
    status.textContent = "";
    status.classList.remove("success", "error");

    // Prevent duplicate submissions while sending.
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Formspree did not accept the submission.");
      }

      // Clear the fields only after the submission is accepted.
      form.reset();

      status.textContent = successMessage;
      status.classList.add("success");

    } catch (error) {
      status.textContent =
        "We couldn't submit your request. Please check your internet connection and try again.";

      status.classList.add("error");

      console.error("Form submission failed:", error);

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}


/* Contact enquiry form */

setupForm(
  "contact-form",
  "form-status",
  "Your enquiry has been submitted successfully. Thank you for contacting Nayae!"
);


/* Demo request form */

setupForm(
  "demo-form",
  "demo-status",
  "Your demo request has been submitted successfully. Thank you for your interest in Nayae!"
);
/* Shared navigation, footer and form demo behaviour. */
const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");

if (header) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
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
          NAYAE
          <span>CONSULTING &amp; ENERGY PROJECTS LTD.</span>
        </a>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false">☰</button>
        <nav class="nav-links" aria-label="Main navigation">
          ${links.map(([label, href]) => `<a href="${href}" ${currentPage === href ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <a class="nav-cta" href="contact.html">Request a Consultation</a>
      </div>
    </header>`;

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".nav-links");
  toggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    toggle.textContent = isOpen ? "✕" : "☰";
  });
}

if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="footer-brand" href="index.html">NAYAE<span>CONSULTING &amp; ENERGY PROJECTS LTD.</span></a>
            <p>Intelligent security and critical infrastructure protection. Replace this text with Nayae's approved company description before launch.</p>
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
            <p class="small-note">Add official email and telephone details before launch.</p>
          </div>
        </div>
        <div class="footer-bottom">© <span id="year"></span> Nayae Consulting &amp; Energy Projects Ltd. All rights reserved.</div>
      </div>
    </footer>`;
  const year = footer.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

/*
  IMPORTANT: This demo only validates the form in the browser.
  It does NOT send, store or email the submitted information.
  Connect to an approved backend/form service before publishing.
*/
function setupDemoForm(formId, statusId) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = "The form looks valid, but it is not connected to an email service yet. Please connect an approved form service before launch.";
    status.style.color = "#8a5b00";
  });
}

setupDemoForm("contact-form", "form-status");
setupDemoForm("demo-form", "demo-status");

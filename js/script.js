const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

document.querySelector("#year").textContent = new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Highlight the navigation link for the visible section
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}

// Validate the form and prepare a mailto message.
// Replace the placeholder address in index.html before using this form.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const fields = [...contactForm.querySelectorAll("input, textarea")];
  let firstInvalid = null;

  fields.forEach((field) => {
    const value = field.value.trim();
    let valid = field.checkValidity() && value.length > 0;

    if (field.type === "email") {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    field.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    formStatus.textContent = "Please check the highlighted fields and enter valid information.";
    formStatus.classList.add("error");
    firstInvalid.focus();
    return;
  }

  const emailLink = document.querySelector("#emailLink");
  const recipient = emailLink.textContent.trim();
  if (!recipient || recipient.includes("YOUR_EMAIL") || !recipient.includes("@")) {
    formStatus.textContent = "Please check that a valid contact email is configured on the portfolio before using the form.";
    formStatus.classList.add("error");
    return;
  }

  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(formData.get("subject").trim());
  const body = encodeURIComponent(
    `Name: ${formData.get("name").trim()}\nEmail: ${formData.get("email").trim()}\n\n${formData.get("message").trim()}`
  );

  formStatus.textContent = "Your details look good. Opening your email app…";
  formStatus.classList.add("success");
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") {
      field.removeAttribute("aria-invalid");
    }
  });
});

// Update these links with your actual profile URLs before publishing.
document.querySelector("#linkedinLink").addEventListener("click", (event) => {
  if (event.currentTarget.getAttribute("href") === "#") {
    event.preventDefault();
    alert("Add your actual LinkedIn profile URL in index.html before publishing.");
  }
});

// Project detail dialogs: each card opens a keyboard-accessible modal.
const projectDetails = {
  sahi: {
    eyebrow: "FULL-STACK WEB APPLICATION · COMPLETED",
    title: "Sahi E-Commerce Website",
    summary: "A full-stack e-commerce website designed to support shopping flows for customers and management tasks for administrators.",
    overview: "Built with a React frontend and a Spring Boot backend connected to MySQL. The project brings product browsing and common shopping actions together in one application.",
    features: ["Customer and admin role structure", "Cart and wishlist workflows", "Order-related functionality", "REST API backend with JWT-based authentication", "Relational data storage using MySQL"],
    tech: ["React", "Java", "Spring Boot", "MySQL", "JWT", "REST API"],
    links: [{ label: "View source on GitHub", url: "https://github.com/shenbagakasthuri/Sahi-E-Commerce-Website", primary: true }]
  },
  plant: {
    eyebrow: "FULL-STACK WEB APPLICATION · COMPLETED",
    title: "Plant Care Scheduler",
    summary: "A plant-care webpage that helps users organize recurring care routines and keep key plant information together.",
    overview: "The project uses React for the user interface, Spring Boot for backend APIs, and MySQL for data persistence. Plant details include care-related fields such as watering frequency, sunlight hours, and fertilizing frequency.",
    features: ["Create, view, update, and delete plant records", "Store plant names and care preferences", "Organize watering and fertilizing information", "Connect the frontend to REST API endpoints"],
    tech: ["React", "Java", "Spring Boot", "MySQL", "REST API"]
  },
  mehendi: {
    eyebrow: "FRONTEND WEBSITE · HOSTED ON NETLIFY",
    title: "Mehandi Studio Website",
    summary: "A studio showcase website created to present mehandi artistry and designs through a visual gallery.",
    overview: "The website focuses on showcasing the artist's work and providing visitors with a simple way to explore the studio's style. It is a portfolio/showcase experience rather than a direct online booking system.",
    features: ["Mehandi design gallery and visual showcase", "Studio-focused layout and presentation", "Responsive page layout for different screen sizes", "Hosted on Netlify"],
    tech: ["HTML", "CSS", "JavaScript", "Netlify"]
  },
  scholarpath: {
    eyebrow: "AI + WEB APPLICATION · IN PROGRESS",
    title: "ScholarPath",
    summary: "A scholarship discovery concept intended to help students find opportunities that match their profile and eligibility.",
    overview: "The planned application combines a React interface with a Spring Boot and MySQL backend. The core idea is to make scholarship information easier to explore and to guide students through eligibility-related details.",
    features: ["Scholarship discovery and filtering concept", "Student profile and eligibility information", "Planned personalized recommendations", "Designed around a real student information need"],
    tech: ["React", "Java", "Spring Boot", "MySQL", "AI/RAG concept"]
  },
  subscription: {
    eyebrow: "FULL-STACK WEB APPLICATION · IN PROGRESS",
    title: "SubscriptionTracker",
    summary: "A subscription management application for recording recurring services, billing cycles, payment methods, and status.",
    overview: "The backend uses Spring Boot and MySQL with JWT authentication. Subscription records are scoped to the authenticated user, and REST endpoints support common CRUD operations.",
    features: ["Create, view, update, and delete subscriptions", "Track category, billing cycle, payment method, and status", "JWT-based authentication", "User-scoped subscription access", "Backend tests for core behavior"],
    tech: ["Java", "Spring Boot", "MySQL", "JWT", "REST API"]
  },
  aquatic: {
    eyebrow: "FINAL-YEAR IoT + AI ACADEMIC PROJECT",
    title: "IoT-Based Aquatic Pollution Monitoring",
    summary: "A prototype that combines water pH monitoring, floating-waste image analysis, and a small surface-debris recovery mechanism.",
    overview: "The prototype uses an ESP32-CAM for waste imagery, a pH sensor for water readings, and a controller connected over Wi-Fi to a host computer for monitoring. A servo-operated collection container demonstrates surface debris recovery.",
    features: ["Monitor pH readings from a water body", "Capture images for floating-waste analysis", "Display monitoring data on a host computer", "Demonstrate servo-operated surface debris collection"],
    tech: ["ESP32-CAM", "NodeMCU", "pH sensor", "Computer Vision", "IoT", "Servo motor"]
  }
};

const projectModal = document.querySelector("#projectModal");
const modalClose = document.querySelector("#modalClose");
const modalTitle = document.querySelector("#modalTitle");
const modalEyebrow = document.querySelector("#modalEyebrow");
const modalSummary = document.querySelector("#modalSummary");
const modalOverview = document.querySelector("#modalOverview");
const modalFeatures = document.querySelector("#modalFeatures");
const modalTech = document.querySelector("#modalTech");
const modalActions = document.querySelector("#modalActions");
let lastProjectTrigger = null;

function openProjectDetails(projectKey, trigger) {
  const project = projectDetails[projectKey];
  if (!project || !projectModal) return;
  lastProjectTrigger = trigger;
  modalEyebrow.textContent = project.eyebrow;
  modalTitle.textContent = project.title;
  modalSummary.textContent = project.summary;
  modalOverview.textContent = project.overview;
  modalFeatures.replaceChildren();
  project.features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    modalFeatures.append(item);
  });
  modalTech.replaceChildren();
  project.tech.forEach((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    modalTech.append(tag);
  });
  modalActions.replaceChildren();
  (project.links || []).forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = link.label;
    if (link.primary) anchor.classList.add("modal-primary-link");
    modalActions.append(anchor);
  });
  if (typeof projectModal.showModal === "function") projectModal.showModal();
  else projectModal.setAttribute("open", "");
  modalClose.focus();
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProjectDetails(button.dataset.project, button));
});

modalClose?.addEventListener("click", () => projectModal.close());
projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) projectModal.close();
});
projectModal?.addEventListener("close", () => {
  if (lastProjectTrigger) lastProjectTrigger.focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal?.open) projectModal.close();
});

// Reveal section content as it enters the viewport; respect reduced-motion settings.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

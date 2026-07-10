document.documentElement.classList.add("js");

const BUSINESS = window.BUSINESS_CONFIG;

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const phoneLinks = document.querySelectorAll("[data-phone-link]");
const productLinks = document.querySelectorAll("[data-product]");
const googleReviewsLink = document.querySelector("[data-google-reviews]");
const floatingWhatsapp = document.querySelector(".floating-whatsapp");
const floatingBlockers = new Set();

const buildWhatsappUrl = (message = BUSINESS.messages.default) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

whatsappLinks.forEach((link) => {
  const messageKey = link.dataset.message;
  const message = messageKey ? BUSINESS.messages[messageKey] : BUSINESS.messages.default;
  link.href = buildWhatsappUrl(message);
  link.target = "_blank";
  link.rel = "noopener";
});

phoneLinks.forEach((link) => {
  link.href = `tel:+${BUSINESS.phone}`;
});

productLinks.forEach((link) => {
  const message = BUSINESS.messages.products[link.dataset.product] || BUSINESS.messages.default;
  link.href = buildWhatsappUrl(message);
  link.target = "_blank";
  link.rel = "noopener";
});

document.querySelectorAll("[data-business-hours]").forEach((element) => {
  element.textContent = BUSINESS.hours;
});

document.querySelectorAll("[data-business-city]").forEach((element) => {
  element.textContent = BUSINESS.city;
});

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

if (googleReviewsLink) {
  if (BUSINESS.googleReviews) {
    googleReviewsLink.href = BUSINESS.googleReviews;
  } else {
    googleReviewsLink.removeAttribute("href");
    googleReviewsLink.removeAttribute("target");
    googleReviewsLink.setAttribute("aria-disabled", "true");
    googleReviewsLink.title = "Link das avaliações ainda não informado";
  }
}

const closeMenu = () => {
  nav?.classList.remove("is-open");
  menuButton?.classList.remove("is-active");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", isOpen);
  menuButton.classList.toggle("is-active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  floatingWhatsapp?.classList.toggle(
    "is-visible",
    window.scrollY > 460 && floatingBlockers.size === 0
  );
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const floatingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        floatingBlockers.add(entry.target);
      } else {
        floatingBlockers.delete(entry.target);
      }
    });
    updateHeader();
  });

  document.querySelectorAll(".final-cta, .site-footer").forEach((section) => {
    floatingObserver.observe(section);
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -40px", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

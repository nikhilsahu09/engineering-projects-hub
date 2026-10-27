
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("[data-page]");
  const homePanel = document.getElementById("home");
  const projectPanels = document.querySelectorAll(".project-panel");
  const sidebar = document.querySelector(".sidebar");

  function showPage(pageName) {
    const isHome = pageName === "home";

    if (homePanel) {
      homePanel.hidden = !isHome;
    }

    projectPanels.forEach((panel) => {
      panel.hidden = panel.id !== pageName;
    });

    navLinks.forEach((link) => {
      const isActive = link.dataset.page === pageName;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (!isHome) {
      const activePanel = document.getElementById(pageName);

      if (activePanel) {
        activePanel.scrollTop = 0;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(link.dataset.page);
    });
  });

  document.querySelectorAll("[data-open-page]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(link.dataset.openPage);
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Keep ordinary external document and photo links working.
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.rel = "noopener noreferrer";
  });

  // If a photo link is unavailable, show a readable fallback.
  document.querySelectorAll(".photo-card img").forEach((img) => {
    img.addEventListener("error", () => {
      img.alt = "This photo could not load. Open the original source link below.";
      img.style.minHeight = "120px";
    });
  });

  // Start on the homepage.
  showPage("home");
});

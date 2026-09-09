/* =========================================================
   LES ATELIERS DE LUCE — JavaScript léger (vanilla)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Révélations au défilement ---- */
  const revealTargets = document.querySelectorAll('main > section:not(.hero), .site-footer');

  document.body.classList.add('has-motion');
  revealTargets.forEach((target) => target.classList.add('reveal-target'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  /* ---- Menu mobile ---- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    // Ferme le menu au clic sur un lien (utile en navigation une page)
    nav.querySelectorAll('.nav__link, .nav__cta').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }

  /* ---- Année dynamique dans le footer ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Onglets des prestations ---- */
  const tabsRoot = document.querySelector('[data-tabs]');

  if (tabsRoot) {
    const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
    const panels = [...tabsRoot.querySelectorAll('[role="tabpanel"]')];

    const activateTab = (selectedTab) => {
      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.classList.toggle('is-active', isSelected);
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });

      panels.forEach((panel) => {
        const isSelected = panel.id === selectedTab.getAttribute('aria-controls');
        panel.hidden = !isSelected;
        panel.classList.toggle('is-active', isSelected);
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));

      tab.addEventListener('keydown', (event) => {
        const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1
          : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1
          : 0;

        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          const target = event.key === 'Home' ? tabs[0] : tabs[tabs.length - 1];
          activateTab(target);
          target.focus();
        } else if (direction) {
          event.preventDefault();
          const nextIndex = (index + direction + tabs.length) % tabs.length;
          activateTab(tabs[nextIndex]);
          tabs[nextIndex].focus();
        }
      });
    });
  }

  /* ---- Formulaire de contact (validation & feedback front) ---- */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        feedback.textContent = 'Merci de vérifier les champs obligatoires.';
        return;
      }

      // Pas de backend connecté : confirmation visuelle uniquement.
      feedback.textContent = 'Merci pour votre message, nous vous répondrons rapidement !';
      form.reset();
    });
  }
});

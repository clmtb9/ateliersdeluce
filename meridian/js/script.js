document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('ctaForm');
  const feedback = document.getElementById('ctaFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        feedback.textContent = 'Please enter a valid work email.';
        return;
      }

      // No backend wired up: front-end confirmation only.
      feedback.textContent = 'Thanks — we will reach out shortly.';
      form.reset();
    });
  }
});

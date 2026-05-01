// === ASSASSIN'S CREED INSPIRED PAGE TRANSITIONS ===

document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.stagger').forEach(el => observer.observe(el));

  // Intercept nav link clicks for AC transition
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Don't transition if same page
      if (window.location.pathname.endsWith(href)) return;
      
      e.preventDefault();
      document.body.classList.add('leaping');
      
      // Navigate after animation
      setTimeout(() => {
        window.location.href = href;
      }, 2300);
    });
  });
});

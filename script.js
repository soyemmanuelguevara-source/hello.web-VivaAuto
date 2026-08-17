// ============================================
// VIVAUTO — interacciones y animaciones
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- LOADER ---- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 700);
  });
  // fallback in case 'load' is slow to fire
  setTimeout(() => loader && loader.classList.add('hidden'), 3200);

  /* ---- NAV SCROLL STATE ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- MOBILE MENU ---- */
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mob');
  ham.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mob.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
  }));

  /* ---- SCROLL REVEAL ---- */
  const revEls = document.querySelectorAll('.rev');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revEls.forEach(el => io.observe(el));

  /* ---- HERO TYPEWRITER ---- */
  const twText = document.getElementById('twText');
  if (twText) {
    const words = ['Afinación', 'Frenos', 'Inyectores', 'Descarbonización', 'Cuerpo de aceleración'];
    let wi = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = words[wi];
      if (!deleting) {
        ci++;
        twText.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(tick, 1400); return; }
      } else {
        ci--;
        twText.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, deleting ? 40 : 75);
    };
    tick();
  }

  /* ---- COUNTERS ---- */
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count ?? el.dataset.heroCount ?? '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    const raw = el.textContent.trim();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counters = document.querySelectorAll('[data-count], [data-hero-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        cio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(el => cio.observe(el));

  /* ---- CONTACT FORM -> WHATSAPP ---- */
  const cForm = document.getElementById('cForm');
  if (cForm) {
    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('fn').value.trim();
      const telefono = document.getElementById('ft').value.trim();
      const servicio = document.getElementById('fs').value;
      const mensaje = document.getElementById('fm').value.trim();

      let text = `Hola VivaAuto, soy ${nombre}.`;
      text += ` Me interesa el servicio de: ${servicio}.`;
      if (mensaje) text += ` Detalles: ${mensaje}.`;
      text += ` Mi teléfono es ${telefono}.`;

      const url = `https://wa.me/528142778725?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

});

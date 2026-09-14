/* ============================================================
   SATELITAL — Lógica de interfaz
   Prototipo académico — Ingeniería de Sistemas
   Preparado para integrarse posteriormente con una API REST.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initRevealOnScroll();
  initHeroCounters();
  initPlanSelection();
  initRequestForm();
});

/* ------------------------------------------------------------
   1. NAVBAR: fondo sólido al hacer scroll
   ------------------------------------------------------------ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ------------------------------------------------------------
   2. MENÚ RESPONSIVE (hamburguesa)
   ------------------------------------------------------------ */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('.nav-link, .navbar__menu-cta').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!menu.classList.contains('open')) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

/* ------------------------------------------------------------
   3. SCROLL SPY: resalta el enlace de la sección activa
   ------------------------------------------------------------ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) => document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ------------------------------------------------------------
   4. ANIMACIONES AL APARECER (Intersection Observer)
   ------------------------------------------------------------ */
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal, .fade-up');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   5. CONTADORES ANIMADOS DEL HERO
   ------------------------------------------------------------ */
function initHeroCounters() {
  const counters = document.querySelectorAll('.hero__stat-num[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   6. SELECCIÓN DE PLAN DESDE LAS TARJETAS
   ------------------------------------------------------------ */
function initPlanSelection() {
  const buttons = document.querySelectorAll('.select-plan');
  const planSelect = document.getElementById('plan');
  if (!buttons.length || !planSelect) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const planName = button.dataset.plan;

      const optionExists = Array.from(planSelect.options).some(
        (opt) => opt.value === planName
      );
      if (optionExists) {
        planSelect.value = planName;
      }

      const solicitud = document.getElementById('solicitud');
      if (solicitud) {
        solicitud.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      showToast(`Plan "${planName}" seleccionado. Completa tus datos para continuar.`);

      const fullNameInput = document.getElementById('fullName');
      window.setTimeout(() => {
        if (fullNameInput) fullNameInput.focus({ preventScroll: true });
      }, 600);
    });
  });
}

/* ------------------------------------------------------------
   7. FORMULARIO DE SOLICITUD: validación + envío simulado
   ------------------------------------------------------------ */
function initRequestForm() {
  const form = document.getElementById('requestForm');
  const successPanel = document.getElementById('requestSuccess');
  const successPlan = document.getElementById('successPlan');
  const successRef = document.getElementById('successRef');
  const newRequestBtn = document.getElementById('newRequestBtn');

  if (!form) return;

  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      validate: (v) => v.trim().length >= 3,
      message: 'Ingresa tu nombre completo (mínimo 3 caracteres).',
    },
    phone: {
      el: document.getElementById('phone'),
      validate: (v) => /^[0-9+()\s-]{7,15}$/.test(v.trim()),
      message: 'Ingresa un número de teléfono válido.',
    },
    email: {
      el: document.getElementById('email'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Ingresa un correo electrónico válido.',
    },
    address: {
      el: document.getElementById('address'),
      validate: (v) => v.trim().length >= 5,
      message: 'Ingresa una dirección válida.',
    },
    residential: {
      el: document.getElementById('residential'),
      validate: (v) => v.trim().length >= 2,
      message: 'Ingresa el nombre del conjunto residencial.',
    },
    unit: {
      el: document.getElementById('unit'),
      validate: (v) => v.trim().length >= 1,
      message: 'Ingresa el número de casa o apartamento.',
    },
    plan: {
      el: document.getElementById('plan'),
      validate: (v) => v.trim().length > 0,
      message: 'Selecciona un plan.',
    },
  };

  const setFieldError = (field, message) => {
    const wrapper = field.el.closest('.form-field');
    const errorEl = document.getElementById(`err-${field.el.id}`);
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  };

  const validateField = (key) => {
    const field = fields[key];
    const value = field.el.value;
    const isValid = field.validate(value);
    setFieldError(field, isValid ? '' : field.message);
    return isValid;
  };

  Object.keys(fields).forEach((key) => {
    const el = fields[key].el;
    if (!el) return;
    el.addEventListener('blur', () => validateField(key));
    el.addEventListener('input', () => {
      const wrapper = el.closest('.form-field');
      if (wrapper && wrapper.classList.contains('has-error')) {
        validateField(key);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isFormValid = true;
    Object.keys(fields).forEach((key) => {
      const valid = validateField(key);
      if (!valid) isFormValid = false;
    });

    if (!isFormValid) {
      const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstError) firstError.focus();
      showToast('Revisa los campos marcados en rojo.', 'error');
      return;
    }

    const requestData = {
      fullName: fields.fullName.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      email: fields.email.el.value.trim(),
      address: fields.address.el.value.trim(),
      residential: fields.residential.el.value.trim(),
      unit: fields.unit.el.value.trim(),
      plan: fields.plan.el.value,
      comments: document.getElementById('comments').value.trim(),
      status: 'Pendiente',
      createdAt: new Date().toISOString(),
      reference: generateReference(),
    };

    saveRequestLocally(requestData);
    // TODO(API REST): reemplazar por una petición real, por ejemplo:
    // fetch('/api/solicitudes', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(requestData) })

    form.hidden = true;
    if (successPanel) {
      successPanel.hidden = false;
      if (successPlan) successPlan.textContent = requestData.plan;
      if (successRef) successRef.textContent = requestData.reference;
    }

    showToast('¡Solicitud enviada correctamente!', 'success');
  });

  if (newRequestBtn) {
    newRequestBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('residential').value = 'Quintas del Marqués';
      Object.keys(fields).forEach((key) => setFieldError(fields[key], ''));
      form.hidden = false;
      if (successPanel) successPanel.hidden = true;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

/* ------------------------------------------------------------
   Utilidades
   ------------------------------------------------------------ */

function generateReference() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `SAT-${timestamp}${random}`;
}

function saveRequestLocally(requestData) {
  try {
    const key = 'satelital_solicitudes';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(requestData);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (error) {
    console.warn('No se pudo guardar la solicitud localmente:', error);
  }
}

let toastTimeout;
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  toast.style.borderColor =
    type === 'error' ? 'rgba(255, 107, 107, 0.5)' :
    type === 'success' ? 'rgba(53, 211, 153, 0.5)' :
    'var(--border-strong)';

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

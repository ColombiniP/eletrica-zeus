/**
 * Elétrica ZEUS — script.js
 * Funcionalidades:
 * - Menu mobile hambúrguer
 * - FAQ acordeão
 * - Header scroll effect
 * - Formulário → WhatsApp
 * - Scroll reveal
 * - Smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     MENU MOBILE
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('navOverlay');

  function openMenu() {
    nav.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Fechar menu ao clicar em link interno
  const navLinks = document.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar menu com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ============================================================
     HEADER — EFEITO DE SCROLL
  ============================================================ */
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* ============================================================
     FAQ ACORDEÃO
  ============================================================ */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Fechar todos os outros
      faqItems.forEach(other => {
        const otherQ = other.querySelector('.faq__question');
        const otherA = other.querySelector('.faq__answer');
        if (otherQ && otherA && other !== item) {
          otherQ.setAttribute('aria-expanded', 'false');
          otherA.hidden = true;
        }
      });

      // Toggle o atual
      if (isOpen) {
        question.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
      } else {
        question.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });


  /* ============================================================
     FORMULÁRIO → WHATSAPP
  ============================================================ */
  const sendBtn = document.getElementById('sendWhatsapp');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const nome = document.getElementById('nome')?.value.trim() || '';
      const whatsapp = document.getElementById('whatsapp')?.value.trim() || '';
      const servico = document.getElementById('servico')?.value.trim() || '';
      const mensagem = document.getElementById('mensagem')?.value.trim() || '';

      // Validação básica
      if (!nome) {
        alert('Por favor, informe seu nome.');
        document.getElementById('nome')?.focus();
        return;
      }
      if (!whatsapp) {
        alert('Por favor, informe seu WhatsApp.');
        document.getElementById('whatsapp')?.focus();
        return;
      }

      // Monta a mensagem para o WhatsApp
      let msg = 'Olá, Elétrica ZEUS! Gostaria de solicitar um orçamento.\n\n';
      msg += `👤 Nome: ${nome}\n`;
      msg += `📱 WhatsApp: ${whatsapp}\n`;
      if (servico) msg += `🔧 Serviço: ${servico}\n`;
      if (mensagem) msg += `📝 Mensagem: ${mensagem}\n`;

      const url = `https://wa.me/5521967254242?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }


  /* ============================================================
     SCROLL REVEAL — anima seções ao entrar na tela
  ============================================================ */
  const revealTargets = document.querySelectorAll(
    '.service-card, .work-card, .about__trust-item, .faq__item, .comparativo__col, .section__header'
  );

  // Adiciona classe reveal
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.06}s`;
  });

  // Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => revealObserver.observe(el));


  /* ============================================================
     SMOOTH SCROLL para links âncora internos
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
        10
      ) || 72;

      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ============================================================
     BOTÃO WHATSAPP FLUTUANTE — aparece após scroll
  ============================================================ */
  const waFloat = document.querySelector('.whatsapp-float');

  if (waFloat) {
    function toggleWaFloat() {
      if (window.scrollY > 400) {
        waFloat.style.opacity = '1';
        waFloat.style.pointerEvents = 'auto';
        waFloat.style.transform = 'scale(1)';
      } else {
        waFloat.style.opacity = '0';
        waFloat.style.pointerEvents = 'none';
        waFloat.style.transform = 'scale(0.8)';
      }
    }

    // Estado inicial
    waFloat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    waFloat.style.opacity = '0';
    waFloat.style.pointerEvents = 'none';
    waFloat.style.transform = 'scale(0.8)';

    window.addEventListener('scroll', toggleWaFloat, { passive: true });
    toggleWaFloat();
  }

});

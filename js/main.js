/* Олег Коршунов — сайт-портфолио: меню, появление блоков, форма расчёта */
(function () {
  'use strict';

  document.body.classList.add('js-ready');

  /* ---------- Год в подвале ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Шапка при скролле ---------- */
  var header = document.querySelector('.header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Мобильное меню ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    var close = function () {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
    };
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- Плавный скролл с учётом шапки ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    var top = el.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight - 1 : 0);
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    if (history.replaceState) history.replaceState(null, '', id);
  });

  /* ---------- Появление блоков при скролле ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Форма: собирает письмо и открывает почту ---------- */
  var form = document.getElementById('brief-form');
  if (form) {
    var msg = document.getElementById('form-msg');
    var fields = ['f-name', 'f-contact', 'f-task'].map(function (id) { return document.getElementById(id); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      fields.forEach(function (f) {
        if (!f) return;
        var bad = !f.value.trim();
        f.classList.toggle('is-error', bad);
        if (bad) ok = false;
      });

      if (!ok) {
        msg.textContent = 'Заполните все три поля — этого достаточно для расчёта.';
        msg.className = 'form__msg is-err';
        return;
      }

      var name = fields[0].value.trim();
      var contact = fields[1].value.trim();
      var task = fields[2].value.trim();

      var subject = 'Запрос на расчёт — ' + name;
      var body =
        'Здравствуйте, Олег!\n\n' +
        'Меня зовут: ' + name + '\n' +
        'Контакт: ' + contact + '\n\n' +
        'Задача:\n' + task + '\n\n' +
        'Хочу получить расчёт стоимости (декомпозиция, часы, итоговая цена) в течение 24 часов.';

      msg.textContent = 'Открываю почту с готовым письмом… Если окно не появилось — напишите в Telegram.';
      msg.className = 'form__msg is-ok';

      window.location.href = 'mailto:Varangian7221@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });

    fields.forEach(function (f) {
      if (!f) return;
      f.addEventListener('input', function () {
        f.classList.remove('is-error');
        if (msg.textContent) { msg.textContent = ''; msg.className = 'form__msg'; }
      });
    });
  }
})();

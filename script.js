(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('motion-toggle');

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function setMotion(off) {
    if (off) { root.setAttribute('data-motion', 'off'); } else { root.removeAttribute('data-motion'); }
    toggle.setAttribute('aria-pressed', String(off));
    toggle.textContent = '움직임 줄이기: ' + (off ? '켜짐' : '꺼짐');
    store('motion-off', off ? '1' : '0');
  }

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setMotion(load('motion-off') === '1' || prefersReduced);
  toggle.addEventListener('click', function () {
    setMotion(toggle.getAttribute('aria-pressed') !== 'true');
  });

  Array.prototype.forEach.call(document.querySelectorAll('.acc-panel'), function (p) { p.hidden = true; });

  // <button>이므로 클릭·Enter·Space가 모두 click 이벤트로 동작한다.
  var buttons = document.querySelectorAll('.acc-btn');
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      if (!open) {
        panel.classList.remove('opening');
        void panel.offsetWidth;
        panel.classList.add('opening');
      }
    });
  });
})();

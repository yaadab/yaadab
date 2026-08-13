// Yaadab — Lok Sewa Master Class
// Shared site behaviour: mobile nav, scroll reveal, contact form.

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Blog filter pills (blog.html) */
  var pills = document.querySelectorAll('.filter-pill');
  var cards = document.querySelectorAll('.post-card');
  if (pills.length && cards.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('is-active'); });
        pill.classList.add('is-active');
        var filter = pill.getAttribute('data-filter');
        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-tier') === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* Contact form (contact.html)
     -----------------------------------------------------------
     This is wired to POST as JSON to a form-backend endpoint.
     Cloudflare Pages does not process forms on its own, so pick
     ONE of these and set FORM_ENDPOINT below — see README.md:

       1) Web3Forms (free, no signup required beyond an access key)
          FORM_ENDPOINT = 'https://api.web3forms.com/submit'
          and add your access_key in the hidden input in contact.html

       2) A Cloudflare Pages Function you write yourself at
          /functions/api/contact.js, then:
          FORM_ENDPOINT = '/api/contact'
     ----------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var endpoint = form.getAttribute('action');
      var data = new FormData(form);

      if (!endpoint || endpoint.indexOf('REPLACE') !== -1) {
        status.textContent = 'फारम अझै जोडिएको छैन — README.md मा दिइएको Web3Forms सेटअप पूरा गर्नुहोस्। (Form backend not connected yet — see README.md.)';
        status.className = 'form-status err';
        return;
      }

      status.textContent = 'पठाउँदै... (sending...)';
      status.className = 'form-status';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      }).then(function (res) { return res.json().catch(function () { return {}; }); })
        .then(function () {
          status.textContent = 'धन्यवाद! तपाईंको सन्देश पठाइयो। (Thanks — your message was sent.)';
          status.className = 'form-status ok';
          form.reset();
        }).catch(function () {
          status.textContent = 'पठाउन सकिएन, फेरि प्रयास गर्नुहोस्। (Could not send — please try again.)';
          status.className = 'form-status err';
        });
    });
  }
});

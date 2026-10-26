(() => {
  'use strict';
  const c = window.PRACTICE_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const text = (id, value) => { const e = $(id); if (e && value != null) e.textContent = String(value); };
  const safeWeb = (value) => {
    if (typeof value !== 'string' || !value.trim()) return '';
    try { const url = new URL(value.trim()); return url.protocol === 'https:' ? url.href : ''; }
    catch { return ''; }
  };
  const cfg = (key, fallback = '') => typeof c[key] === 'string' && c[key].trim() ? c[key].trim() : fallback;

  if (c.demoMode) {
    const demo = $('demo-banner');
    if (demo) demo.hidden = false;
  }
  if (/^#[0-9a-fA-F]{6}$/.test(c.accentColor || ''))
    document.documentElement.style.setProperty('--accent', c.accentColor);

  const fields = {
    practiceName: cfg('practiceName', 'Your Practice Name'),
    practitionerName: cfg('practitionerName', 'Your Full Name'),
    professionalTitle: cfg('professionalTitle', 'Counselling professional'),
    credentials: cfg('credentials', 'Qualifications to be added'),
    location: cfg('location', 'Chennai, Tamil Nadu'),
    shortIntro: cfg('shortIntro'),
    aboutHeading: cfg('aboutHeading'),
    aboutText: cfg('aboutText'),
    sessionDuration: cfg('sessionDuration'),
    sessionFee: cfg('sessionFee'),
    hours: cfg('hours'),
    cancellationNote: cfg('cancellationNote')
  };
  document.querySelectorAll('[data-text]').forEach((node) => {
    const key = node.getAttribute('data-text');
    if (fields[key]) node.textContent = fields[key];
  });
  const year = $('year');
  if (year) year.textContent = String(new Date().getFullYear());
  if (document.body.dataset.page === 'privacy') document.title = 'Privacy | ' + fields.practiceName;
  else if (document.body.dataset.page === 'terms') document.title = 'Terms | ' + fields.practiceName;
  else document.title = fields.practiceName + ' | Counselling in ' + fields.location;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && !document.body.dataset.page) metaDesc.setAttribute('content', fields.shortIntro + ' Book a counselling appointment with ' + fields.practiceName + '.');

  const modes = Array.isArray(c.appointmentModes) ? c.appointmentModes.filter((v) => typeof v === 'string' && v.trim()) : [];
  text('modes-text', modes.length ? modes.join(' · ') : 'Appointment options shared when booking');
  text('faq-modes', modes.length ? 'The practice currently lists: ' + modes.join(' and ') + '. Check available dates and formats on the booking calendar.' : 'Please confirm available appointment formats with the practice before booking.');
  const d = document.querySelector('.soft-disclaimer');
  if (d && !c.demoMode) d.hidden = true;

  const menuToggle = $('menu-toggle');
  const navLinks = $('nav-links');
  if (menuToggle && navLinks) {
    const closeMenu = () => { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); };
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  const services = $('service-grid');
  if (services) {
    const symbols = ['✳','↗','☼','✦','○','❋'];
    (Array.isArray(c.services) ? c.services : []).forEach((item, index) => {
      if (!item || typeof item !== 'object') return;
      const card = document.createElement('article'); card.className = 'service-card';
      const top = document.createElement('div'); top.className = 'service-card-top';
      const num = document.createElement('span'); num.textContent = typeof item.number === 'string' ? item.number : String(index + 1).padStart(2,'0');
      const icon = document.createElement('span'); icon.className = 'service-symbol'; icon.textContent = symbols[index % symbols.length]; icon.setAttribute('aria-hidden','true');
      top.append(num,icon);
      const title = document.createElement('h3'); title.textContent = String(item.title || 'Session');
      const desc = document.createElement('p'); desc.textContent = String(item.description || 'Details available at booking.');
      card.append(top,title,desc); services.append(card);
    });
    if (!services.children.length) {
      services.hidden = true;
      const info = document.createElement('p'); info.textContent = 'Please contact the practitioner for an up-to-date list of services.';
      services.after(info);
    }
  }

  const booking = c.booking || {};
  const bookMode = booking.mode || 'iframe';
  const embedUrl = safeWeb(booking.embedUrl);
  const bookingUrl = safeWeb(booking.pageUrl);
  const empty = $('booking-empty');
  const fallback = $('booking-fallback');
  const iframeHolder = $('booking-iframe-holder');
  const snippetHolder = $('provider-booking-snippet');
  if (fallback && bookingUrl) { fallback.href = bookingUrl; fallback.hidden = false; }
  if (empty && !c.demoMode) {
    const h3 = empty.querySelector('h3'); if (h3) h3.textContent = 'Appointments';
    const p = empty.querySelector('p'); if (p) p.textContent = bookingUrl ? 'Select the button below to view available times on the secure booking page.' : 'Online booking is being set up. Please use the contact details below for appointment enquiries.';
    const lines = empty.querySelector('.demo-widget-lines'); if (lines) lines.hidden = true;
  }
  if (iframeHolder && empty && bookMode === 'iframe' && embedUrl) {
    const frame = document.createElement('iframe');
    frame.src = embedUrl;
    frame.title = 'Secure online appointment scheduling';
    frame.className = 'booking-iframe';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.setAttribute('allow', 'payment *');
    iframeHolder.append(frame);
    iframeHolder.hidden = false;
    empty.hidden = true;
    if (bookingUrl) {
      const below = document.createElement('div'); below.style.cssText='padding:13px 24px;border-top:1px solid #eeeeea;text-align:center;font-size:12px;';
      const link = document.createElement('a'); link.href = bookingUrl; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent='Calendar not loading? Open booking page ↗';
      below.append(link); iframeHolder.append(below);
    }
  } else if (snippetHolder && empty && bookMode === 'snippet' && snippetHolder.children.length > 0) {
    snippetHolder.hidden = false; empty.hidden = true;
  } else if (empty && bookingUrl && bookMode === 'link') {
    const lines = empty.querySelector('.demo-widget-lines'); if (lines) lines.hidden = true;
    if (!c.demoMode) { const p = empty.querySelector('p'); if (p) p.textContent='The secure appointment calendar opens in a new tab. Choose a convenient time to continue.'; }
  }

  const payments = c.payments || {};
  const paymentMode = payments.mode || 'through-booking';
  const paymentLink = safeWeb(payments.paymentUrl);
  const payButton = $('payment-link');
  const paySnippet = $('provider-payment-snippet');
  if (paymentMode === 'link' && paymentLink) {
    text('payment-title','Pay for an agreed session');
    text('payment-description','Use this secure payment link only if the practice has asked you to pay separately. A payment alone does not create or confirm a booking.');
    if (paymentLink) { payButton.href = paymentLink; payButton.hidden = false; }
  } else if (paymentMode === 'button') {
    text('payment-title','Secure payment');
    text('payment-description','Only pay after the practice confirms which session the payment is for. This payment button does not create an appointment.');
    if (paySnippet && paySnippet.children.length > 0) paySnippet.hidden = false;
    else text('payment-description', 'The practice will share payment instructions once the payment button has been connected.');
  }
  if (paymentMode === 'through-booking') text('faq-payment','Fees will be confirmed before you finalise an appointment. If online payment is enabled, it is completed inside the secure booking flow.');
  else text('faq-payment','Fees are shared before the session. A separate payment link or button may be provided for appointments already arranged; paying alone does not confirm a booking.');

  function showLink(id, url, label) {
    const node = $(id);
    if (node && url) { node.href = url; node.hidden = false; if (label) node.textContent = label; return true; }
    return false;
  }
  let hasContact = false;
  const email = cfg('email');
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) hasContact = showLink('email-link', 'mailto:' + email, 'Email: ' + email + ' ↗') || hasContact;
  const phone = cfg('phone').replace(/[\s().-]/g, '');
  if (/^\+?\d{10,15}$/.test(phone)) hasContact = showLink('phone-link', 'tel:' + phone, 'Call: ' + cfg('phone') + ' ↗') || hasContact;
  const wa = cfg('whatsapp').replace(/\D/g,'');
  if (/^\d{10,15}$/.test(wa)) hasContact = showLink('whatsapp-link', 'https://wa.me/' + wa) || hasContact;
  const map = safeWeb(c.mapUrl);
  if (map) hasContact = showLink('map-link', map, 'Clinic directions ↗') || hasContact;
  const unset = $('contact-unset'); if (unset) unset.hidden = hasContact;
  const contactLocation = $('legal-contact');
  if (contactLocation) contactLocation.textContent = email ? email : 'Contact information will be added by the practice owner.';
})();

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

  /* ---- Launch guard: refuse to look "finished" while sample copy is still live ---- */
  const SAMPLES = ['Your Practice Name','Your Full Name','Add verified qualifications and professional registrations here'];
  const stillSample = SAMPLES.some((s) => Object.values(c).some((v) => typeof v === 'string' && v.trim() === s));
  const demoBanner = $('demo-banner');
  if (demoBanner && (c.demoMode || stillSample)) {
    if (!c.demoMode && stillSample) {
      demoBanner.textContent = 'Setup incomplete: sample placeholder text is still live on this site. Finish config.js before sharing the link.';
    }
    demoBanner.hidden = false;
  }

  if (/^#[0-9a-fA-F]{6}$/.test(c.accentColor || ''))
    document.documentElement.style.setProperty('--accent', c.accentColor);

  const fields = {
    practiceName: cfg('practiceName', 'Your Practice Name'),
    practitionerName: cfg('practitionerName', 'Your Full Name'),
    professionalTitle: cfg('professionalTitle', 'Counselling professional'),
    credentials: cfg('credentials', 'Qualifications to be added'),
    registrationNumber: cfg('registrationNumber'),
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

  /* Registration number: the single strongest trust signal. Shown only if supplied. */
  const regWrap = $('registration-line');
  if (regWrap && fields.registrationNumber) {
    regWrap.textContent = 'Registration: ' + fields.registrationNumber;
    regWrap.hidden = false;
  }

  const year = $('year');
  if (year) year.textContent = String(new Date().getFullYear());
  if (document.body.dataset.page === 'notfound') document.title = 'Page not found | ' + fields.practiceName;
  else if (document.body.dataset.page === 'privacy') document.title = 'Privacy | ' + fields.practiceName;
  else if (document.body.dataset.page === 'terms') document.title = 'Terms | ' + fields.practiceName;
  else document.title = fields.practiceName + ' | Counselling in ' + fields.location;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && !document.body.dataset.page) metaDesc.setAttribute('content', fields.shortIntro + ' Book a counselling appointment with ' + fields.practiceName + '.');

  const modes = Array.isArray(c.appointmentModes) ? c.appointmentModes.filter((v) => typeof v === 'string' && v.trim()) : [];
  text('modes-text', modes.length ? modes.join(' \u00b7 ') : 'Appointment options shared when booking');
  text('faq-modes', modes.length ? 'The practice currently lists: ' + modes.join(' and ') + '. Check available dates and formats on the booking calendar.' : 'Please confirm available appointment formats with the practice before booking.');
  const d = document.querySelector('.soft-disclaimer');
  if (d && !c.demoMode) d.hidden = true;

  /* ---- Structured data for local search. Index page only. ---- */
  if (!document.body.dataset.page) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      additionalType: 'https://schema.org/MedicalBusiness',
      name: fields.practiceName,
      description: fields.shortIntro,
      areaServed: fields.location,
      availableLanguage: ['en', 'ta'],
      provider: { '@type': 'Person', name: fields.practitionerName, jobTitle: fields.professionalTitle }
    };
    const addr = cfg('clinicAddress');
    if (addr) ld.address = { '@type': 'PostalAddress', streetAddress: addr, addressLocality: fields.location, addressCountry: 'IN' };
    const em = cfg('email'); if (em) ld.email = em;
    const ph = cfg('phone'); if (ph) ld.telephone = ph;
    const social = [safeWeb(c.instagramUrl)].filter(Boolean);
    if (social.length) ld.sameAs = social;
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
  }

  /* ---- Mobile navigation ---- */
  const menuToggle = $('menu-toggle');
  const navLinks = $('nav-links');
  if (menuToggle && navLinks) {
    const closeMenu = (refocus) => {
      if (!navLinks.classList.contains('open')) return;
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      if (refocus) menuToggle.focus();
    };
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => closeMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(true); });
  }

  /* ---- Services ---- */
  const services = $('service-grid');
  if (services) {
    const symbols = ['\u2733','\u2197','\u263c','\u2726','\u25cb','\u274b'];
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

  /* ---- Sample calendar, for client walkthroughs only. booking.mode = "demo" ---- */
  function renderDemoCalendar(holder) {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const today = now.getDate();

    const wrap = document.createElement('div'); wrap.className = 'demo-cal';
    const head = document.createElement('div'); head.className = 'demo-cal-head';
    const title = document.createElement('strong'); title.textContent = months[m] + ' ' + y;
    const nav = document.createElement('span'); nav.className = 'demo-cal-nav'; nav.textContent = '\u2039   \u203a'; nav.setAttribute('aria-hidden','true');
    head.append(title, nav); wrap.append(head);

    const grid = document.createElement('div'); grid.className = 'demo-cal-grid';
    ['S','M','T','W','T','F','S'].forEach((d, i) => {
      const c = document.createElement('span'); c.className = 'demo-cal-dow'; c.textContent = d;
      c.setAttribute('aria-hidden','true'); grid.append(c);
    });
    for (let i = 0; i < firstDay; i++) grid.append(document.createElement('span'));
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('span');
      cell.className = 'demo-cal-day';
      cell.textContent = String(d);
      const dow = new Date(y, m, d).getDay();
      if (d < today || dow === 0) cell.classList.add('is-off');
      else if (d === today + 2) cell.classList.add('is-picked');
      else cell.classList.add('is-open');
      grid.append(cell);
    }
    wrap.append(grid);

    const slotLabel = document.createElement('p'); slotLabel.className = 'demo-cal-sublabel';
    slotLabel.textContent = 'Available times';
    wrap.append(slotLabel);

    const slots = document.createElement('div'); slots.className = 'demo-cal-slots';
    ['10:00 AM','11:30 AM','4:00 PM','6:00 PM'].forEach((t, i) => {
      const b = document.createElement('span'); b.className = 'demo-slot' + (i === 2 ? ' is-picked' : '');
      b.textContent = t; slots.append(b);
    });
    wrap.append(slots);

    const cta = document.createElement('div'); cta.className = 'demo-cal-cta';
    cta.textContent = 'Confirm and pay';
    wrap.append(cta);

    const note = document.createElement('p'); note.className = 'demo-cal-note';
    note.textContent = 'Sample view for illustration. The live scheduling calendar replaces this panel once the provider is connected.';
    wrap.append(note);

    holder.append(wrap);
    holder.hidden = false;
  }

  /* ---- Booking ---- */
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
  if (iframeHolder && empty && bookMode === 'demo') {
    renderDemoCalendar(iframeHolder);
    empty.hidden = true;
  } else if (iframeHolder && empty && bookMode === 'iframe' && embedUrl) {
    const frame = document.createElement('iframe');
    frame.src = embedUrl;
    frame.title = 'Secure online appointment scheduling';
    frame.className = 'booking-iframe';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    /* 'src' scopes the Payment Request API to the booking provider's own origin only. */
    frame.setAttribute('allow', "payment 'src'");
    iframeHolder.append(frame);
    iframeHolder.hidden = false;
    empty.hidden = true;
    if (bookingUrl) {
      const below = document.createElement('div'); below.className = 'iframe-fallback-row';
      const link = document.createElement('a'); link.href = bookingUrl; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent='Calendar not loading? Open booking page \u2197';
      below.append(link); iframeHolder.append(below);
    }
  } else if (snippetHolder && empty && bookMode === 'snippet' && snippetHolder.children.length > 0) {
    snippetHolder.hidden = false; empty.hidden = true;
  } else if (empty && bookingUrl && bookMode === 'link') {
    const lines = empty.querySelector('.demo-widget-lines'); if (lines) lines.hidden = true;
    if (!c.demoMode) { const p = empty.querySelector('p'); if (p) p.textContent='The secure appointment calendar opens in a new tab. Choose a convenient time to continue.'; }
  }

  /* ---- Payments ---- */
  const payments = c.payments || {};
  const paymentMode = payments.mode || 'through-booking';
  const paymentLink = safeWeb(payments.paymentUrl);
  const payButton = $('payment-link');
  const paySnippet = $('provider-payment-snippet');
  if (paymentMode === 'link' && paymentLink) {
    text('payment-title','Pay for an agreed session');
    text('payment-description','Use this secure payment link only if the practice has asked you to pay separately. A payment alone does not create or confirm a booking.');
    /* Null guard: #payment-link exists on index.html only, but this script loads on every page. */
    if (payButton) { payButton.href = paymentLink; payButton.hidden = false; }
  } else if (paymentMode === 'button') {
    text('payment-title','Secure payment');
    text('payment-description','Only pay after the practice confirms which session the payment is for. This payment button does not create an appointment.');
    if (paySnippet && paySnippet.children.length > 0) paySnippet.hidden = false;
    else text('payment-description', 'The practice will share payment instructions once the payment button has been connected.');
  }
  if (paymentMode === 'through-booking') text('faq-payment','Fees will be confirmed before you finalise an appointment. If online payment is enabled, it is completed inside the secure booking flow.');
  else text('faq-payment','Fees are shared before the session. A separate payment link or button may be provided for appointments already arranged; paying alone does not confirm a booking.');

  /* ---- Contact ---- */
  function showLink(id, url, label) {
    const node = $(id);
    if (node && url) { node.href = url; node.hidden = false; if (label) node.textContent = label; return true; }
    return false;
  }
  let hasContact = false;
  const email = cfg('email');
  /* Reject mailto header-injection characters as well as checking the address shape. */
  const emailOk = /^[^\s@?&%<>"'\\]+@[^\s@?&%<>"'\\]+\.[^\s@?&%<>"'\\]+$/.test(email);
  if (email && emailOk) hasContact = showLink('email-link', 'mailto:' + encodeURI(email), 'Email: ' + email + ' \u2197') || hasContact;
  const phone = cfg('phone').replace(/[\s().-]/g, '');
  if (/^\+?\d{10,15}$/.test(phone)) hasContact = showLink('phone-link', 'tel:' + phone, 'Call: ' + cfg('phone') + ' \u2197') || hasContact;
  const wa = cfg('whatsapp').replace(/\D/g,'');
  if (/^\d{10,15}$/.test(wa)) hasContact = showLink('whatsapp-link', 'https://wa.me/' + wa) || hasContact;
  const map = safeWeb(c.mapUrl);
  if (map) hasContact = showLink('map-link', map, 'Clinic directions \u2197') || hasContact;
  const insta = safeWeb(c.instagramUrl);
  if (insta) hasContact = showLink('instagram-link', insta, 'Instagram \u2197') || hasContact;

  /* clinicAddress was previously accepted in config.js but never rendered anywhere. */
  const addrNode = $('clinic-address');
  const clinicAddress = cfg('clinicAddress');
  if (addrNode && clinicAddress) { addrNode.textContent = clinicAddress; addrNode.hidden = false; hasContact = true; }

  const unset = $('contact-unset'); if (unset) unset.hidden = hasContact;
  const contactLocation = $('legal-contact');
  if (contactLocation) contactLocation.textContent = (email && emailOk) ? email : 'Contact information will be added by the practice owner.';
  const grievance = $('grievance-contact');
  if (grievance) grievance.textContent = cfg('grievanceOfficer') || (email && emailOk ? email : 'To be appointed before launch.');
})();

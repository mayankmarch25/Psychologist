# What changed in this hardening pass

## Bugs fixed
- **Crash on the legal pages.** With `payments.mode: "link"`, `privacy.html` and `terms.html` threw
  `Cannot set properties of null` because `#payment-link` only exists on `index.html`. Everything
  after that line stopped running, leaving `[ADD CONTACT]` visible. Null guard added.
- **Dead config keys.** `clinicAddress` and `instagramUrl` were accepted in `config.js` and documented
  in the README but rendered nowhere. Both now appear in the contact section.
- **Placeholder leak.** If `demoMode` is set to `false` while sample copy is still in `config.js`,
  a warning banner now appears regardless. The site can no longer look finished when it isn't.
- **404 handling.** GitHub Pages had no 404 page. Added.

## Security
- Booking iframe permission narrowed from `allow="payment *"` to `allow="payment 'src'"`, scoping the
  Payment Request API to the provider's own origin.
- Content Security Policy added via `<meta http-equiv>` on every page. GitHub Pages cannot send real
  security headers, so this is the only route. If you use `booking.mode: "snippet"` and the provider's
  script is blocked, add that provider's domain to `script-src` in the head of `index.html`.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` added document-wide.
- Email validation now rejects mailto header-injection characters, not just malformed addresses.

> Still not solvable on GitHub Pages alone: clickjacking. `X-Frame-Options` and CSP `frame-ancestors`
> are both ignored in meta tags, so this site can be framed by anyone. Fix by putting Cloudflare in
> front of the domain and setting the header there, if that ever matters.

## Compliance
- Crisis helplines (Tele-MANAS 14416, KIRAN 1800-599-0019, 112) added to the contact section and the
  emergency FAQ.
- `privacy.html` restructured along the DPDP Rules 2025 notice requirements: Data Fiduciary
  identification, data principal rights, grievance officer, breach notification. Every bracketed
  field still needs filling.
- New optional `registrationNumber` field, shown next to qualifications.
- New optional `grievanceOfficer` field, used on the privacy page.

## Discoverability
- Open Graph and Twitter card tags added to `index.html`. **These must be edited by hand** because
  WhatsApp, LinkedIn and Facebook do not run JavaScript when generating a link preview, so `config.js`
  cannot fill them in.
- `canonical` tag, JSON-LD `ProfessionalService` structured data, `robots.txt`, `sitemap.xml` added.

## Accessibility and polish
- Fixed three small-text contrast failures against WCAG AA and raised the minimum font size from 9px
  to 10px.
- Escape now returns focus to the menu button when closing the mobile navigation.
- Anchor scroll offset matched to the real header height.
- `-webkit-backdrop-filter` added for Safari.
- Dropped Inter from the font stack, since it was named but never loaded.
- Brand mark made consistent across all pages.

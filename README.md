# Private Counselling Website — GitHub Pages Starter

A clean, responsive, no-framework counselling practice site. Static files; no developer or hosting subscription required. Includes a space for an embedded booking calendar and payment integration.

**IMPORTANT: This is a working demo, not an actual clinician's public profile.** Replace the placeholders and review the policy pages before switching the demo banner off.

## 1. What is included

| File | Purpose |
| --- | --- |
| `index.html` | Main landing page, services, contact, FAQ, booking and payment areas |
| `config.js` | **Edit this to personalise the site** |
| `styles.css` | Design and responsive layout |
| `site.js` | Menu, configuration, calendar/payment display and contact links |
| `privacy.html` | Starter privacy page — needs actual review and completion |
| `terms.html` | Starter terms page — needs actual review and completion |
| `favicon.svg` | Simple original leaf icon |
| `.nojekyll` | Ensures GitHub Pages serves files as static assets |

Everything works without npm, WordPress, a database or a server. Files can be opened locally by opening `index.html` in a browser. External calendar/payment widgets require internet and activated provider accounts.

## 2. Personalise it

Edit `config.js` in Notepad, VS Code or GitHub's file editor:

- Set `practiceName`, `practitionerName`, `professionalTitle`, and `credentials` **exactly as verified**.
- Replace `aboutText`, `shortIntro` and all `services` with her actual practice content.
- Enter actual `appointmentModes`, `sessionDuration`, `sessionFee`, `hours` and `cancellationNote`.
- Optionally add `email`, `phone`, `whatsapp`, `clinicAddress` and `mapUrl` (leave blank if private).
- Leave `demoMode: true` while checking. Change it to `false` only once content, contacts and the policy pages have been checked.
- You can change the site colour via `accentColor` (e.g., `#496b60`).

Do not place patients' details, diagnoses, private counselling notes, passwords, Razorpay secret keys, or other sensitive material in the repository or `config.js`. GitHub Pages source is public on a public repo.

## 3. Appointments: Option A — embed Zoho Bookings (recommended)

1. Create a [Zoho Bookings](https://www.zoho.com/bookings/) account and set up the service, price, availability and time zone **Asia/Kolkata**.
2. Inside the relevant booking page, choose **Embed as Widget**, then **Inline Embed**. Copy the official code supplied by Zoho.
3. If the code contains an `<iframe src="https://...">`, copy **only the URL inside `src`** into `booking.embedUrl` in `config.js`.
4. Put the normal public booking link into `booking.pageUrl` (this becomes the fallback button if a visitor cannot load the embed).
5. Set `booking.mode` to `"iframe"`.

Example only (not real links):

```js
booking: {
  mode: "iframe",
  embedUrl: "https://YOUR-REAL-ZOHO-EMBED-URL",
  pageUrl: "https://YOUR-REAL-BOOKING-LINK"
}
```

**For a script-based embed or widget that cannot be reduced to an iframe URL:**

- Open `index.html` and find the div with `id="provider-booking-snippet"`.
- Paste Zoho's **complete official widget snippet** inside that div (between the comments).
- Set `booking.mode` to `"snippet"` in `config.js`.
- Set `booking.pageUrl` as a fallback and test on the *published* HTTPS site.

Provider scripts are a trusted third-party dependency: paste snippets from the provider's official dashboard only. Widget appearance can differ from this website and certain third-party providers may block embedding. If the inline widget is blocked, use `booking.mode: "link"` and supply `booking.pageUrl` instead.

## 4. Payments: best solution is payment as part of booking

**Recommended:** In Zoho Bookings, connect the supported payment gateway (Razorpay is an option in India, subject to Zoho/Razorpay eligibility and current account settings). Enable payment for the appointment service. Keep:

```js
payments: { mode: "through-booking", paymentUrl: "" }
```

Then visitors choose an appointment and pay within that booking flow. The website does not itself handle card numbers, UPI credentials or payment verification.

**Alternative: separate payment page** (for a session already agreed with the practitioner): Create a hosted Razorpay Payment Page, and:

```js
payments: {
  mode: "link",
  paymentUrl: "https://YOUR-OFFICIAL-RAZORPAY-PAYMENT-PAGE"
}
```

This displays a **Pay for a confirmed session** button. Paying here does **not automatically reserve, match or confirm an appointment**. Reconcile bookings and payments in the respective provider dashboards.

**Alternative: official embedded Razorpay Payment Button:**

- Create a Razorpay Payment Button and copy the official embed snippet from its dashboard.
- Paste the full snippet into `index.html` between the comments at `id="provider-payment-snippet"`.
- Set `payments.mode` to `"button"` in `config.js`.
- Test it live. A Payment Button does not automatically reconcile appointments; use the booking-integrated gateway when possible.

Never put Razorpay API secret keys into a static GitHub website.

## 5. Publish free with GitHub Pages

1. Go to https://github.com/new and create a **public** repository such as `counselling-website`.
2. Upload **all the files inside this folder to the ROOT** of the repository (not a folder containing the files). `index.html` must be at the repository root.
3. Commit the files to the `main` branch.
4. Open repository **Settings → Pages → Build and deployment**.
5. For source, choose **Deploy from a branch**; choose `main` and `/ (root)`; save.
6. The published website URL is usually `https://YOUR-USERNAME.github.io/counselling-website/`.
7. Open the live URL on a desktop and phone and test all links and booking/payment flows.

You can later add a custom domain via repository **Settings → Pages → Custom domain**, and configure DNS at the domain registrar following GitHub's current guide. Do not put your real domain in a `CNAME` file until DNS is ready.

## 6. Before going public — checklist

- [ ] Confirm professional designation and qualifications. Do not use the title **Clinical Psychologist** unless the relevant professional registration/requirements are actually met.
- [ ] Confirm hospital employment permits separate practice and any use of its name/address.
- [ ] Check actual appointment offerings (online/in-person), location, availability and price.
- [ ] Fill out real `privacy.html` and `terms.html` information; get professional advice if needed.
- [ ] Prefer minimal data collection in the booking form; avoid collecting diagnoses or therapy history unless there is a suitable clinical system and safeguards.
- [ ] Complete the payment gateway's KYC and test successful, cancelled and failed payments in the provider dashboard.
- [ ] Test new bookings, rescheduling, confirmation emails and time-zone handling.
- [ ] Confirm no scripts from untrusted sources, API secrets or client files are committed.
- [ ] Edit the `og:` and `twitter:` tags by hand in `index.html`. Social link previews do NOT run
      JavaScript, so `config.js` cannot do this for you. Test with the LinkedIn Post Inspector and by
      sending yourself the link on WhatsApp.
- [ ] Replace `YOUR-USERNAME` and the repo name in `index.html` (canonical and og:url), `robots.txt`
      and `sitemap.xml`.
- [ ] Fill every `[BRACKETED FIELD]` in `privacy.html` and `terms.html`.
- [ ] Claim and verify the Google Business Profile. This will drive more first appointments than the
      website itself.
- [ ] Set `demoMode: false`.
- [ ] Open the site on a phone and check navigation, FAQ, booking widget and payment.

## 7. What this website DOES NOT do

- It does not store bookings, clinical data, card details or payment status.
- It does not send booking emails itself. Zoho or another scheduling provider does that.
- It does not verify that payment has succeeded; only the provider's dashboard/system can do that.
- It does not provide a secure electronic health record, therapy notes database or emergency response.

## Official documentation

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub Pages source selection: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Zoho Bookings embed: https://help.zoho.com/portal/en/kb/bookings-2-0/booking-pages/booking-pages-and-links/articles/ways-to-share-booking-link
- Zoho Bookings payments: https://help.zoho.com/portal/en/kb/bookings-2-0/integrations/payments/articles/collect-payments-online-while-booking
- Razorpay Payment Page / button guide: https://github.com/razorpay/markdown-docs/blob/master/payments/payment-pages/create.md

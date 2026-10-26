# Start here

Open `index.html` by double-clicking it. No server needed.

## What is real in this build

| | Status |
| --- | --- |
| Booking calendar | **Live.** Points at the real Zoho portal and can take actual appointments |
| Practitioner name, credentials, email, phone, address | Invented |
| Registration number | Deliberately blank. Never put a fabricated one here |
| Fees, hours, cancellation policy | Plausible placeholders, not her real terms |
| Privacy and terms pages | Template text with bracketed gaps still visible |

That mix is useful for a walkthrough but risky if published carelessly, because
a stranger could book a real slot with a fake practitioner's name attached. So:

- `demoMode` stays `true` until the content is real.
- The `noindex, nofollow` tags stay in all four HTML files until the content is
  real. Search for `robots` in `index.html` to find them.

## Every line to change, in order

All of it is in `config.js`, marked `SAMPLE`.

1. `practiceName`, `practitionerName`
2. `professionalTitle` — only a title she is entitled to use
3. `credentials` — real qualifications, no padding
4. `registrationNumber` — her real number, or leave blank
5. `email`, `phone`, `whatsapp`, `clinicAddress`
6. `sessionDuration`, `sessionFee`, `hours`, `cancellationNote`
7. `services` — cut anything outside her actual scope of practice

Then in `index.html`, by hand:

8. The `og:` and `twitter:` tags near the top. Social link previews do not run
   JavaScript, so `config.js` cannot fill these.
9. The canonical URL.
10. Remove the four `noindex` tags.

Then `privacy.html` and `terms.html`: fill every `[BRACKETED FIELD]`.

Last: set `demoMode: false` and confirm the amber banner disappears. If it does
not, a sample string is still in `config.js`.

## Switching the calendar

```js
mode: "iframe"   // live Zoho calendar, current setting
mode: "demo"     // draws a sample calendar, takes no bookings
mode: "link"     // button to the booking page, for when embeds are blocked
```

## A note on the service list

The six services are written to sound like a counselling psychologist rather
than a wellness brand, but they are still my words, not hers. Several of them
describe working with anxiety and low mood. Whether that language fits her
scope depends on her qualification and registration, and that is her call to
make, not yours. Have her read that list first.

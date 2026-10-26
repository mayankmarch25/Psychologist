/*
  START HERE: EDIT THIS FILE ONLY to personalise the website.
  Save the file, commit to GitHub, and GitHub Pages will update.
  Do not enter passwords, API secrets, client information or private keys here.
*/
window.PRACTICE_CONFIG = {
  // Set this to false after replacing all sample copy and checking the site.
  demoMode: true,

  practiceName: "Your Practice Name",
  practitionerName: "Your Full Name",
  professionalTitle: "Counselling professional",
  credentials: "Add verified qualifications and professional registrations here",
  location: "Chennai, Tamil Nadu",
  shortIntro: "A thoughtful space to talk, reflect, and find a way forward — at your own pace.",
  aboutHeading: "Support that begins with being heard.",
  aboutText: "Write 3–4 sentences here in the counsellor’s own voice. Share her approach, training, whom she works with, and what a first session may feel like. Avoid promises of guaranteed outcomes.",
  appointmentModes: ["Online appointments", "In-person appointments"], // Keep only the formats actually offered.
  sessionDuration: "Duration shared at booking",
  sessionFee: "Fees shared before confirmation",
  hours: "By appointment",

  // Public contact details. Leave blank to hide the corresponding link.
  email: "",
  phone: "", // e.g. +919876543210
  whatsapp: "", // e.g. 919876543210, without +
  clinicAddress: "", // Only if she is authorised to publish the location.
  mapUrl: "", // Optional Google Maps URL for a public clinic.
  instagramUrl: "",

  // Edit these example services to match her actual qualifications and scope.
  services: [
    {
      number: "01",
      title: "Individual counselling",
      description: "A confidential conversation focused on what you are navigating and what support may be useful."
    },
    {
      number: "02",
      title: "Stress & emotional wellbeing",
      description: "Space to explore stress, everyday pressures, and the patterns that may be affecting how you feel."
    },
    {
      number: "03",
      title: "Life changes & relationships",
      description: "Support while making sense of transitions, boundaries, and important relationships."
    }
  ],

  // BOOKING OPTIONS:
  // mode: "iframe"  -> paste ONLY the src URL from the provider's official iframe embed code.
  // mode: "snippet" -> paste the provider's official full embed snippet into index.html
  //                    inside the marked #provider-booking-snippet container.
  // mode: "link"    -> opens the provider booking page in a new tab.
  booking: {
    mode: "iframe",
    embedUrl: "",
    pageUrl: "" // Full HTTPS public booking URL (also serves as iframe fallback).
  },

  // PAYMENT OPTIONS:
  // mode: "through-booking" -> RECOMMENDED. Enable payment inside Zoho Bookings.
  // mode: "link"            -> show separate official payment page link.
  // mode: "button"          -> paste the provider's official payment-button embed
  //                            snippet into index.html at #provider-payment-snippet.
  // Do not use a separate button to claim an appointment was booked or paid.
  payments: {
    mode: "through-booking",
    paymentUrl: ""
  },

  // Replace these policies with the practice's actual cancellation terms.
  cancellationNote: "Cancellation and rescheduling terms will be shared before your appointment is confirmed.",
  accentColor: "#496b60" // Hex only; choose a readable dark accent.
};

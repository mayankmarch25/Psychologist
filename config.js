/*
  ===========================================================================
  SAMPLE CONFIGURATION — realistic placeholder content
  ---------------------------------------------------------------------------
  The booking calendar below is LIVE and points at a real Zoho portal, so this
  build can actually take appointments. The practitioner, contact details and
  qualifications are invented.

  That combination is deliberate for a walkthrough, but it means two rules:
    1. Keep demoMode: true, so the banner stays up.
    2. Do not remove the noindex tags in the HTML until the real name,
       real credentials and real contact details are in place.

  Replace every line marked SAMPLE before this goes live.
  ===========================================================================
*/
window.PRACTICE_CONFIG = {
  demoMode: true,

  // --- Identity -----------------------------------------------------------
  practiceName: "Aruvi Counselling",                       // SAMPLE
  practitionerName: "Divya Ramesh",                        // SAMPLE
  professionalTitle: "Counselling psychologist",
  credentials: "M.Sc Counselling Psychology, University of Madras. Three years of clinical experience in a tertiary care hospital, working with adults across outpatient and inpatient settings.",  // SAMPLE

  /*
    Left blank on purpose. This is the one field that must never carry invented
    data, because a screenshot of a fabricated registration number can outlive
    the demo. The line simply does not render while this is empty.
    Type any text here temporarily if you want to see how it looks.
  */
  registrationNumber: "",

  location: "Chennai, Tamil Nadu",

  // --- Voice --------------------------------------------------------------
  shortIntro: "A quiet, confidential space to think out loud, understand what you are carrying, and work out what comes next.",
  aboutHeading: "Therapy works best when you feel properly heard.",
  aboutText: "I work with adults who are navigating anxiety, low mood, burnout, difficult relationships, or a change they did not choose. My approach is collaborative rather than prescriptive: we look at what is happening, what it is costing you, and what might realistically shift. Sessions are unhurried and confidential. The first conversation is not an assessment to pass. It is a chance to talk about what brought you here and decide together whether this is the right fit.",

  // --- Practical ----------------------------------------------------------
  appointmentModes: ["Online appointments", "In-person appointments"],
  sessionDuration: "50 minutes",
  sessionFee: "\u20b91,200 per session",
  hours: "Weekday evenings and Saturday mornings",

  // --- Contact (all SAMPLE) -----------------------------------------------
  // 98765 43210 is the standard Indian placeholder number, used on purpose so
  // that no real person receives calls meant for a demo.
  email: "connect@aruvicounselling.in",
  phone: "+919876543210",
  whatsapp: "919876543210",
  clinicAddress: "2nd Floor, Lakshmi Towers, Velachery Main Road, Chennai 600042",
  mapUrl: "",
  instagramUrl: "",
  grievanceOfficer: "",

  // --- Scope of practice --------------------------------------------------
  // IMPORTANT: this list must match what she is actually qualified and
  // registered to offer. Cut anything that overstates her scope.
  services: [
    {
      number: "01",
      title: "Individual counselling",
      description: "One-to-one sessions for adults. We start wherever you are, with no requirement to have the problem clearly defined first."
    },
    {
      number: "02",
      title: "Anxiety & persistent worry",
      description: "Working with the thoughts that circle, the physical tension that comes with them, and the situations you have started avoiding."
    },
    {
      number: "03",
      title: "Low mood & motivation",
      description: "Space to examine flatness, exhaustion, and loss of interest, and to understand what is maintaining it rather than only naming it."
    },
    {
      number: "04",
      title: "Work & academic pressure",
      description: "For sustained stress, burnout, performance anxiety, and the difficulty of setting limits in demanding environments."
    },
    {
      number: "05",
      title: "Relationships & family",
      description: "Understanding recurring conflict, boundaries, expectations, and the patterns carried over from earlier relationships."
    },
    {
      number: "06",
      title: "Change, grief & transition",
      description: "Support through bereavement, separation, relocation, career change, or any shift that has unsettled more than you expected."
    }
  ],

  /*
    LIVE booking calendar.
    embedUrl = the src from Zoho's Inline Embed snippet.
    pageUrl  = the plain booking link, used as the fallback button and the one
               to put in her Google Business Profile and Instagram bio.
    Set mode to "demo" to draw the sample calendar instead of the real one.
    Set mode to "link" if the embed is blocked on any network.
  */
  booking: {
    mode: "iframe",
    embedUrl: "https://counselling1.zohobookings.in/portal-embed#/487670000000030009",
    pageUrl:  "https://counselling1.zohobookings.in/487670000000030009"
  },

  payments: {
    mode: "through-booking",
    paymentUrl: ""
  },

  cancellationNote: "Appointments can be rescheduled or cancelled up to 24 hours in advance at no charge. Cancellations inside 24 hours are charged in full, as the slot cannot usually be reallocated.",  // SAMPLE

  accentColor: "#496b60"
};
